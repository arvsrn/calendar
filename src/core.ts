import { writable } from "svelte/store";

interface Task {
    title: string;
    completed: boolean;
}

interface CalendarEvent {
    name: string;
    description: string;
    startTime: number;
    endTime: number;
}

type CalendarDate = [number, number, number]; // DD/MM/YY

interface App {
    viewportDays: number;
    todaysTasks: Array<Task>;
    events: Map<CalendarDate, CalendarEvent>;
}

export const app = writable<App>({
    viewportDays: 5,
    todaysTasks: [
        { title: 'This is a short & normal task.', completed: false },
        { title: '<b>This task</b> is <i>very wierd</i> and <u>wonky</u>.', completed: false },
        { title: 'This is a not so short task. Still normal, just longer', completed: true },
    ],
    events: new Map()
});

export const getCompletedTasks = (tasks: Array<Task>): Array<Task> => tasks.filter(n => n.completed);
export const incrementViewportDays = (by: number) => {
    document.documentElement.style.setProperty('--viewport-days',
        `${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--viewport-days') || '0') + by}`
    );
    app.update(app => {
        app.viewportDays += by;
        return app;
    });
};