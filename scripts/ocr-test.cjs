const path = require("path");
const { createWorker } = require("tesseract.js");

(async () => {
  const image = process.argv[2];
  const cachePath = path.join(__dirname, "..", "tmp", "tesseract-cache");
  const worker = await createWorker("por+eng", 1, {
    cachePath,
    logger: (message) => {
      if (message.progress != null) process.stdout.write(`\r${message.status}: ${Math.round(message.progress * 100)}%`);
    },
  });
  const result = await worker.recognize(image);
  process.stdout.write(`\n${result.data.text.slice(0, 800)}\n`);
  await worker.terminate();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
