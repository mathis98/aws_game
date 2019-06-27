import * as React from 'react';
import { Typography, Container, Grid, Card, CardContent, Button, ButtonBase, Badge } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { StarRounded as StarIcon } from '@material-ui/icons';
import {LEVELS, LEVEL_TITLES} from "levels/levels";
import GameBoard from 'components/GameBoard';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ScoreState, ScoreType } from 'src/reducers/score';
import { connect } from 'react-redux';
import cx from 'classnames';

const css = require("./LevelsPage.css");

export interface LevelsPageProps extends RouteComponentProps {
  score: ScoreType[];
}


class LevelsPage extends React.Component<LevelsPageProps, {}> {
  render() {
    return (
      <>
        <Container maxWidth="md" className={css.levelSelectionTitle}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Levelübersicht
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Springen Sie direkt zum Level Ihrer Wahl
          </Typography>
        </Container>

        <div className={css.levelItemWrapper}>
          <Container maxWidth="md" >
            <Grid container spacing={4}>
              {LEVELS.map((_, i) => (
                <Grid item key={`levelselectorcard${i}`} xs={12} sm={6} md={4}>
                  <Card>
                    <ButtonBase className={css.cardButtonWrapper} onClick={() => this.props.history.push(`/levels/${i+1}`)}>
                      <div className={css.gameboardContainer}>
                        <GameBoard level={LEVELS[i]} thumbnailMode />
                      </div>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {`Level ${i + 1}`}
                          {Boolean(this.props.score[i].points) && <div className={css.levelPoints}>{this.props.score[i].points} Pkt.</div>}
                        </Typography>
                        <Typography>
                          {LEVEL_TITLES[i]}
                        </Typography>
                        <div className={css.starContainer}>
                          <StarIcon className={cx(css.star, { [css.starFilled]: this.props.score[i].stars > 0 })} />
                          <StarIcon className={cx(css.star, { [css.starFilled]: this.props.score[i].stars > 1 })} />
                          <StarIcon className={cx(css.star, { [css.starFilled]: this.props.score[i].stars > 2 })} />
                        </div>
                      </CardContent>
                  </ButtonBase>
                  </Card>
              </Grid>))}
            </Grid>
          </Container>
        </div>

        <Container maxWidth="md" >
          <Button variant="outlined" color="primary" className={css.backButton} onClick={() => this.props.history.push("/")}>
            <ArrowBackIcon className={css.backIcon} />
            Zurück
          </Button>
        </Container>
      </>
    );
  }
}


const mapStateToProps = (state: { score: ScoreState }) => ({
  score: state.score.score,
})


export default connect(mapStateToProps)(withRouter(LevelsPage));
