import React from "react";

export default ({ name, spoke, what, who }) => {
  let whatDiv;
  if (what) {
    whatDiv = (
      <div style={whatStyle}>
        <p>{what}</p>
      </div>
    );
  }
  let whoDiv;
  if (who) {
    whoDiv = (
      <div style={whoStyle}>
        <p>{who}</p>
      </div>
    );
  }
  return (
    <div style={bigContainer}>
      <div style={lineContainer}>
        <div style={nameStyle}>
          <p>{name}</p>
        </div>

        <div style={lineStyle}>
          <p>{spoke}</p>
        </div>

        {/* <pre>spoke</pre> */}
      </div>

      <div style={actionContainer}>
        <div style={whatStyle}>{whatDiv}</div>
        <div style={whoStyle}>{whoDiv}</div>
      </div>
    </div>
  );
};
const nameStyle = { color: "pink" };
const lineStyle = { maxwidth: 10, color: "grey", "align-self": "flex-end" };
const lineContainer = { display: "flex" };
const actionContainer = { display: "flex" };
const bigContainer = { display: "flex", flexDirection: "column" };
const whatStyle = { color: "black" };
const whoStyle = { color: "black" };
