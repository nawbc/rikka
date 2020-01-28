import React from "react";

export const Center = function(props: any) {
  const { width, height, style } = props;

  return (
    <div
      style={{
        ...style,
        position: "absolute",
        width: `${width}px`,
        height: `${height}px`,
        marginLeft: `-${width / 2}px`,
        marginTop: `-${height / 2}px`,
        top: props.top || "50%",
        left: "50%"
      }}
    >
      {props.children}
    </div>
  );
};
