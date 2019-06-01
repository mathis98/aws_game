import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

const css = require('./MarkdownViewer.css');

export interface MarkdownViewerProps {
  source: string
}

/**
 * renders the given markdown, supports html
 *
 * @param source markdown string
 * @returns div element conaining the rendered markdown
 */
export default class MarkdownViewer extends React.Component<MarkdownViewerProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {sourceString: this.props.source}
  }
  changeText = (s: any) => {
    this.setState({sourceString: s});
  }
  render() {
    return (
      <div className={css.markdownContainer}>
        <ReactMarkdown source={this.state.sourceString} escapeHtml={false} />
      </div>
    )
  }
}
