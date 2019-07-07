import * as React from 'react';
import { Dialog, Slide, Container, Typography, Fade, Button } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import CountUp from 'components/CountUp';
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { getMembers } from 'pages/CreditsPage'
import { withRouter, RouteComponentProps } from 'react-router';
import { ScoreState, ScoreType } from 'src/reducers/score';
import { connect } from 'react-redux';

const css = require('./EndScreen.css');


const ranks = ["na ja :(", "Anfänger...", "mittelmäßig.", "Experte!", "crazy dude"];
const descs = ["Damit sind Sie ein", "Damit sind Sie"]

function getRank(points: number) {
  if (points <= 500) {
    return [descs[1], ranks[0]];
  } else if (points <= 650) {
    return [descs[0], ranks[1]];
  } else if (points <= 850) {
    return [descs[1], ranks[2]];
  } else if (points <= 950) {
    return [descs[0], ranks[3]];
  } else if (points == 1000) {
    return [descs[0], ranks[4]];
  }
}

interface EndScreenState {
  display: number
}

interface EndScreenProps extends RouteComponentProps {
  score: ScoreType[];
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EndScreen extends React.Component<EndScreenProps, EndScreenState> {
  interval: any;
  playerRankRef: any;
  member: string[];

  constructor(props: EndScreenProps) {
    super(props);
    this.state = { display: 0 };
    this.playerRankRef = React.createRef();

    this.member = getMembers();

    this.interval = setInterval(() => {
      this.setState({ display: this.state.display + 1 });
    }, 100);
  }

  render() {
    const totalPoints = this.props.score.reduce((acc, el) => acc + el.points, 0);


    if (this.state.display > 165) {
      clearInterval(this.interval);
    }
    return (
      <Dialog fullScreen open TransitionComponent={Transition}>
        <div className={css.background}>
          <Container maxWidth="md">
            <Fade in={this.state.display > 40} timeout={2000}>
              <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                Gratulation!
              </Typography>
            </Fade>
            <Fade in={this.state.display > 55} timeout={2000}>
              <Typography variant="h5" align="center" color="inherit" paragraph>
                Sie haben das AWS Boot Camp erfolgreich abgeschlossen. Insgesamt erzielten Sie
              </Typography>
            </Fade>
            <Fade in={this.state.display > 70} mountOnEnter timeout={2000}>
              <Typography component="h1" variant="h1" align="center" color="inherit" gutterBottom>
                <CountUp value={totalPoints} ticks={60 * 5} /> Punkte.
              </Typography>
            </Fade>
            <Fade in={this.state.display > 120} timeout={2000} style={{ marginTop: "1em" }}>
              <Typography variant="h5" align="center" color="inherit" paragraph>
                {getRank(totalPoints)[0]}
              </Typography>
            </Fade>
            <Fade in={this.state.display > 140} timeout={2000}>
              <Typography variant="h2" align="center" color="inherit" ref={this.playerRankRef} className={css.italic}>
                {getRank(totalPoints)[1]}
              </Typography>
            </Fade>
            <Fade in={this.state.display > 160} timeout={2000}>
              <div style={{ marginTop: "3em" }} className={css.credits}>
                <hr />
                <Typography variant="h5" align="center" color="inherit" paragraph gutterBottom>
                  AWS Boot Camp ist ein Spiel von
                </Typography>
                {this.member.map((name) =>
                  <Typography key={name} variant="body1" align="center" color="inherit" className={css.italic}>
                    {name}
                  </Typography>
                )}

              </div>
            </Fade>
            <Fade in={this.state.display > 165} timeout={2000}>
              <Button variant="text" className={css.backButton} onClick={() => this.props.history.push("/")}>
                <ArrowBackIcon className={css.backIcon} />
                Zum Startbildschirm
                </Button>
            </Fade>
          </Container>
        </div>
      </Dialog>
    )
  }

  componentDidMount() {
    let colorTime = 0;
    let waveTheta = 0;
    let element: any;

    function getTextShadow(x: any, y: any, hue: any) {
      return ',' + x + 'px ' + y + 'px hsl(' + hue + ',100%,50%)';
    };

    function animate() {
      let shadows = '0 0 transparent';

      // renders rainbow river
      for (let i = 1; i < 30; i++) {
        let normI = i / 30;
        let hue = (normI * 360 * 2 + colorTime) % 360;

        let x = ~~((Math.sin(normI * Math.PI * 2 + waveTheta) - Math.sin(waveTheta)) * 50) * 0.5;
        let y = i * 3;
        shadows += getTextShadow(x, y, hue);
      }

      element.style.textShadow = shadows;
      colorTime += -30;
      waveTheta += 0.1;
    };

    setTimeout(() => {
      element = this.playerRankRef.current;
      if (element) {
        setInterval(animate, 25);
      }
    }, 1000);

  }
}

const mapStateToProps = (state: { score: ScoreState }) => ({
  score: state.score.score,
});

export default connect(mapStateToProps)(withRouter(EndScreen));
