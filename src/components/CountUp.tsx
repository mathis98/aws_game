import * as React from 'react';

export interface CountUpProps {
  value: number;
  ticks: number;
}

interface CountUpState {
  currentTick: number
}

export default class CountUp extends React.Component<CountUpProps, CountUpState> {
  interval: any;

  constructor(props: CountUpProps) {
    super(props);
    this.state = { currentTick: 0 };
  }

  sigmoid(x: number) {
    return 2 * (1 / (1 + Math.pow(Math.E, -5 * x)) - 0.5) / 0.9866142981514305;
  }

  render() {
    return Math.round(this.sigmoid(this.state.currentTick / this.props.ticks) * this.props.value);
  }

  tick() {
    const nextTick = this.state.currentTick + 1;
    if (nextTick > this.props.ticks) {
      clearInterval(this.interval);
      return;
    }

    this.setState({ currentTick: nextTick });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000 / 60);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
