import React from "react";
import styled from "styled-components";

const TagStyle = styled.a`
  margin-bottom: 2px;
  display: inline-block;
  border-radius: 3px;
  border: 2px solid #4292f4;
  background: #4292f4;
  color: white;
`;

const Tag = ({ tag }) => {
  return (
    <div>
      <TagStyle>{tag}</TagStyle>
    </div>
  );
};

export default Tag;
