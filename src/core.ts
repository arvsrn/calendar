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
        { title: 'Publish blog post.', completed: false },
        { title: '<b>Config</b> @ Figma.', completed: false },
        { title: 'Work on Notion CMS', completed: false },
        { title: 'Design calendar onboarding', completed: true },
        { title: 'Implement authentication', completed: true },
        { title: 'Implement SSR & NoSQL DB', completed: true },
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