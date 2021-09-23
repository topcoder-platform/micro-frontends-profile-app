import React from "react";
import PT from "prop-types";

import "./styles.scss";

const NotFoundPage = () => {
  return (
    <div styleName="not-found">
      <p styleName="message">404 HTTP Error</p>
      <p styleName="details">
        The resource you are looking for does not exist in Topcoder community
        App :(
      </p>
    </div>
  );
};

export default NotFoundPage;
