import type { Seat } from "./seat.interface";

export interface Session {
  _id: string;
  movieId: string;
  date: string;
  startTime: string;
}

export interface DetailedSession extends Omit<Session, "movieId"> {
  movieId: {
    _id: string;
    title: string;
  };
  seats: Seat[][];
  price: number;
}
