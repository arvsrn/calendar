import { writable } from "svelte/store";

interface Task {
    title: string;
    completed: boolean;
}

type Color = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';

export interface CalendarEvent {
    startTime: number;
    endTime: number;
    name: string;
    description: string;
    color: Color;
    tasks: Array<Task>;
}

type CalendarDate = [number, number, number]; // DD/MM/YY

interface App {
    viewportDays: number;
    todaysTasks: Array<Task>;
    events: Map<CalendarDate, CalendarEvent>;
    showingSidebar: boolean;
    themeColor: Color;
}

export interface Toast {
    heading: string;
    description?: string;
}

export const app = writable<App>({
    viewportDays: 5,
    todaysTasks: [
        { title: 'This is a short & normal task.', completed: false },
        { title: '<b>This task</b> is <i>very wierd</i> and <u>wonky</u>.', completed: false },
        { title: 'This is a not so short task. Still normal, just longer', completed: true },
    ],
    events: new Map(),
    showingSidebar: false,
    themeColor: 'orange',
});

export const notifications = writable<Toast[]>([]);

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
export const addNotification = (notification: Toast) => {
    notifications.update(n => [...n, notification]);
};
export const removeNotification = (index: number) => {
    notifications.update(n => {
        n.splice(index);
        return n;
    });
}