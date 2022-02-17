/**
 * A list of URL containing assets like images or videos,
 * used in a game frontend .
 *
 * also descriptions and gamenames as text
 */
export interface Assets {
  gameName?: string;
  gameDescription?: string;
  snapURL?: string;
  snapCRC?: string;
  titleURL?: string;
  titleCRC?: string;
  boxartURL?: string;
  boxartCRC?: string;
}
