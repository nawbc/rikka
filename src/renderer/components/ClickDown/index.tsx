import React, { FC } from "react";
import "./index.css";

const ClickDown: FC<any> = function(props) {
  const { children, ...rest } = props;

  return (
    <div className="button-down" {...rest}>
      {children}
    </div>
  );
};

export default ClickDown;
