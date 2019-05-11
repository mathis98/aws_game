import * as React from 'react';
const css = require('./Hello.css');

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <div className={css.component}>
        <div className={css.header_wrapper}>
        <h1 className={css.text}>
          🦅 AWS Bootcamp 🦅
        </h1>
        </div>
        <div className={css.button_group}>
          <button className={css.instruction_button}>Anleitung</button>
          <button className={css.start_button}>Neues Spiel starten</button>
          <button className={css.level_button}>Level wählen</button>
        </div>
      </div>
    );
  }
}
