import React from "react";
const nameStyle = { color: "pink" };

export default ({ name, spoke }) => (
  <div>
    <div style={nameStyle}>
      <p>{name}</p>
    </div>

    <p>{spoke}</p>
    {/* <pre>spoke</pre> */}
  </div>
);
