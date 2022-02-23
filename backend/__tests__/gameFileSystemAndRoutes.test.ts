import {
  createFolder,
  createTextFileFromObject,
  deleteFileOrFolder,
} from "../fileSystem";
import {
  gameSystemFromRomExtension,
  gameSystemFromRomFolderRoute,
  getGamesRouteList,
} from "../gameFileSystemAndRoutes";
import { GameSystems } from "../structures/GameSystems";
import { resetGlobalFSMock } from "../__mocks__/fileSystem";

jest.mock("../fileSystem");
jest.mock("../gameFileSystemAndRoutes");

describe("--> Getting the gamesystem with gameSystemFromRomFolderRoute ", () => {
  it("obtains a game as an instance of GameSystem from the route ./.../gamesystemfolder/.../rom", () => {
    const folderRoute = "./testsandbox/snes";
    const gameRoute = folderRoute + "/examplerom.zip";
    expect(gameSystemFromRomFolderRoute(gameRoute)).toEqual(GameSystems.SNES);
  });

  it("obtains nothing as an instance of GameSystem from the route ./.../NotAgamesystemfolder/.../rom", async () => {
    const folderRoute = "./testsandbox/nosystem";
    const gameRoute = folderRoute + "/examplerom.unknown";
    expect(gameSystemFromRomFolderRoute(gameRoute)).toBeUndefined();
  });
});

describe("--> Getting the gamesystem with gameSystemFromRomExtension ", () => {
  it("obtains a game as an instance of GameSystem from the extension .gen in the route ./.../rom.gen", async () => {
    const folderRoute = "./testsandbox/snes";
    const gameRoute = folderRoute + "/examplerom.gen";
    expect(gameSystemFromRomExtension(gameRoute)).toEqual(
      GameSystems.MEGADRIVE
    );
  });

  it("Obtains nothing as an instance of GameSystem from the route ./.../NotAgamesystemfolder/.../rom", async () => {
    const folderRoute = "./testsandbox/megadrive";
    const gameRoute = folderRoute + "/examplerom.unknown";
    expect(gameSystemFromRomExtension(gameRoute)).toBeUndefined();
  });
});

describe("--> Gets a list of all the files in a folder with getGamesRouteList ", () => {
  const sandboxFolder = "./testsandbox";
  const rom1 = sandboxFolder + "/snesrom1111.zip";
  const rom2 = sandboxFolder + "/folder2/megadriverom.gen";
  const rom3 = sandboxFolder + "/folder3/subfolder/genesis.gen";
  const romNotSaved = sandboxFolder + "/folderNot/notsaved.gen";
  const emptyfolder = sandboxFolder + "/folderEmp/subfolderEmp";

  //the cleanup shoud work with and without mock
  beforeAll(async () => {
    resetGlobalFSMock();
    await createFolder(sandboxFolder);
  });
  afterAll(async () => {
    await deleteFileOrFolder(sandboxFolder);
  });

  it("Obtains files (games) from folder ./testsandbox", async () => {
    await createTextFileFromObject(rom1, {
      examplerom: "data",
    });
    await createTextFileFromObject(rom2, {
      examplerom: "data",
    });
    await createTextFileFromObject(rom3, {
      examplerom: "data",
    });
    await createFolder(emptyfolder);

    await expect(getGamesRouteList(sandboxFolder)).resolves.toEqual(
      expect.arrayContaining([rom1, rom2, rom3])
    );
    await expect(getGamesRouteList(sandboxFolder)).resolves.not.toEqual(
      expect.arrayContaining([romNotSaved])
    );
    await expect(getGamesRouteList(sandboxFolder)).resolves.not.toEqual(
      expect.arrayContaining([emptyfolder])
    );
  });
});
