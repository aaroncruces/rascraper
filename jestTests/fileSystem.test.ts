import { createFolder, deleteFolder } from "../backend/fileSystem";

describe.skip("temporarily skipping already tested: create and delete folders and text files", () => {
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
      deleteFolder("./testsandbox/jestfoldertest")
    ).resolves.toBeTruthy();
  });

  it("deletes a nonexistant folder", async () => {
    await expect(
      deleteFolder("./testsandbox/somefolderNonExistant")
    ).resolves.toBeTruthy();
  });
});

describe("create and delete folders and text files", () => {
  /*
  it("", () => {

  });
  */
  it("creates a text file named jestfiletest.json with a json object", () => {
    const testObjectToBeWritten = { hello: "world", hola: "mundo" };
    //test writting nothing
    //write object
    //read objct
  });
  //it
  //it creates a folder named jestfilefolder having a file with the same name
  //it does the same thing with a file
});
