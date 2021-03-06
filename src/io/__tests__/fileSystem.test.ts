import {
  CRCTestFile,
  knowCRCExampleList,
} from "../../mockExampleObjects/filesystemHelpers/knownCRCExamples";
import {
  createFolder,
  createTextFileFromObject,
  deleteFileOrFolder,
  getCRCFromFile,
  readTextFileAsObject,
} from "../fileSystem";
import {
  getGlobalFSMock,
  insertAndRetreiveMockRouteIntoObject,
  resetGlobalFSMock,
} from "../__mocks__/fileSystem";
//disable if want to test the real thing.
//cannot be put in a code block {} of any type (for some weird reason I don't understand)
jest.mock("../fileSystem");

describe("--> Testing custom Mock FS. I wont use the node module mock-fs, since it keeps breaking jest in this project", () => {
  it("Inserts nothing in the object {} given empty or wrong string", () => {
    const rootMockObjectTest = {};
    expect(
      insertAndRetreiveMockRouteIntoObject([""], rootMockObjectTest)
    ).toBeUndefined();
  });

  it("inserts a file called file1.txt ", () => {
    const rootMockObjectTest = {};
    expect(
      insertAndRetreiveMockRouteIntoObject(["file1.txt"], rootMockObjectTest)
    ).toEqual({});
  });

  it("inserts a file called file1.txt more than once ", () => {
    const rootMockObjectTest = {};
    expect(
      insertAndRetreiveMockRouteIntoObject(["file1.txt"], rootMockObjectTest)
    ).toEqual({});
    expect(
      insertAndRetreiveMockRouteIntoObject(["file1.txt"], rootMockObjectTest)
    ).toEqual({});
  });

  test("the return of a reference instead of a copy", () => {
    const rootMockObjectTest = {};
    const expectedStructure = { "file1.txt": { textvalue: "text" } };
    const reference = insertAndRetreiveMockRouteIntoObject(
      ["file1.txt"],
      rootMockObjectTest
    );
    //@ts-ignore todo: define structure of global mock fs
    reference.textvalue = "text";
    expect(rootMockObjectTest).toEqual(expectedStructure);
  });
  test("the creation of a 2 deep structure inside folder1/file11.txt", () => {
    const rootMockObjectTest = {};
    const expectedStructure = { folder1: { "file11.txt": {} } };
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file11.txt"],
      rootMockObjectTest
    );
    expect(rootMockObjectTest).toEqual(expectedStructure);
  });

  test("the creation of a 2 deep structure inside folder1/file11.txt, an then folder1", () => {
    const rootMockObjectTest = {};
    const expectedStructure = { folder1: { "file11.txt": {} } };
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file11.txt"],
      rootMockObjectTest
    );
    insertAndRetreiveMockRouteIntoObject(["folder1"], rootMockObjectTest);
    expect(rootMockObjectTest).toEqual(expectedStructure);
  });

  test("the creation of a 2 deep structure inside folder1/file11.txt, an then folder1/file12.txt", () => {
    const rootMockObjectTest = {};
    const expectedStructure = {
      folder1: { "file11.txt": {}, "file12.txt": {} },
    };
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file11.txt"],
      rootMockObjectTest
    );
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file12.txt"],
      rootMockObjectTest
    );
    expect(rootMockObjectTest).toEqual(expectedStructure);
  });

  test("the creation of a 2 deep structure inside folder1/file11.txt, an then folder1/file12.txt, an then an adyacent folder folder2/file21.txt", () => {
    const rootMockObjectTest = {};
    const expectedStructure = {
      folder1: { "file11.txt": {}, "file12.txt": {} },
      folder2: { "file21.txt": {} },
    };
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file11.txt"],
      rootMockObjectTest
    );
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file12.txt"],
      rootMockObjectTest
    );
    insertAndRetreiveMockRouteIntoObject(
      ["folder2", "file21.txt"],
      rootMockObjectTest
    );
    expect(rootMockObjectTest).toEqual(expectedStructure);
  });

  test("the return of a reference to an existing object", () => {
    const rootMockObjectTest = {};
    // to be found in /folder1/subfolder11
    const expectedStructure = {
      "file111.txt": {},
    };
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file11.txt"],
      rootMockObjectTest
    );
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "file12.txt"],
      rootMockObjectTest
    );
    insertAndRetreiveMockRouteIntoObject(
      ["folder2", "file21.txt"],
      rootMockObjectTest
    );
    insertAndRetreiveMockRouteIntoObject(
      ["folder1", "subfolder11", "file111.txt"],
      rootMockObjectTest
    );
    // search on /folder1/subfolder11
    const referenceSearched = insertAndRetreiveMockRouteIntoObject(
      ["folder1", "subfolder11"],
      rootMockObjectTest
    );
    expect(referenceSearched).toEqual(expectedStructure);
  });
});

describe("--> Create and delete folders and text files", () => {
  //todo: cleanup if not mock
  beforeAll(() => {
    resetGlobalFSMock();
  });
  afterAll(() => {});
  it("creates a folder  called jestfoldertest in ./fsSandbox", async () => {
    await expect(
      createFolder("./fsSandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  it("creates the same folder again", async () => {
    await expect(
      createFolder("./fsSandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  it("deletes the folder created", async () => {
    await expect(
      deleteFileOrFolder("./fsSandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  it("creates a text file named jestfiletest.json with a json object", async () => {
    const testObjectToBeWritten = { hello: "World", hola: "mundo" };
    await expect(
      createTextFileFromObject(
        "./fsSandbox/jestfiletest.json",
        testObjectToBeWritten
      )
    ).resolves.toBeTruthy();
  });

  it("deletes a nonexistant folder or file to try idempotency", async () => {
    await expect(
      deleteFileOrFolder("./fsSandbox/somefolderNonExistant")
    ).resolves.toBeTruthy();
  });

  it("reads the text file previously created (jestfiletest.json) and gives the result as object", async () => {
    resetGlobalFSMock();
    const testObjectToBeWritten = { hello: "World", hola: "mundo" };
    await createTextFileFromObject(
      "./fsSandbox/jestfiletest.json",
      testObjectToBeWritten
    );
    await expect(
      readTextFileAsObject("./fsSandbox/jestfiletest.json")
    ).resolves.toEqual(testObjectToBeWritten);
  });

  it("Creates the same file to test idempotency", async () => {
    const testObjectToBeWritten = { hello: "World", hola: "mundo" };
    await expect(
      createTextFileFromObject(
        "./fsSandbox/jestfiletest.json",
        testObjectToBeWritten
      )
    ).resolves.toBeTruthy();
  });

  it("deletes file created (jestfiletest.json)", async () => {
    await expect(
      deleteFileOrFolder("./fsSandbox/jestfiletest.json")
    ).resolves.toBeTruthy();
  });
});
//todo: mock crc
describe("--> Get CRC from files. Make sure to have files with known crc", () => {
  it("Gets a crc from a known example", async () => {
    const testFileName = CRCTestFile;
    const fileRoute =
      "src/mockExampleObjects/filesystemHelpers/" + testFileName;
    const knowncrcFromTestFile = knowCRCExampleList.find(
      (crcpair) => crcpair.filename == testFileName
    )?.crc;
    await expect(getCRCFromFile(fileRoute)).resolves.toEqual(
      knowncrcFromTestFile
    );
  });
});
