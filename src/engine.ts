import type { CalendarEvent } from "./core";

interface RecurringEvent extends CalendarEvent {
    check: (day: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat') => boolean;
}

type CalendarDate = [number, number, number]; // DD/MM/YY

export const days: Map<CalendarDate, CalendarEvent> = new Map();
export const recurring: Array<RecurringEvent> = new Array();

// amount of days to generate on either side of the viewport for a smooth
// scrolling experience
export const getVelocity = (dx: number, dt: number) => {
    const width = document.getElementsByClassName('column')[0].clientWidth;
    return Math.ceil((3 * dx) / (2 * width * dt));
};
