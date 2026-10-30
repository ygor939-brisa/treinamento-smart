import json
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
ASSET_ROOT = ROOT / "assets" / "manuals-imported"
OCR_PATH = ASSET_ROOT / "ocr-index.json"
OCR_TEXT = json.loads(OCR_PATH.read_text(encoding="utf-8")) if OCR_PATH.exists() else {}
OCR_TARGETS = []

MANUALS = [
    {"id": "software-sascar", "title": "Manual do Software Sascar", "technology": "sascar", "category": "technology"},
    {"id": "software-sighra", "title": "Manual do Software Sighra", "technology": "sighra", "category": "technology"},
    {"id": "teclado-autotrac", "title": "Manual do Teclado Autotrac", "technology": "autotrac", "category": "keyboard"},
    {"id": "teclado-hibrido", "title": "Manual do Teclado Híbrido Sascar", "technology": "hibrido", "category": "keyboard"},
    {"id": "teclado-onixsat", "title": "Manual do Teclado Onixsat", "technology": "onixsat", "category": "keyboard"},
    {"id": "teclado-sascar-novo", "title": "Manual do Novo Tablet Sascar", "technology": "sascar-novo", "category": "keyboard"},
    {"id": "teclado-sascar-td50", "title": "TD50 - Guia Completo", "technology": "sascar-teclado", "category": "keyboard"},
]


def compact_text(value: str) -> str:
    return " ".join((value or "").replace("\x00", " ").split())


for manual in MANUALS:
    folder = ASSET_ROOT / manual["id"]
    reader = PdfReader(folder / "manual.pdf")
    manual["pages"] = len(reader.pages)
    extracted = [compact_text(page.extract_text() or "") for page in reader.pages]
    ocr_pages = OCR_TEXT.get(manual["id"], {})
    manual["pageText"] = [compact_text(f"{text} {ocr_pages.get(str(index + 1), '')}") for index, text in enumerate(extracted)]
    for index, text in enumerate(extracted, 1):
        if len(text) < 120:
            OCR_TARGETS.append({"manual": manual["id"], "page": index, "image": str(folder / f"page-{index:03d}.jpg")})
    manual["base"] = f"assets/manuals-imported/{manual['id']}"

output = "window.IMPORTED_MANUALS = " + json.dumps(MANUALS, ensure_ascii=False, separators=(",", ":")) + ";\n"
legacy_text = {}
for pdf in sorted((ROOT / "assets" / "manuals").glob("*/manual.pdf")):
    reader = PdfReader(pdf)
    key = pdf.parent.name
    extracted = [compact_text(page.extract_text() or "") for page in reader.pages]
    ocr_pages = OCR_TEXT.get(key, {})
    legacy_text[key] = [compact_text(f"{text} {ocr_pages.get(str(index + 1), '')}") for index, text in enumerate(extracted)]
    for index, text in enumerate(extracted, 1):
        if len(text) < 120:
            OCR_TARGETS.append({"manual": key, "page": index, "image": str(pdf.parent / f"page-{index:02d}.png")})
output += "window.LEGACY_MANUAL_TEXT = " + json.dumps(legacy_text, ensure_ascii=False, separators=(",", ":")) + ";\n"
(ASSET_ROOT / "manuals-index.js").write_text(output, encoding="utf-8")
(ROOT / "tmp").mkdir(exist_ok=True)
(ROOT / "tmp" / "ocr-targets.json").write_text(json.dumps(OCR_TARGETS, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OCR targets: {len(OCR_TARGETS)}")
