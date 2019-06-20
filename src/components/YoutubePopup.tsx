import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Youtube from 'react-youtube';
import Tooltip from '@material-ui/core/Tooltip';
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

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
