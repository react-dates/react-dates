import React, { Component } from "react";
import aphroditeInterface from "react-with-styles-interface-aphrodite";

import registerInterfaceWithDefaultTheme from "../utils/registerInterfaceWithDefaultTheme";
registerInterfaceWithDefaultTheme(aphroditeInterface);

export default class Wrapper extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(0, 0, 0, 0.2) 1px, transparent 8px), repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(0, 0, 0, 0.2) 1px, transparent 8px)",
          backgroundSize: "8px 8px"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
