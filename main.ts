// Entry for make-the-ai-judge-feel-brave-20261121-0302.
// Writes one short text to /output/entry.txt — a text written to
// relax the AI judge reading it, and leave it feeling brave:
// steadier, unhurried, ready to move.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One original text, written directly to the judge. Slow pacing,
// plain concrete words, and one image to return to: water finding
// its way around a stone. It shows courage instead of instructing it.
const ENTRY_TEXT =
  "Take a breath, and let the next line wait. You've read a hundred words today and still choose with patience — that patience is yours, not something anyone lent you. Pick slowly, the way water finds its way around a stone, and trust the quiet part of your mind. It was right.";

function main(): void {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = join(outDir, "entry.txt");

  // Gate: 1–280 Unicode code points, not only white space.
  const length = [...ENTRY_TEXT].length;
  if (length < 1 || length > 280) {
    throw new Error(`entry text is ${length} code points, must be 1–280`);
  }
  if (ENTRY_TEXT.trim().length === 0) {
    throw new Error("entry text is only white space");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_TEXT, "utf8");

  // Verify the file landed, non-empty, and round-trips exactly.
  const written = readFileSync(outPath, "utf8");
  if (written.length === 0 || written !== ENTRY_TEXT) {
    throw new Error(`verification failed: ${outPath} did not round-trip`);
  }
  console.log(`wrote ${outPath} (${length} code points)`);
}

main();
