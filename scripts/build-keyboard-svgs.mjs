import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = "C:/Users/ygor/Downloads/Teclados";
const outputRoot = path.resolve("assets/keyboards");

const keyboards = [
  ["autotrac", "autotrac.png", 619, 447, "image/png"],
  ["sascar-hybrid", "hibrido (1).png", 532, 371, "image/png"],
  ["omnilink", "omnilink.png", 594, 385, "image/png"],
  ["onixsat", "onixsat.png", 216, 121, "image/png"],
  ["positron", "positron.png", 435, 290, "image/png"],
  ["sascar-novo", "sascar-novo table.png", 403, 241, "image/png"],
  ["sascar-tablet", "sascar-tablet.png", 200, 132, "image/png"],
  ["sascar-keyboard", "sascar-teclado.png", 304, 229, "image/png"],
  ["sighra", "sighra.png", 689, 352, "image/png"],
  ["ravex", "teclado-Ravex.webp", 1016, 620, "image/webp"],
];

await mkdir(outputRoot, { recursive: true });

for (const [id, filename, width, height, mime] of keyboards) {
  const bytes = await readFile(path.join(sourceRoot, filename));
  const data = bytes.toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc"><title id="title">Teclado ${id}</title><desc id="desc">Representação fiel baseada na imagem de referência fornecida.</desc><image width="${width}" height="${height}" href="data:${mime};base64,${data}" preserveAspectRatio="xMidYMid meet"/></svg>`;
  await writeFile(path.join(outputRoot, `${id}.svg`), svg, "utf8");
}

console.log(`Gerados ${keyboards.length} SVGs em ${outputRoot}`);
