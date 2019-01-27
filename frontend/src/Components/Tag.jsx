import React from "react";
import styled from "styled-components";

const TagStyle = styled.a`
  display: inline-block;
  border-radius: 3px;
  border: 2px solid white;
  background: white;
  color: black;
`;

const Tag = ({ tag }) => {
  return (
    <div>
      <TagStyle>{tag}</TagStyle>
    </div>
  );
};

export default Tag;
