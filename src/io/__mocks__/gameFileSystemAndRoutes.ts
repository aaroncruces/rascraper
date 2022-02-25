import {
  getGlobalFSMock,
  insertAndRetreiveMockRouteIntoObject,
} from "./fileSystem";

/**
 * mocks the functionality, beause is uses IO in the original
 */
export const getGamesRouteList = async (rootFolderRoute: string) => {
  const finalFileRouteList: Array<string> = [];
  const rootObject = getGlobalFSMock();
  const folderchain = rootFolderRoute.split("/");
  const folderReference: object = insertAndRetreiveMockRouteIntoObject(
    folderchain,
    rootObject
  )!;
  for (let folderItemKey in folderReference) {
    const itemRoute = rootFolderRoute + "/" + folderItemKey;
    //@ts-ignore
    const referencedItem = folderReference[folderItemKey];

    if (!referencedItem || Object.keys(referencedItem).length == 0) continue;
    //if is a "file" since it have the "value" property
    if (referencedItem.value) {
      finalFileRouteList.push(itemRoute);
      continue;
    }
    // is a "folder" since it have a property wich is not "value"
    const subFolderFileRouteList = await getGamesRouteList(itemRoute);
    subFolderFileRouteList.forEach((subFolderFileRoute) =>
      finalFileRouteList.push(subFolderFileRoute)
    );
  }

  return finalFileRouteList;
};

//forwarding non-mocked items
export const { gameSystemFromRomFolderRoute, gameSystemFromRomExtension } =
  jest.requireActual("../gameFileSystemAndRoutes");
