import React, { FC } from "react";
import "./index.css";

const Loading: FC<any> = function(props) {
  // const { size, style, ...rest } = props;

  return (
    <div className="spinner">
      <div className="box">
        <div className="cube" />
        <div className="cube" />
        <div className="cube" />
        <div className="cube" />
      </div>
    </div>
  );
};

export default Loading;
