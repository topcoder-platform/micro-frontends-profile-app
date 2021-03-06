import _ from "lodash";
import React from "react";
import ReactDom from "react-dom";
import PT from "prop-types";
import { themr } from "react-css-super-themr";

import defaultStyle from "./styles.scss";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.portal = document.createElement("div");
  }

  componentDidMount() {
    document.body.classList.add("scrolling-disabled-by-modal");
    document.body.appendChild(this.portal);
  }

  componentWillUnmount() {
    document.body.classList.remove("scrolling-disabled-by-modal");
    document.body.removeChild(this.portal);
  }

  render() {
    const { children, onCancel, theme } = this.props;
    return ReactDom.createPortal(
      <React.Fragment>
        <div
          className={theme.container}
          onWheel={(event) => event.stopPropagation()}
        >
          {children}
        </div>
        <button
          onClick={() => onCancel()}
          className={theme.overlay}
          type="button"
        />
      </React.Fragment>,
      this.portal
    );
  }
}

Modal.defaultProps = {
  onCancel: _.noop,
  children: null,
  theme: {},
};

Modal.propTypes = {
  onCancel: PT.func,
  children: PT.node,
  theme: PT.shape(),
};

export default themr("Modal", defaultStyle)(Modal);
