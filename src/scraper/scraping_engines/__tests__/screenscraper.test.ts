import { GameSystems } from "../../../interfacesAndStructures/GameSystems";
import { aeromegaExpectedAssets } from "../../../mockExampleObjects/screenscraper/assets/aeromega_asset";
import { aerosnesExpectedAssets } from "../../../mockExampleObjects/screenscraper/assets/aerosnes_asset";
import { mslugExpectedAssets } from "../../../mockExampleObjects/screenscraper/assets/mslug_asset";
import scrape from "../screenscraper";

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
