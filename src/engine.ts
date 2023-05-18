import type { CalendarEvent } from "./core";

interface RecurringEvent extends CalendarEvent {
    check: (day: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat') => boolean;
}

type CalendarDate = [number, number, number]; // DD/MM/YY

export const days: Map<CalendarDate, CalendarEvent> = new Map();
export const recurring: Array<RecurringEvent> = new Array();
