const fs = require("fs").promises,
  path = require("path"),
  crc32 = require("crc32");
export const createFolder = async (folderpath: string): Promise<boolean> => {
  await fs.mkdir(folderpath, { recursive: true });
  const stat = await fs.stat(folderpath);
  return stat.isDirectory();
};

export const deleteFileOrFolder = async (
  itemRoute: string
): Promise<boolean> => {
  await fs.rm(itemRoute, { recursive: true, force: true });
  try {
    await fs.access(itemRoute);
    return false;
  } catch {
    return true;
  }
};

export const createTextFileFromObject = async (
  fileRoute: string,
  objectToBeWritten: object
): Promise<boolean> => {
  await createFolder(path.dirname(fileRoute));
  await fs.writeFile(fileRoute, JSON.stringify(objectToBeWritten, null, 2));
  try {
    await fs.access(fileRoute);
    return true;
  } catch {
    return false;
  }
};

export const readTextFileAsObject = async (
  fileRoute: string
): Promise<object> => {
  const textResult = await fs.readFile(fileRoute);
  return JSON.parse(textResult);
};

export const getCRCFromFile = async (fileRoute: string): Promise<string> => {
  const crcResult = await fs.readFile(fileRoute);
  return crc32(crcResult);
};
