import React from "react";

const gif = props => (
  <div className="gif-card">
    <img className="gif-img" src={props.source} />
  </div>
);

export default gif;
