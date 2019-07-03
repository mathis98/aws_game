import * as React from "react";
import { Button, Card, CardContent, Container, Grid, Link, Typography } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { withRouter } from "react-router";
import sources from "../../assets/img/sources";

const css = require("./CreditsPage.css");

export const CreditsPage = withRouter((props: any) => {
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const members = ["Paul Seidemann", "Conrad Klaus", "Mark Bauknecht ", "Mathis Arend", "Leon Wiemers", "Jan Beckschewe", "Dominic Schialer"];

  console.log("so", sources);
  shuffleArray(members);

  return <>
    <Container maxWidth="md" className={css.creditsTitle}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Credits
      </Typography>
    </Container>

    <div className={css.creditsWrapper}>
      <Container maxWidth="xs" className={css.card}>
        <Grid container spacing={5}>
          <Container maxWidth="xs" className={css.card}>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h4">
                    Ein Projekt von
                  </Typography>
                  <Typography variant="body1">
                    {
                      members.map(item => <span key={item}>{item}<br/></span>)
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>

          <Container maxWidth="xs" className={css.card}>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h4">
                    Icons von
                  </Typography>
                  <Typography variant="body1">
                    {
                      sources.map((item: any) =>
                        <span key={item.name}>
                  <Link href={item.url} target="_blank" rel="noopener">
                    <img className={css.iconCreditsImage}
                         src={require(`../../assets/img/${item.name}.svg`)}/>{item.creator}
                  </Link>
                  <br/>
                </span>)
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </div>

    <Container maxWidth="md">
      <Button variant="outlined" color="primary" className={css.backButton} onClick={() => props.history.push("/")}>
        <ArrowBackIcon className={css.backIcon}/>
        Zurück
      </Button>
    </Container>
  </>;
});
