"use client";

import { useReducer, useCallback } from "react";
import type { Timeline, YearEntry, YearEvent } from "@/types/timeline";

type Action =
  | { type: "SET_TITLE"; title: string }
  | { type: "SET_YEARS"; startYear: number; endYear: number }
  | { type: "ADD_EVENT"; year: number; eventId: string }
  | { type: "REMOVE_EVENT"; year: number; eventId: string }
  | { type: "RESET" };

const currentYear = new Date().getFullYear();

const initialState: Timeline = {
  title: "我们的十年",
  startYear: currentYear - 9,
  endYear: currentYear,
  years: [],
};

function getOrCreateYear(years: YearEntry[], year: number): YearEntry {
  return years.find((y) => y.year === year) ?? { year, events: [] };
}

function reducer(state: Timeline, action: Action): Timeline {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.title };

    case "SET_YEARS": {
      const years = state.years.filter(
        (y) => y.year >= action.startYear && y.year <= action.endYear
      );
      return { ...state, startYear: action.startYear, endYear: action.endYear, years };
    }

    case "ADD_EVENT": {
      const yearEntry = getOrCreateYear(state.years, action.year);
      const existing = yearEntry.events.find((e) => e.eventId === action.eventId);

      const updatedEvents: YearEvent[] = existing
        ? yearEntry.events.map((e) =>
            e.eventId === action.eventId ? { ...e, count: e.count + 1 } : e
          )
        : [...yearEntry.events, { eventId: action.eventId, count: 1 }];

      const updatedYear: YearEntry = { ...yearEntry, events: updatedEvents };
      const otherYears = state.years.filter((y) => y.year !== action.year);
      return { ...state, years: [...otherYears, updatedYear].sort((a, b) => a.year - b.year) };
    }

    case "REMOVE_EVENT": {
      const yearEntry = getOrCreateYear(state.years, action.year);
      const existing = yearEntry.events.find((e) => e.eventId === action.eventId);
      if (!existing) return state;

      const updatedEvents: YearEvent[] =
        existing.count > 1
          ? yearEntry.events.map((e) =>
              e.eventId === action.eventId ? { ...e, count: e.count - 1 } : e
            )
          : yearEntry.events.filter((e) => e.eventId !== action.eventId);

      const updatedYear: YearEntry = { ...yearEntry, events: updatedEvents };
      const otherYears = state.years.filter((y) => y.year !== action.year);
      const allYears = updatedEvents.length > 0
        ? [...otherYears, updatedYear].sort((a, b) => a.year - b.year)
        : otherYears;
      return { ...state, years: allYears };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useTimeline() {
  const [timeline, dispatch] = useReducer(reducer, initialState);

  const setTitle = useCallback((title: string) => dispatch({ type: "SET_TITLE", title }), []);
  const setYears = useCallback(
    (startYear: number, endYear: number) => dispatch({ type: "SET_YEARS", startYear, endYear }),
    []
  );
  const addEvent = useCallback(
    (year: number, eventId: string) => dispatch({ type: "ADD_EVENT", year, eventId }),
    []
  );
  const removeEvent = useCallback(
    (year: number, eventId: string) => dispatch({ type: "REMOVE_EVENT", year, eventId }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return { timeline, setTitle, setYears, addEvent, removeEvent, reset };
}
