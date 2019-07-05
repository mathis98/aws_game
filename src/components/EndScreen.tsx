import * as React from 'react';
import { Dialog, Slide, Container, Typography, Fade } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import CountUp from 'components/CountUp';

const css = require('./EndScreen.css');

const strings = ["na ja :(", "Anfänger...", "mittelmäßig.", "Experte!", "crazy dude"];

interface EndScreenState {
  open?: boolean
  display: number
}

interface EndScreenProps {
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class EndScreen extends React.Component<EndScreenProps, EndScreenState> {
  interval: any;

  constructor(props: EndScreenProps) {
    super(props);
    this.state = {open: true, display: 0};
    this.interval = setInterval(() => {
      this.setState({display: this.state.display + 1});
    }, 100);
  }

  render() {
    if (this.state.display > 160) {
      clearInterval(this.interval);
    }
    return (
      <Dialog fullScreen open={this.state.open} onClose={() => this.setState({ open: false })} TransitionComponent={Transition}>
        <div className={css.background}>
          <Container maxWidth="md">
            <Fade in={this.state.display > 40} timeout={2000}>
              <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                Gratulation!
              </Typography>
            </Fade>
            <Fade in={this.state.display > 55} timeout={2000}>
              <Typography variant="h5" align="center" color="inherit" paragraph>
                Sie haben das AWS Boot Camp erfolgreich abgeschlossen. Insgesamt erzielten sie
              </Typography>
            </Fade>
            <Fade in={this.state.display > 70} mountOnEnter timeout={2000}>
              <Typography component="h1" variant="h1" align="center" color="inherit" gutterBottom>
                <CountUp value={766} ticks={60*5} /> Punkte.
              </Typography>
            </Fade>
            <Fade in={this.state.display > 120} timeout={2000} style={{marginTop: "3em"}}>
              <Typography variant="h5" align="center" color="inherit" paragraph>
                Damit sind sie ein
              </Typography>
            </Fade>
            <Fade in={this.state.display > 140} timeout={2000}>
              <Typography variant="h3" align="center" color="inherit" gutterBottom>
                {strings[4]}
              </Typography>
            </Fade>
            <Fade in={this.state.display > 160} timeout={2000}>
              <div style={{ marginTop: "3em" }}>
                <hr />
                <Typography variant="h5" align="center" color="inherit" paragraph>
                  AWS Boot Camp ist ein Spiel von
                </Typography>
              </div>
            </Fade>
          </Container>
        </div>
      </Dialog>
    )
  }

  componentDidMount() {
    // var colorTime = 0,
    //   waveTheta = 0,
    //   maxCount = 30,
    //   colorIncrement = -30,
    //   waveIncrement = 0.1,
    //   xPos = [-2, -1, 0, 1, 2],
    //   yPos = [-2, -1, 0, 1, 2],
    //   props = {};

    // var getTextShadow = function (x: any, y: any, hue: any) {
    //   return ', ' + x + 'px ' + y + 'px hsl(' + hue + ', 100%, 50%)';
    // };

    // var animate = function () {
    //   var shadows = '0 0 transparent',
    //     hue0 = colorTime % 360,
    //     i, j, x, y,
    //     iLen = xPos.length,
    //     jLen = yPos.length;

    //   // outline
    //   for (i = 0; i < iLen; i++) {
    //     x = xPos[i];
    //     for (j = 0; j < jLen; j++) {
    //       y = yPos[j];
    //       shadows += getTextShadow(x, y, hue0);
    //     }
    //   }

    //   // renders rainbow river
    //   for (i = 1; i < maxCount; i++) {
    //     var normI = i / maxCount,
    //       hue = (normI * 360 * 2 + colorTime) % 360;
    //     x = ~~((Math.sin(normI * Math.PI * 2 + waveTheta) - Math.sin(waveTheta)) * 50) * 0.5;
    //     y = i * 3;
    //     shadows += getTextShadow(x, y, hue);
    //   }

    //   props.groovy.style.textShadow = shadows;
    //   colorTime += colorIncrement;
    //   waveTheta += waveIncrement;
    //   setTimeout(animate, 30);
    // };

    // var init = function () {

    //   props.groovy = document.getElementById('groovy');

    //   setTimeout(animate, 1);

    // };
  }
}
