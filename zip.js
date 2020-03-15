const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const fs = require("fs");
const archiver = require("archiver");

console.log("Bundling files...");

// bundle and compile files
webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }

  console.log("Done bundling");
  console.log("Saving to zip archive\n");

  // zip files:
  const output = fs.createWriteStream(__dirname + "/sanastorm.zip");
  const archive = archiver("zip", {
    zlib: { level: 9 } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on("close", function() {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on("end", function() {
    console.log("Data has been drained");
  });

  // good practice to catch this error explicitly
  archive.on("error", function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // add files and folders to zip archive
  archive.directory("dist"); // the compiled and bundled js code
  archive.directory("images"); // images files
  archive.file("manifest.json"); // extension manifest
  archive.file("popup.html"); // popup html

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  archive.finalize();

  console.log("Done saving to zip archive");
});
