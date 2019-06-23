import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Tooltip } from '@material-ui/core';
import Youtube from 'react-youtube';
import { Subscriptions as SubscriptionsIcon } from "@material-ui/icons";

const css = require("./YoutubePopup.css");

export interface InstructionsPopupProps {
  id: string;
}

interface YoutubePopupState {
  open?: boolean;
}

class YoutubePopup extends React.Component<InstructionsPopupProps, YoutubePopupState> {
  constructor(props: InstructionsPopupProps) {
    super(props);
    this.state = {open: false};
  }

  render() {
    return (
      <>
        <Tooltip title="Video hier ansehen">
          <a style={{cursor: "pointer"}} onClick={() => this.setState({open: true})}>
            Video
            <SubscriptionsIcon className={css.videoIcon} />
          </a>
        </Tooltip>
        <Dialog open={this.state.open} onClose={() => this.setState({open: false})} maxWidth="md">
          <DialogContent className={css.dialogContent}>
            <Youtube videoId={this.props.id} opts={{playerVars: {autoplay: 1}}} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({open: false})}>
              Zurück
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default YoutubePopup;
