import React from "react";
import PT from "prop-types";
import { DangerButton } from "components/buttons";
import Modal from "components/Modal";

import styles from "./styles.scss";

class ErrorMessage extends React.Component {
  componentDidMount() {
    document.body.classList.add("scrolling-disabled-by-modal");
  }

  componentWillUnmount() {
    document.body.classList.remove("scrolling-disabled-by-modal");
  }

  render() {
    const { title, details, onOk } = this.props;

    return (
      <Modal theme={{ container: styles.container }}>
        <p styleName="title">{title}</p>
        <p styleName="details">{details}</p>
        <p styleName="details">
          We are sorry that you have encountered this problem. Please, contact
          our support &zwnj;
          <a href="mailto:support@topcoder.com">support@topcoder.com</a>
          &zwnj; to help us resolve it as soon as possible.
        </p>
        <DangerButton
          onClick={(e) => {
            e.preventDefault();
            onOk();
          }}
        >
          OK
        </DangerButton>
      </Modal>
    );
  }
}

ErrorMessage.defaultProps = {
  details: "",
};

ErrorMessage.propTypes = {
  title: PT.string.isRequired,
  details: PT.string,
  onOk: PT.func.isRequired,
};

export default ErrorMessage;
