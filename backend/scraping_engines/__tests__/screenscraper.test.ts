import scrape from "../screenscraper";
import { mslugExpectedAssets } from "./screenscraperHelpers/mslug_asset";
jest.mock("../../apiRequest");

describe("screenscraper engine", () => {
  it(" obtains the assets of the game metal slug", async () => {
    await expect(scrape("mslug.zip")).resolves.toEqual(mslugExpectedAssets);
  });
});
