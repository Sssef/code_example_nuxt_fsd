import type { Cinema } from "./cinemas";
import type { MovieSession } from "./movieSessions";

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  lengthMinutes: number;
  posterImage: string;
  rating: number;
}
export interface MoviePageDto {
  movie: Movie;
  sessions: MovieSession[];
  cinemas: Cinema[];
}
