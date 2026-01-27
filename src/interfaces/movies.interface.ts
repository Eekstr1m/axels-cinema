export interface Movie {
  _id: string;
  title: string;
  description: string;
  posterUrl: string;
  duration: number;
  genres: string[];
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
