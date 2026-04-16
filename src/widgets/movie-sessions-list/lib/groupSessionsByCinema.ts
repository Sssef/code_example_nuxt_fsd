import type {
  Cinema,
  MovieSession,
  SessionInfo,
  MovieSessionDate,
} from "#common/model";

import {
  formatShortDate,
  formatShortTime,
} from "@shared/lib/formatters/formatter";

export function groupSessionsByCinema(
  sessions: MovieSession[],
  cinemas: Cinema[],
): Map<MovieSessionDate, Map<string, SessionInfo[]>> {
  const cinemaMapById = new Map<number, Cinema>(cinemas.map((c) => [c.id, c]));

  const result = new Map<MovieSessionDate, Map<string, SessionInfo[]>>();

  for (const session of sessions) {
    const day = formatShortDate(session.startTime);
    const time = formatShortTime(session.startTime);

    const cinemaName =
      cinemaMapById.get(session.cinemaId)?.name ?? "Неизвестный кинотеатр";

    let dayMap = result.get(day);
    if (!dayMap) {
      dayMap = new Map<string, SessionInfo[]>();
      result.set(day, dayMap);
    }

    let list = dayMap.get(cinemaName);
    if (!list) {
      list = [];
      dayMap.set(cinemaName, list);
    }

    list.push({
      id: session.id,
      time,
    });
  }

  return result;
}
