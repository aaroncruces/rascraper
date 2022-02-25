import { GameSystems } from "../../../interfacesAndStructures/GameSystems";
import scrape from "../screenscraper";
import { aeromegaExpectedAssets } from "./screenscraperHelpers/aeromega_asset";
import { aerosnesExpectedAssets } from "./screenscraperHelpers/aerosnes_asset";
import { mslugExpectedAssets } from "./screenscraperHelpers/mslug_asset";
jest.mock("../../../io/apiRequest");
//jest.setTimeout(500000); //if testing screenscraper online (goes really slow sometimes)

describe("--> Screenscraper engine", () => {
  it("Obtains the assets of the game metal slug", async () => {
    await expect(scrape("mslug.zip")).resolves.toEqual(mslugExpectedAssets);
  });

  it("Obtains the assets of the game Aero the Acro-Bat on Super Nintendo", async () => {
    await expect(
      scrape("Aero the Acro-Bat (USA).sfc", undefined, GameSystems.SNES)
    ).resolves.toEqual(aerosnesExpectedAssets);
  });

  it("Obtains the assets of the game Aero the Acro-Bat on MegaDrive", async () => {
    await expect(
      scrape("Aero the Acro-Bat (USA).sfc", undefined, GameSystems.MEGADRIVE)
    ).resolves.toEqual(aeromegaExpectedAssets);
  });
  it("Obtains {} from a random non existant rom in the db", async () => {
    await expect(scrape("somerandomfile")).resolves.toEqual({});
  });
});
