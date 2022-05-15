import { mslug_SS_ExpectedAssets } from "../../mockExampleObjects/screenscraper/assets/mslug_asset";
import { smb2_SS_ExpectedAssets } from "../../mockExampleObjects/screenscraper/assets/smb2_asset";
import { scrapeGame } from "../../scraper/scraper";

jest.mock("../../io/apiRequest");
//jest.setTimeout(500000); //if testing screenscraper online (goes really slow sometimes)

describe("Test scrapping with default parameters (screenscraper.fr)", () => {
  it("scrapes the assets from metal slug with the default parameters", async () => {
    await expect(scrapeGame("mslug.zip")).resolves.toEqual(
      mslug_SS_ExpectedAssets
    );
  });
  it("scrapes the assets from an invalid filename the default parameters", async () => {
    await expect(scrapeGame("somerandomthing")).resolves.toEqual({});
  });
  it("gets a rom from smb2 from snes with the custom region of JP and the language of fr ", async () => {
    await expect(scrapeGame("Super Mario Bros. 2 (USA).zip")).resolves.toEqual(
      smb2_SS_ExpectedAssets
    );
  });
});
