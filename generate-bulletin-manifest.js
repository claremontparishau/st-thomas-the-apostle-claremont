const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'bulletin');

const files = fs.readdirSync(directoryPath);
const manifest = [];

// Iterate over the files in the /bulletin/ directory
for (const file of files) {
  const filePath = path.join(directoryPath, file);
  const fileStat = fs.statSync(filePath);

  // If it's a file, add it to the manifest
  if (fileStat.isFile()) {
    manifest.push({
      name: file,
      url: `/bulletin/${file}`,
      uploadTime: fileStat.mtime.getTime() // Get the modification time in milliseconds
    });
  }
}

// Sort the manifest based on upload time (most recent first)
manifest.sort((a, b) => b.uploadTime - a.uploadTime);

// Write the manifest file to disk
fs.writeFileSync('bulletin-manifest.json', JSON.stringify(manifest));
