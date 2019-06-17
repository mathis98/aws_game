import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
    this.handleBackToMainMenu = this.handleBackToMainMenu.bind(this);
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.handleNext} maxWidth="md">
        <DialogContent>
          <MarkdownViewer source={this.props.instructionsMd} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleBackToMainMenu} color="secondary">
            Zurück zum Hauptmenü
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

  handleBackToMainMenu() {
    this.props.history.push('/');
  }
}

export default withRouter(InstructionsPopup);
