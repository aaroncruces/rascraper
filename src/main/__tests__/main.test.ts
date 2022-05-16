import { GameCompleteInformation } from "../../interfacesAndStructures/GameCompleteInformation";
import { knowCRCExampleList } from "../../mockExampleObjects/filesystemHelpers/knownCRCExamples";
import { getGameInfoListFromScraper, getGameNamesAndCRCList } from "../main";
const path = require("path");
jest.setTimeout(500000); //if testing screenscraper online (goes really slow sometimes)
jest.mock("../../io/apiRequest");

describe("getGameNamesAndCRCList. using the folder 'romsandbox' and knownCRCExamples.knowCRCExampleList", () => {
  test("each element given by getGameNamesAndCRCList", async () => {
    const romNameAndCRCStructList = await getGameNamesAndCRCList("romsandbox");
    romNameAndCRCStructList.forEach((romnameAndCRCStructItem) => {
      const basenameFromFileRoute = path.basename(
        romnameAndCRCStructItem.fileRoute || ""
      );
      expect(romnameAndCRCStructItem.filename).toEqual(basenameFromFileRoute);
    });
  });

  test("each element given by getGameNamesAndCRCList must give a valid crc", async () => {
    const romNameAndCRCStructList = await getGameNamesAndCRCList("romsandbox");

    romNameAndCRCStructList.forEach((romnameAndCRCStructItem) => {
      const knowCRCExampleItem = knowCRCExampleList.find(
        (crcItem) => crcItem.filename == romnameAndCRCStructItem.filename
      );
      expect(romnameAndCRCStructItem.crc).toEqual(knowCRCExampleItem?.crc);
    });
  });
});
describe.skip("getGameInfoListFromScraper. only for logging. didn't mock.", () => {
  test("getGameInfoListFromScraper.", async () => {
    const infolist: GameCompleteInformation[] =
      await getGameInfoListFromScraper("romsandbox");
    //
  });
});
