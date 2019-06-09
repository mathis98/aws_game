import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MarkdownViewer from 'components/MarkdownViewer';

export interface InstructionsPopupProps extends RouteComponentProps<any> {
  levelId?: number;
}

interface InstructionsPopupState {
  open?: boolean;
}

class InstructionsPopup extends React.Component<InstructionsPopupProps, InstructionsPopupState> {
  instructionsMd: string;

  constructor(props: InstructionsPopupProps) {
    super(props);
    this.state = {open: true};

    this.instructionsMd = require(`level_data/level_${this.props.levelId}/popup.md`).default;

    this.handleNext = this.handleNext.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    return (
      <Dialog open={this.state.open} maxWidth="md">
        <DialogContent>
          <MarkdownViewer source={this.instructionsMd} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="secondary">
            Abbruch
          </Button>
          <Button onClick={this.handleNext} color="primary" autoFocus>
            Weiter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleNext() {
    this.setState({open: false});
  }

  handleCancel() {
    this.props.history.push('/');
  }
}

export default withRouter(InstructionsPopup);
