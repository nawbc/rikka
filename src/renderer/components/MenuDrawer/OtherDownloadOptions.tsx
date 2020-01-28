import React, { FC, useState } from "react";
import { Row, Col, Slider, Modal, Button } from "antd";
import { localStore } from "@/utils";

interface OtherDownloadOptions {
  onOpen: (e?: any) => void;
  visible: boolean;
  onClose: (e?: any) => void;
}

export const OtherDownloadOptions: FC<OtherDownloadOptions> = function(props) {
  const tCount = localStore.get("setting.threadCount");
  const pCount = localStore.get("setting.parallelCount");
  const [threadCount, setThreadCount] = useState(tCount);
  const [downCount, setDownCount] = useState(pCount);
  const { onOpen, visible, onClose } = props;

  return (
    <>
      <div
        onClick={onOpen}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        其他
      </div>
      <Modal
        title="其他设置"
        visible={visible}
        destroyOnClose
        onCancel={onClose}
        closable={false}
        footer={[
          <Button type="link" key="btn10" onClick={onClose}>
            Death
          </Button>,
          <Button type="link" key="btn11" onClick={onClose}>
            确定
          </Button>
        ]}
      >
        <div>
          <Row align="middle" type="flex" gutter={[0, 20]}>
            <Col span={6}>
              <span>线程数</span>
            </Col>
            <Col span={16}>
              <Slider
                min={1}
                max={10}
                onChange={value => {
                  setThreadCount(value as number);
                  localStore.set("setting.threadCount", value);
                }}
                value={parseInt(threadCount as string)}
              />
            </Col>
            <Col
              span={2}
              style={{
                textAlign: "center"
              }}
            >
              <span>{threadCount}</span>
            </Col>
          </Row>
          <Row align="middle" type="flex" gutter={[0, 20]}>
            <Col span={6}>
              <span>同时下载</span>
            </Col>
            <Col span={16}>
              <Slider
                min={1}
                max={3}
                onChange={value => {
                  setDownCount(value as number);
                  localStore.set("setting.parallelCount", value);
                }}
                value={parseInt(downCount as string)}
              />
            </Col>
            <Col
              span={2}
              style={{
                textAlign: "center"
              }}
            >
              <span>{downCount}</span>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
