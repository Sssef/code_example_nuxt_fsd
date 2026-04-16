import type { Movie } from "./movies";
import type { MovieSession } from "./movieSessions";

export interface Cinema {
  id: number;
  name: string;
  address: string;
}

export type CinemaPageDto = {
  cinema: Cinema;
  movies: Movie[];
  sessions: MovieSession[];
};
