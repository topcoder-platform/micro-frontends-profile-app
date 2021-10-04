import _ from "lodash";
import React from "react";
import PT from "prop-types";

import "./styles.scss";

const UserDescription = ({ description }) => {
  return description ? <p styleName="description">{description}</p> : null;
};

UserDescription.defaultProps = {
  description: "",
};

UserDescription.propTypes = {
  description: PT.string,
};

export default UserDescription;
