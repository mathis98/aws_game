import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Tooltip from "@material-ui/core/Tooltip";
import YoutubePopup from './YoutubePopup';

const css = require('./MarkdownViewer.css');

export interface MarkdownViewerProps {
  source: string
}

/**
 * renders the given markdown, supports html
 *
 * @param source markdown string
 * @returns div element containing the rendered markdown
 */
export default class MarkdownViewer extends React.Component<MarkdownViewerProps, {}> {
  render() {
    return (
      <div className={css.markdownContainer}>
        <ReactMarkdown source={this.props.source} escapeHtml={false} renderers={{link: LinkRenderer}}/>
      </div>
    )
  }
}

function LinkRenderer(props: { href: string; children: React.ReactNode; }) {
  const ytregex = /.*?youtube\.com\/watch\?v=(.*)/;
  const match = ytregex.exec(props.href);
  if (match) {
    return <YoutubePopup id={match[1]} />
  }
  return (
    <div>
      <Tooltip title={props.href}>
        <a href={props.href} target="_blank">
          {props.children}
          <OpenInNewIcon className={css.materialIcons} />
        </a>
      </Tooltip>
    </div>
  )
}
