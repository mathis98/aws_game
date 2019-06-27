import PageWrapper from "components/PageWrapper";
import * as React from "react";
import { Typography } from "@material-ui/core";

export const CreditsPage = (props: any) => {
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const members = ["Paul Seidemann", "Conrad Klaus", "Mark Bauknecht ", "Mathis Arend", "Leon Wiemers", "Jan Beckschewe", "Dominic Schialer"];
  shuffleArray(members);


  return <PageWrapper>
    <Typography variant="h4">
      <div>Projekt von</div>
    </Typography>
    <Typography variant="body1">
      {
        members.map(item => <span key={item}>{item}<br/></span>)
      }
    </Typography>

  </PageWrapper>;
};
