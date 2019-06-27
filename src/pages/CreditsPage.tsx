import PageWrapper from "components/PageWrapper";
import * as React from "react";
import { Typography } from "@material-ui/core";

export const CreditsPage = (props: any) => {
  const members = ["Paul Seidemann", "Conrad Klaus", "Mark Bauknecht ", "Mathis Arend", "Leon Wiemers", "Jan Beckschewe", "Dominic Schialer"];
  members.sort((a, b) => 0.5 - Math.random());

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
