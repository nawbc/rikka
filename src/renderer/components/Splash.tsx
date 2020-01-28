import React from "react";
import { Transition } from "react-transition-group";
import { Center } from "@/plugins";
import { fullScreen } from "@/utils/css";

const transitionStyles: any = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

const logoTransitionStyles: any = {
  entering: { transform: "scale(1)", opacity: 1 },
  entered: { transform: "scale(1)", opacity: 1 },
  exiting: { transform: "scale(1.5)", opacity: 0 },
  exited: { transform: "scale(1.5)", opacity: 0 }
};

// const launcherCovers = [
//   require("../assets/launcher1.jpg"),
//   require("../assets/launcher2.jpg"),
//   require("../assets/launcher3.jpg"),
//   require("../assets/launcher4.jpg")
// ];

export default (props: any) => {
  return (
    <Transition in={props.inProp} timeout={props.duration}>
      {state => {
        return (
          <div>
            <Center width={180} height={180} top="30%" style={{ zIndex: 1000 }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${require("../assets/bilibili-fill.svg")})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  ...logoTransitionStyles[state],
                  transition: `transform ${props.duration}ms ease, opacity ${props.duration}ms ease-in-out`
                }}
              />
            </Center>
            <div
              className="splashCover"
              style={{
                ...transitionStyles[state],
                transition: `opacity ${props.duration}ms ease-in-out`,
                position: "absolute",
                ...fullScreen,
                backdropFilter: "saturate(180%) blur(10px)",
                backgroundColor: "#352f518a"
              }}
            />
            <div
              style={{
                ...fullScreen,
                position: "absolute",
                ...transitionStyles[state],
                transition: `opacity ${props.duration}ms ease-in-out`,
                // backgroundImage: `url(${
                //   launcherCovers[Math.round(Math.random() * 3)]
                // })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                zIndex: -1000
              }}
            />
          </div>
        );
      }}
    </Transition>
  );
};
