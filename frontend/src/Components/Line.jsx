import React from "react";

export default ({ name, spoke, what, who }) => {
  return(
  <div>
    <div style={container}>
      <div style={nameStyle}>
        <p>{name}</p>
      </div>

      <div style={lineStyle}>
        <p>{spoke}</p>
        {what ? <img style={jira_icon} src="https://www.teamlead.ru/download/thumbnails/18514301/jira_icon.png?version=1&modificationDate=1301044830000&api=v2"/> : null}
      </div>
  </div>
)
};
const nameStyle = { color: "#1e8bc3" };
const lineStyle = { maxwidth: 10, color: "grey", "alignSelf": "flex-end" };
const lineStyleHighlighted = { maxwidth: 10, color: "grey", "alignSelf": "flex-end", "background": "yellow" };
const container = { display: "flex" };
const jira_icon = { width: "30px", height: "30px", display: "inline"};
