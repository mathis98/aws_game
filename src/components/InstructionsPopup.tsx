import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import MarkdownViewer from 'components/MarkdownViewer';

export interface InstructionsPopupProps extends RouteComponentProps<any> {
  instructionsMd: string;
}

interface InstructionsPopupState {
  open?: boolean;
}

class InstructionsPopup extends React.Component<InstructionsPopupProps, InstructionsPopupState> {
  constructor(props: InstructionsPopupProps) {
    super(props);
    this.state = {open: true};

    this.handleNext = this.handleNext.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    return (
      <Dialog open={this.state.open} maxWidth="md">
        <DialogContent>
          <MarkdownViewer source={this.props.instructionsMd} />
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
