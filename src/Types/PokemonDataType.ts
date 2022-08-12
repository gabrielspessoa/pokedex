export interface PokemonDataType {
  id?: number | string;
  name?: string;
  order?: number;
  types?: {
    slot?: number;
    type?: {
      name?: string;
    };
  }[];
  weight?: number;
}
