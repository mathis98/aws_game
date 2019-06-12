import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import GamePage from 'pages/GamePage';


export interface MatchParams {
  levelId: string;
}

class GamePageManager extends React.Component<RouteComponentProps<MatchParams>, {levelId: number}> {

  constructor(props: RouteComponentProps<MatchParams>) {
    super(props);
    const levelId = Number(this.props.match.params.levelId);
    this.state = {levelId};
  }

  render() {
    return (
      <GamePage levelId={this.state.levelId} key={`level${this.state.levelId}`} />
    )
  }

  componentWillReceiveProps(props: any) {
    this.setState({levelId: Number(props.match.params.levelId)});
  }
}

export default withRouter(GamePageManager);
