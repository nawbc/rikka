import React, { FC, useEffect } from "react";
import { notification } from "antd";
import { useNetWork } from "@/utils";

notification.config({
  duration: 2.5,
  top: 50
});

const CheckNetwork: FC<any> = function(props) {
  const network = useNetWork();

  useEffect(() => {
    if (network.isOnline) {
      if (network.effectiveType === "4g") {
        notification.open({
          message: "",
          description: "正在使用计费网络, 注意补魔"
        });
      }
    } else {
      notification.open({
        message: "",
        description: "网络 未与君产生共鸣"
      });
    }
  }, [network.isOnline]);

  return <>{network.isOnline ? props.children : null}</>;
};

export default CheckNetwork;
