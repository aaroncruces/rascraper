import {
  createFolder,
  createTextFileFromObject,
  deleteFileOrFolder,
  readTextFileAsObject,
} from "../backend/fileSystem";

const globalAccess: any = global;

jest.mock("../backend/fileSystem", () => {
  const mockCreateFolder = jest.fn(async (folderRoute: string) => {
    console.log("mockCreateFolder");
    if (!globalAccess.globalFSMock) globalAccess.globalFSMock = {};
    let globalFSMock = globalAccess.globalFSMock;
    //todo: insert the "folder" in globalFSMock
    return true;
  });
  const originalModule = jest.requireActual("../backend/fileSystem.ts");
  return {
    __esModule: true,
    ...originalModule,
    createFolder: mockCreateFolder,
  };
});
describe.skip("temporarily skipping already tested: create and delete folders and text files", () => {
  //todo: mock this when tested
  beforeAll(() => {
    //todo: delete all folders and files in ./testsandbox
  });
  it("creates a folder  called jestfoldertest in ./testsandbox", async () => {
    await expect(
      createFolder("./testsandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  it("creates the same folder again", async () => {
    await expect(
      createFolder("./testsandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  it("deletes the folder created", async () => {
    await expect(
      deleteFileOrFolder("./testsandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  it("deletes a nonexistant folder or file to try idempotency", async () => {
    await expect(
      deleteFileOrFolder("./testsandbox/somefolderNonExistant")
    ).resolves.toBeTruthy();
  });

  let testObjectToBeWritten = { hello: "World", hola: "mundo" };
  it("creates a text file named jestfiletest.json with a json object", async () => {
    await expect(
      createTextFileFromObject(
        "./testsandbox/jestfiletest.json",
        testObjectToBeWritten
      )
    ).resolves.toBeTruthy();
  });
  it("reads the text file previously created (jestfiletest.json) and gives the result as object", async () => {
    await expect(
      readTextFileAsObject("./testsandbox/jestfiletest.json")
    ).resolves.toEqual(testObjectToBeWritten);
  });

  it("Creates the same file to test idempotency", async () => {
    await expect(
      createTextFileFromObject(
        "./testsandbox/jestfiletest.json",
        testObjectToBeWritten
      )
    ).resolves.toBeTruthy();
  });

  it("deletes file created (jestfiletest.json)", async () => {
    await expect(
      deleteFileOrFolder("./testsandbox/jestfiletest.json")
    ).resolves.toBeTruthy();
  });
});

describe("create and delete folders and text files", () => {
  it("creates a folder  called jestfoldertest in ./testsandbox", async () => {
    await expect(
      createFolder("./testsandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  //test writting nothing
  //write object
  //read objct
  //it
  //it creates a folder named jestfilefolder having a file with the same name
  //it does the same thing with a file
});
