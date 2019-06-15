import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import Icon from "@material-ui/core/Icon";

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
        <ReactMarkdown source={this.props.source} escapeHtml={false} renderers={{link: LinkRenderer}} />
      </div>
    )
  }
}

function LinkRenderer(props: { href: string; children: React.ReactNode; }) {
  return (
    <div>
      <a href={props.href} target="_blank" title={props.href}>
        {props.children}
        <Icon>open_in_new</Icon>
      </a>
    </div>
  )
}