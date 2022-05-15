import { knowCRCExampleList } from "../../mockExampleObjects/filesystemHelpers/knownCRCExamples";
import { getGameInfoListFromScraper, getGameNamesAndCRCList } from "../main";
const path = require("path");

describe.skip("getGameNamesAndCRCList", () => {
  test("each element given by getGameNamesAndCRCList must be consistant filename and fileroute", async () => {
    const romNameAndCRCStructList = await getGameNamesAndCRCList("romsandbox");
    romNameAndCRCStructList.forEach((romnameAndCRCStructItem) => {
      const basenameFromFileRoute = path.basename(
        romnameAndCRCStructItem.fileRoute || ""
      );
      expect(romnameAndCRCStructItem.filename).toEqual(basenameFromFileRoute);
    });
  });

  //mock comparison
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
describe("logs", () => {
  test("log", async () => {
    const testing = await getGameInfoListFromScraper("romsandbox");
  });
});
