import type { Cinema } from "./cinemas";
import type { Movie } from "./movies";

export interface Session {
  id: number;
  startTime: string;
  endTime: string;
  price: number;
}

export interface MovieSession extends Session {
  movieId: number;
  cinemaId: number;
}

export interface SessionInfo {
  id: number;
  time: string;
}

export type MovieSessionDate = string;

export type MovieSessionWithSeats = MovieSession & {
  seats: SeatLayout;
};

export type MovieSessionDetails = MovieSessionWithSeats & {
  bookedSeats: BookedSeat[];
};

export type MovieSessionPageData = Omit<
  MovieSessionDetails,
  "movieId" | "cinemaId"
> & {
  movie: Movie;
  cinema: Cinema;
};

export type MovieSessionDto = MovieSessionPageData;

export type SeatLayout = {
  rows: number;
  seatsPerRow: number;
};

export type BookedSeat = {
  rowNumber: number;
  seatNumber: number;
};

export type Seat = {
  id: string;
  row: number;
  seat: number;
  isBooked: boolean;
};
