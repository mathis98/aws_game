import * as React from 'react';
import { Link } from 'react-router-dom';

import Button, { ButtonProps } from '@material-ui/core/Button';

export interface LinkButtonProps extends ButtonProps {
  to: string;
  replace?: boolean;
}

export default class LinkButton extends React.Component<LinkButtonProps, any> {
  render() {
    return (
      <Button {...this.props} component={Link as any} />
    )
  }
}
