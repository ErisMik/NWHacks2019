import React from "react";

export default ({ name, spoke, what, who }) => {
  return (
    <div style={container}>
      <div style={nameStyle}>
        <p>{name} -</p>
      </div>

      <div style={lineStyle}>
        <p>- {spoke}</p>
      </div>
      <div style={image}>
        {(what || what == "" )? (
          <img
            style={jira_icon}
            src="https://www.teamlead.ru/download/thumbnails/18514301/jira_icon.png?version=1&modificationDate=1301044830000&api=v2"
          />
        ) : null}
      </div>
    </div>
  );
};
const nameStyle = { color: "#22313f" };
const lineStyle = { maxwidth: 10, color: "grey", alignSelf: "flex-end" };
const lineStyleHighlighted = {
  maxwidth: 10,
  color: "grey",
  alignSelf: "flex-end",
  background: "yellow"
};
const container = { display: "flex", "justify-content": "center" };
const jira_icon = { width: "30px", height: "30px", display: "inline" };
const image = {};
