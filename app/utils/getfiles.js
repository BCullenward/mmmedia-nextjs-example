"use server";
const { readdir } = require("fs").promises;
const path = require("path");

export default async function getFileList(dirName) {
  var files = [];
  const items = await readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      var fd = `"{"DirectoryName: ${dirName}" "FileName: ${item.name}"}"`;

      files.push(fd);
    }
  }

  return files;
}
