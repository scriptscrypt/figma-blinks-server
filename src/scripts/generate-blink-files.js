// File: scripts/generate-blink-files.js

const fs = require('fs').promises;
const path = require('path');

async function generateBlinkFiles() {
  const blinksDir = path.join(process.cwd(), 'app', 'api', 'actions', 'blinks');

  // Ensure the blinks directory exists
  await fs.mkdir(blinksDir, { recursive: true });

  // Read the blinks data file (you'll need to create this)
  const blinksData = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'blinks.json'), 'utf-8'));

  for (const blink of blinksData) {
    const fileName = `${blink.fileName}`;
    await fs.writeFile(path.join(blinksDir, fileName), blink.fileContent);
    console.log(`Generated file: ${fileName}`);
  }
}

generateBlinkFiles().catch(console.error);