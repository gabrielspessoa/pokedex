export interface PokemonDataType {
  id: number;
  name: string;
  order: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  weight: number;
}
