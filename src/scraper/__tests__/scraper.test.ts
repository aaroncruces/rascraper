import { mslugExpectedAssets } from "../../mockExampleObjects/screenscraper/assets/mslug_asset";
import { smb2ExpectedAssets } from "../../mockExampleObjects/screenscraper/assets/smb2_asset";
import { scrapeSingleGame } from "../../scraper/scraper";

jest.mock("../../io/apiRequest");

describe("scraping a single rom with ", () => {
  it("scrapes the assets from metal slug with the default parameters", async () => {
    await expect(scrapeSingleGame("mslug.zip")).resolves.toEqual(
      mslugExpectedAssets
    );
  });
  it("scrapes the assets from an invalid filename the default parameters", async () => {
    await expect(scrapeSingleGame("somerandomthing")).resolves.toEqual({});
  });
  it("gets a rom from smb2 from snes with the custom region of JP and the language of fr ", async () => {
    await expect(
      scrapeSingleGame("Super Mario Bros. 2 (USA).zip")
    ).resolves.toEqual(smb2ExpectedAssets);
  });
});
