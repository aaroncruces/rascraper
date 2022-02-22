//todo: define ts structure of mock fs

const globalAccess: any = global;

export const resetGlobalFSMock = () => (globalAccess.globalFSMock = {});

export const getGlobalFSMock = (): object => {
  if (!globalAccess.globalFSMock) resetGlobalFSMock();
  return globalAccess.globalFSMock;
};

/**
 *
 * @param folderChain a path in the form of ["folder","subfolder","file/subfolder"]
 * @param rootObject the objet that will contain {...,folder:{.., subfolder:{...,file:{}}}}
 * @returns the file object reference, in the case of a new file returns the reference to after creating it {}
 */
export const insertAndRetreiveMockRouteIntoObject = (
  folderChain: Array<string>,
  rootObject: object
): object | undefined => {
  if (folderChain)
    folderChain = folderChain.filter(
      (folderLink) =>
        folderLink &&
        folderLink.trim() != "" &&
        folderLink.trim() != "." &&
        folderLink.trim() != ".."
    );

  if (!folderChain || folderChain.length == 0) return;

  //@ts-ignore because ts(7053)
  let foundNamedItemOnTop = rootObject[folderChain[0]];
  if (!foundNamedItemOnTop)
    //@ts-ignore
    foundNamedItemOnTop = rootObject[folderChain[0]] = {};

  if (folderChain.length == 1) {
    //@ts-ignore because ts(7053)
    return rootObject[folderChain[0]];
  }

  const rootFolderItem = folderChain.shift();
  //@ts-ignore
  rootObject[rootFolderItem] = foundNamedItemOnTop;
  return insertAndRetreiveMockRouteIntoObject(folderChain, foundNamedItemOnTop);
};

export const createFolder = async (folderpath: string): Promise<boolean> => {
  const rootObject = getGlobalFSMock();
  const folderchain = folderpath.split("/");
  const returnedReference = insertAndRetreiveMockRouteIntoObject(
    folderchain,
    rootObject
  );
  //todo: distinguish between folder and file
  //@ts-ignore
  if (returnedReference?.value) return false;
  return !!returnedReference;
};

export const deleteFileOrFolder = async (
  folderpath: string
): Promise<boolean> => {
  const rootObject = getGlobalFSMock();
  const folderchain = folderpath.split("/");
  const itemToDelete = folderchain.pop();
  let referenceToContainingFolder: object | undefined;
  if (folderchain.length > 0)
    referenceToContainingFolder = insertAndRetreiveMockRouteIntoObject(
      folderchain,
      rootObject
    );
  else referenceToContainingFolder = getGlobalFSMock();
  //@ts-ignore
  delete referenceToContainingFolder[itemToDelete];
  return true;
};
