import { mslug_SS_ExpectedAssets } from "../../mockExampleObjects/screenscraper/assets/mslug_asset";
import { smb2_SS_ExpectedAssets } from "../../mockExampleObjects/screenscraper/assets/smb2_asset";
import { scrapeGame } from "../../scraper/scraper";

jest.mock("../../io/apiRequest");
jest.setTimeout(500000); //if testing screenscraper online (goes really slow sometimes)

describe("Test scrapping with default parameters (screenscraper.fr)", () => {
  it("scrapes the assets from metal slug with the default parameters", async () => {
    await expect(scrapeGame("mslug.zip")).resolves.toEqual(
      mslug_SS_ExpectedAssets
    );
  });
  //todo: the rest
});
