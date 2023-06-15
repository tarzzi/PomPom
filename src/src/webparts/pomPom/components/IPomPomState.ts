// state for the pomPom webpart
export interface IPomPomState {
    timer: number;
    timerRunning: boolean;
    timerPaused: boolean;
    timerDone: boolean;
    pomodoroCount: number;
    shortBreakCount: number;
    longBreakCount: number;
    completeCycles: number;
    nextAction: string;
}