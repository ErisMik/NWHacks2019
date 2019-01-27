import React from "react";

export default ({ name, spoke, what, who }) => (
  <div>
    <div style={container}>
      <div style={nameStyle}>
        <p>{name}</p>
      </div>

      <div style={lineStyle}>
        <p>{spoke}</p>
      </div>

      {/* <pre>spoke</pre> */}
    </div>
    <div style={whatStyle}>
      <p>{what}</p>
    </div>

    <div style={whoStyle}>
      <p>{who}</p>
    </div>
  </div>
);
const nameStyle = { color: "pink" };
const lineStyle = { maxwidth: 10, color: "grey", "align-self": "flex-end" };
const container = { display: "flex" };
const whatStyle = { color: "black" };
const whoStyle = { color: "black" };
