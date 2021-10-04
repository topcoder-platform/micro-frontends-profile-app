import _ from "lodash";
import React from "react";
import PT from "prop-types";
import { URL } from "../../../config";

import "./styles.scss";

const ForumLink = ({ userId }) => {
  return (
    <div styleName="links">
      <a
        href={`${URL.FORUMS}/?module=History&userID=${userId}`}
        styleName="link"
      >
        Forum Posts
      </a>
    </div>
  );
};

ForumLink.defaultProps = {
  userId: null,
};

ForumLink.propTypes = {
  userId: PT.number,
};

export default ForumLink;
