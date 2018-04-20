const path = require("path");
const util = require("util");
const read = require("fs-readdir-recursive");

/*
* Given list of file paths, return array of project objects
*/
const processItems = (allItems, depth) => {
  // filter for files + directories at depth
  const { files, dirs } = allItems.reduce(
    (mapping, file) => {
      return isFile(file, depth)
        ? { ...mapping, files: [...mapping["files"], file] }
        : { ...mapping, dirs: [...mapping["dirs"], file] };
    },
    { files: [], dirs: [] }
  );

  const processedFiles = processFiles(files, depth);
  const processedDirs = processDirs(dirs, depth);

  return [...processedFiles, ...processedDirs];
};

const processFiles = (files, depth) =>
  files.map(file => ({
    title: formatTitle(getNameAtDepth(file, depth).split(".")[0]),
    path: "/" + file
  }));

const processDirs = (dirs, depth) => {
  const uniqueDirs = getUniqueDirAtDepth(dirs, depth);
  const newDepth = depth === 0 ? 2 : depth + 1;
  return uniqueDirs.map(uniqueDir => {
    const dirFiles = dirs.filter(
      dir => getNameAtDepth(dir, depth) === uniqueDir
    );
    return {
      title: formatTitle(uniqueDir),
      subs: processItems(dirFiles, newDepth)
    };
  });
};

/**
 * Helper methods
 */
const getNameAtDepth = (filePath, depth) => filePath.split("/")[depth];

const isFile = (filePath, depth) =>
  getNameAtDepth(filePath, depth).split(".").length > 1;

const getUniqueDirAtDepth = (files, depth) =>
  files
    .map(file => getNameAtDepth(file, depth))
    .reduce(
      (allNames, file) =>
        allNames.indexOf(file) === -1 ? [...allNames, file] : allNames,
      []
    );

/**
 * Formatting title
 */
const formatTitle = name => capitalizeTitle(name.replace("_", " "));
const capitalizeTitle = name => name.charAt(0).toUpperCase() + name.substr(1);

// Main function
export default () => {
  const pathName = path.resolve(__dirname, "..", "..", "pages");
  const files = read(pathName, (name, index, dir) => {
    return (
      dir.split("/").indexOf("resources") === -1 &&
      name !== "resources" &&
      name[0] !== "."
    );
  });

  const processedItems = processItems(files, 0);
  return processedItems;
};
