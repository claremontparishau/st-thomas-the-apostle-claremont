const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'bulletin');

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    console.log('Error reading directory:', err);
    return;
  }

  const manifest = [];

  // Iterate over the files in the /bulletin/ directory
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const fileStat = fs.statSync(filePath);

    // If it's a file, add it to the manifest
    if (fileStat.isFile()) {
      manifest.push({
        name: file,
        url: `/bulletin/${file}`
      });
    }
  }

  // Write the manifest file to disk
  fs.writeFileSync('bulletin-manifest.json', JSON.stringify(manifest));
});
