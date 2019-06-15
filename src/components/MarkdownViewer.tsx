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
export default class MarkdownViewer extends React.Component<MarkdownViewerProps, {}> {
  render() {
    return (
      <div className={css.markdownContainer}>
        <ReactMarkdown source={this.props.source} escapeHtml={false} linkTarget={"_blank"} />
      </div>
    )
  }
}
