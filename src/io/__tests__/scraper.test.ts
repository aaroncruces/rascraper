import { scrapeSingleGame } from "../../scraper/scraper";
import { mslugExpectedAssets } from "../../scraper/scraping_engines/__tests__/screenscraperHelpers/mslug_asset";

jest.mock("../apiRequest");

describe("scraping a single rom", () => {
  it("scrapes the assets from metal slug with the default parameters", async () => {
    await expect(scrapeSingleGame("mslug.zip")).resolves.toEqual(
      mslugExpectedAssets
    );
  });
  it("scrapes the assets from an invalid filename the default parameters", async () => {
    await expect(scrapeSingleGame("somerandomthing")).resolves.toEqual({});
  });
  it.only("gets a rom from smb2 from snes with the custom region of JP and the language of fr ", async () => {
    // await expect(scrapeSingleGame("somerandomthing")).resolves.toEqual({});
    const x = await expect(
      scrapeSingleGame("somerandomthing")
    ).resolves.toEqual({});
  });
});
