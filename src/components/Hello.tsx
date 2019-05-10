import * as React from 'react';
const css = require('./Hello.css');

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div className={css.component}>
                <h1 className={css.text}>
                    Hello from {this.props.compiler} and {this.props.framework}.
                </h1>
            </div>
        );
    }
}
