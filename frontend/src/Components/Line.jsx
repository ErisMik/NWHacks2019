import React from "react";

export default ({ name, spoke, what, who }) => {
  let whatDiv
  if(what){
    whatDiv = (
      <div style={whatStyle}>
        <p>{what}</p>
      </div>
    )
  }
  let whoDiv
  if(who){
    whoDiv = (
      <div style={whoStyle}>
        <p>{who}</p>
      </div>
    )
  }
  return(
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
    {whatDiv}
    {whoDiv}
  </div>
)
};
const nameStyle = { color: "pink" };
const lineStyle = { maxwidth: 10, color: "grey", "alignSelf": "flex-end" };
const container = { display: "flex" };
const whatStyle = { color: "black" };
const whoStyle = { color: "black" };
