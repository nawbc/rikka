import * as React from "react";
import { createPortal } from "react-dom";
import { ScrollBar } from "..";

export class CollectionList extends React.Component<any, any> {
  collectionList: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.collectionList = document.createElement("div") as HTMLDivElement;
  }

  componentDidMount() {
    this.insertList();
  }

  componentDidUpdate() {
    this.insertList();
  }

  private insertList = () => {
    const wrapper = document.getElementById("player") as HTMLDivElement;
    setTimeout(() => {
      wrapper.appendChild(this.collectionList);
    }, 500);
  };

  render() {
    const { display, children, close } = this.props;
    return createPortal(
      <>
        {display ? (
          <div
            className="collection-mask"
            onClick={() => {
              close();
            }}
          />
        ) : null}
        <div className={`collection-list ${display ? "show" : "hide"}`}>
          <ScrollBar
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            {children}
          </ScrollBar>
        </div>
      </>,
      this.collectionList
    );
  }
}
