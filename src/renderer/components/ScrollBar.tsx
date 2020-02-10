import { Scrollbars } from 'react-custom-scrollbars';
import React, { Component } from 'react';

const Thumb = ({ style, ...props }: any) => {
  return <div style={{ ...style, backgroundColor: '#00000040', zIndex: 10000 }} {...props} />;
};

class ScrollBar extends Component<any> {
  public render() {
    return (
      <Scrollbars
        {...this.props}
        autoHide
        renderThumbHorizontal={Thumb}
        renderThumbVertical={Thumb}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default ScrollBar;
