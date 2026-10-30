const fs = require("fs");
const path = require("path");
const { createWorker } = require("tesseract.js");

const root = path.resolve(__dirname, "..");
const targetsPath = path.join(root, "tmp", "ocr-targets.json");
const outputPath = path.join(root, "assets", "manuals-imported", "ocr-index.json");
const cachePath = path.join(root, "tmp", "tesseract-cache");
const targets = JSON.parse(fs.readFileSync(targetsPath, "utf8"));
const output = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, "utf8")) : {};
const pending = targets.filter((target) => !output[target.manual]?.[String(target.page)]);

function save() {
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf8");
}

async function runWorker(workerNumber) {
  const worker = await createWorker("por+eng", 1, { cachePath });
  while (pending.length) {
    const target = pending.shift();
    if (!target) break;
    const result = await worker.recognize(target.image);
    output[target.manual] ||= {};
    output[target.manual][String(target.page)] = String(result.data.text || "").replace(/\s+/g, " ").trim();
    save();
    process.stdout.write(`[${workerNumber}] ${target.manual} ${target.page} (${targets.length - pending.length}/${targets.length})\n`);
  }
  await worker.terminate();
}

Promise.all([runWorker(1), runWorker(2)])
  .then(() => save())
  .catch((error) => {
    console.error(error);
    save();
    process.exitCode = 1;
  });
