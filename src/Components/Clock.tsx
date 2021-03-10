import * as React from 'react';
import "../Styles/clock.css";

export interface IClockProps {
}

interface IClockState {
  time: string;
  date: string;
}

export default class App extends React.Component<IClockProps, IClockState> {
  constructor(props: IClockProps) {
    super(props);
    this.state = {
      time: this.buildTime(),
      date: new Date().toDateString()
    };
  }

  private buildTime(): string {
    const date: Date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const amPm = date.getHours() >= 12 ? "PM" : "AM";

    if (hours === 12 && amPm === "AM") {
      this.setState({
        time: this.buildTime(),
        date: new Date().toDateString()
      });
    }

    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // ToDo: make seconds optional
    return hours + ":" + minutes + " " + amPm;
  }

  private intervalID: NodeJS.Timeout = setInterval(
    () => this.tick(),
    1000
  );

  public componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  public tick() {
    this.setState({
      time: this.buildTime()
    });
  }

  public render() {
    return (
      <div className="clock">
        <span className="clock-date">{this.state.date}</span>
        {this.state.time}
      </div>
    );
  }
}
