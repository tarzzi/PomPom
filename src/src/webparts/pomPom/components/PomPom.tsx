import * as React from "react";
import styles from "./PomPom.module.scss";
import { IPomPomProps } from "./IPomPomProps";
import { IPomPomState } from "./IPomPomState";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";

enum TimerAction {
  Pomodoro = "Pomodoro",
  ShortBreak = "Short Break",
  LongBreak = "Long Break",
}

export default class PomPom extends React.Component<
  IPomPomProps,
  IPomPomState
> {
  constructor(props: IPomPomProps) {
    super(props);
    this.state = {
      timer: 0,
      pomodoroCount: 0,
      shortBreakCount: 0,
      longBreakCount: 0,
      timerRunning: false,
      timerDone: false,
      timerPaused: false,
      completeCycles: 0,
      nextAction: TimerAction.Pomodoro,
    };
  }

  private _pomodoro = (): void => {
    const { pomodoroCount, shortBreakCount, longBreakCount } = this.state;
    let timer = 0;
    let timerSet = false;

    if (pomodoroCount === 4 && shortBreakCount === 3 && longBreakCount === 0) {
      timer = 15 * 60;
      const completedCycles = this.state.completeCycles + 1;
      this.setState({
        pomodoroCount: 0,
        shortBreakCount: 0,
        longBreakCount: 0,
        completeCycles: completedCycles,
      });
      timerSet = true;
    }

    if (pomodoroCount > shortBreakCount && !timerSet) {
      timer = 5 * 60;
      this.setState({
        shortBreakCount: shortBreakCount + 1,
      });
      timerSet = true;
    }

    if (!timerSet) {
      timer = 25 * 60;
      this.setState({
        pomodoroCount: pomodoroCount + 1,
      });
    }

    this.setState({
      timer: timer,
      timerRunning: true,
      timerDone: false,
    });

    const interval = setInterval(this._tick, 1000);
    if (this.state.timerDone) {
      clearInterval(interval);
    }
  };

  private _tick = (): void => {
    const { timer, timerRunning } = this.state;
    if (timerRunning && timer > 0) {
      this.setState({
        timer: timer - 1,
      });
    } else if (timerRunning && timer === 0) {
      this._getAction();
      this.setState({
        timerRunning: false,
        timerDone: true,
      });
    }
  };

  private _pause = (): void => {
    this.setState({
      timerRunning: false,
      timerPaused: true,
    });
  };

  private _continue = (): void => {
    this.setState({
      timerRunning: true,
      timerPaused: false,
    });
  };

  private _calculateTime = (timer: number): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer - minutes * 60;
    // format minutes and seconds so that they are always 2 digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  private _reset = (): void => {
    this.setState({
      timer: 0,
      pomodoroCount: 0,
      shortBreakCount: 0,
      longBreakCount: 0,
      timerRunning: false,
      timerDone: false,
      timerPaused: false,
      completeCycles: 0,
      nextAction: TimerAction.Pomodoro,
    });
  };

  private _getAction = (): void => {
    const { pomodoroCount, shortBreakCount, longBreakCount } = this.state;
    let nextAction = TimerAction.Pomodoro;
    if (pomodoroCount === 4 && shortBreakCount === 3 && longBreakCount === 0) {
      nextAction = TimerAction.LongBreak;
    } else if (pomodoroCount > shortBreakCount) {
      nextAction = TimerAction.ShortBreak;
    }
    this.setState({
      nextAction: nextAction,
    });
  };

  public render(): React.ReactElement<IPomPomProps> {
    const { description, isDarkTheme, hasTeamsContext, userDisplayName } =
      this.props;

    return (
      <section
        className={`${styles.pomPom} ${hasTeamsContext ? styles.teams : ""} ${
          isDarkTheme ? styles.dark : ""
        }`}
      >
        <div className={styles.pomodoro}>
          <h1>{description} Timer</h1>
          <h3>Hello {userDisplayName}!</h3>
          <p>Ready for a productive day?</p>
          <div className={styles.timer}>
            <span>{this._calculateTime(this.state.timer)}</span>
          </div>
          <div className={styles.buttons}>
            {!this.state.timerRunning && !this.state.timerPaused && (
              <PrimaryButton onClick={this._pomodoro}>
                Start {this.state.nextAction}
              </PrimaryButton>
            )}
            {this.state.timerRunning && !this.state.timerPaused && (
              <>
                <PrimaryButton onClick={this._pause}>Pause</PrimaryButton>
              </>
            )}

            {!this.state.timerRunning && this.state.timerPaused && (
              <>
                <PrimaryButton onClick={this._continue}>Continue</PrimaryButton>
              </>
            )}
          </div>
        </div>
        <div className={styles.statistics}>
          <div className={styles.mb1}>
            <p>Pomodoros</p>
            <div className={styles.circles}>
              {this.state.pomodoroCount === 0 && (
                <svg height="20" width="20">
                  <circle cx="10" cy="10" r="10" fill="gray" />
                </svg>
              )}
              {[...Array(this.state.pomodoroCount)].map((e, i) => {
                return (
                  <svg key={i} height="20" width="20">
                    <circle cx="10" cy="10" r="10" fill="red" />
                  </svg>
                );
              })}
            </div>
          </div>
          <div className={styles.mb1}>
            <p>Complete Cycles</p>
            <div className={styles.circles}>
              {this.state.completeCycles === 0 && (
                <svg height="20" width="20">
                  <circle cx="10" cy="10" r="10" fill="gray" />
                </svg>
              )}
              {this.state.completeCycles < 5 &&
                [...Array(this.state.completeCycles)].map((e, i) => {
                  return (
                    <svg key={i} height="20" width="20">
                      <circle cx="10" cy="10" r="10" fill="blue" />
                    </svg>
                  );
                })}
              {this.state.completeCycles >= 5 && (
                <div className={styles.multicycle}>
                  <span className={styles.countText}>
                    {this.state.completeCycles}
                  </span>
                  <svg height="20" width="20">
                    <circle cx="10" cy="10" r="10" fill="blue" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <DefaultButton onClick={this._reset}>Reset</DefaultButton>
        </div>
      </section>
    );
  }
}
