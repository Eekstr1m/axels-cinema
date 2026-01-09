export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
}

export interface CharacterDetail extends Character {
  episode: {
    id: string;
    name: string;
    episode: string;
  }[];
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersData {
  characters: {
    info: CharactersInfo;
    results: Character[];
  };
}

export interface CharacterDetailData {
  character: CharacterDetail;
}
