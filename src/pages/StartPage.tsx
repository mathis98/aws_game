import * as React from 'react';
import PageWrapper from 'components/PageWrapper';
import LinkButton from '../components/LinkButton';
import ResetPopup from '../components/ResetPopup';
import AWSProduct from '../components/dnd/AWSProduct';
import MarkdownViewer from '../components/MarkdownViewer';

import cx from 'classnames';

import { Button, Container, Typography, Collapse } from '@material-ui/core';
import { connect } from 'react-redux';
import { resetScore } from '../actions';
import {ScoreState} from '../reducers/score';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Typed from 'react-typed';
import { Close } from '@material-ui/icons';
import { throttle } from 'throttle-typescript';

const css = require('./StartPage.css');

export interface StartPageProps extends RouteComponentProps {
  level: number;
  score: any;
  dispatch: Function;
}

export interface StartPageState {
  resetOpen: boolean;
  desc: string;
  show: boolean;
}

const icons = [
  {icon: 's3', color: '#3F8624', text: require('level_data/services_desc/s3.md')},
  {icon: 'dynamodb', color: '#3B48CC', text: require('level_data/services_desc/dynamodb.md')},
  {icon: 'cognito', color: '#D6242D', text: require('level_data/services_desc/cognito.md')},
  {icon: 'ses', color: '#445EE0', text: require('level_data/services_desc/ses.md')},
  {icon: 'lambdaTensorflow', color: '#D86613', text: require('level_data/services_desc/lambdaTensorflow.md')},
  {icon: 'kinesis', color: '#7A48D6', text: require('level_data/services_desc/kinesis.md')},
  {icon: 'apiGateway', color: '#D5A449', text: require('level_data/services_desc/apiGateway.md')},
  {icon: 'shield', color: '#D6242D', text: require('level_data/services_desc/shield.md')},
  {icon: 'lakeFormation', color: '#693CC5', text: require('level_data/services_desc/lakeFormation.md')},
  {icon: 'sns', color: '#CC2264', text: require('level_data/services_desc/sns.md')},
  {icon: 'redshift', color: '#693CC5', text: require('level_data/services_desc/redshift.md')},
  {icon: 'forecast', color: '#1C7B68', text: require('level_data/services_desc/forecast.md')},
]

const strings = [
  'Das spannende AWS Spiel',
  'Ein Ort zum Lernen',
  'Spaß für Groß und Klein',
  'Meistern Sie Serverless',
  'Der Einstieg in AWS',
  '(╯°□°）╯︵ ┻━┻',
  '¯\\_(ツ)_/¯',
  'Serverless rocks!',
  'Awesome Web Site!',
  '01000001 01010111 01010011',
]

const random = (a: any, n: number) => a.sort(() => .5 - Math.random()).slice(0, n);

const randIcons = random(icons, 10);

class StartPage extends React.Component<StartPageProps, StartPageState> {
  resetPoints = () => {
    if(this.props.score.findIndex((e: any) => e.points > 0) != -1)
      this.setState({ resetOpen: true });
    else this.props.history.push('levels/1');
  }
  deleteScore = () => {
    this.props.dispatch(resetScore());
    this.props.history.push('levels/1');
  }
  changeDesc = (text: any) => {
    if(this.state.desc === text.default) {
      this.setState({ show: false });
      setTimeout(() => {
        this.setState({ desc: '' });
      },300);
    }
    else {
      this.setState({
        desc: text.default,
        show: true,
      });
    }
  }
  changeDescThrottle = throttle(this.changeDesc, 400);
  constructor(props: StartPageProps) {
    super(props);
    this.state = {
      resetOpen: false,
      desc: '',
      show: false,
    };
  }
  render() {
    return (
      <>
        <PageWrapper>
          <div className={css.content}>
            <Container maxWidth="md" className={css.title}>
              <Typography component="h1" variant="h2" color="textPrimary" align="center" className={css.titleName} gutterBottom>
                AWS Bootcamp
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                <Typed
                  strings={strings}
                  typeSpeed={60}
                  backSpeed={50}
                  backDelay={4000}
                  shuffle={true}
                  loop
                />
              </Typography>
            </Container>
            <ResetPopup open={this.state.resetOpen} onClose = {() => this.setState({resetOpen: false})} deleteScore = {() => this.deleteScore()}/>

            <Container maxWidth="md">
              <div className={css.icons_wrapper}>
                <div className={css.icons}>
                  {randIcons.map((icon: any) =>
                    <div
                      className={cx(css.icon, {[css.icon_active]: this.state.desc == icon.text.default})}
                      key={icon.icon}
                      onClick={() => this.changeDescThrottle(icon.text)}
                    >
                      <AWSProduct icon={icon.icon} noText color={icon.color}/>
                    </div>
                  )}
                </div>
                <Collapse in={this.state.show} timeout={300}>
                  <MarkdownViewer source={this.state.desc}/>
                </Collapse>
              </div>
            </Container>
          </div>
          <div className={css.button_group}>
            {this.props.level > 1 &&
            <LinkButton className={css.start_button} variant="outlined" size="large" color="secondary" to={`levels/${this.props.level}`}>
              Level {this.props.level} weiterspielen
            </LinkButton>}
            <Button className={css.start_button} variant="outlined" size="large" color="secondary" onClick={() => this.resetPoints()}>
              Neues Spiel starten
            </Button>
            <LinkButton className={css.start_button} variant="outlined" size="large" color="secondary" to="/levels">
              Level wählen
            </LinkButton>
          </div>
        </PageWrapper>
        <footer>
          <LinkButton to="/credits" size="medium">Credits</LinkButton>
        </footer>
      </>
    );
  }
}

const mapStateToProps = (state: {score: ScoreState}) => ({
  level: state.score.level,
  score: state.score.score
})

export default connect(mapStateToProps)(withRouter(StartPage));
