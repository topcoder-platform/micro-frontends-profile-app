import _ from "lodash";
import moment from "moment";
import React from "react";
import PT from "prop-types";
import * as utils from "../../utils";

import "./styles.scss";

const UserInfo = ({ profile, stats, country }) => {
  const { handle, createdAt } = profile;
  const { wins } = stats || {};

  return (
    <div styleName="info">
      <h1
        styleName={`handle level-${utils.profile.getRatingLevel(
          _.get(profile, "maxRating.rating", 0)
        )}`}
      >
        {handle}
      </h1>
      <h3 styleName="location-challenges">
        {country}
        {Boolean(wins) && <span> | {wins} Wins</span>}
      </h3>
      <h3 styleName="tenure">
        Member Since {moment(createdAt).format("MMMM, YYYY")}
      </h3>
    </div>
  );
};

UserInfo.defaultProps = {
  profile: {},
  stats: {},
  country: "",
};

UserInfo.propTypes = {
  profile: PT.shape(),
  stats: PT.shape(),
  country: PT.string,
};

export default UserInfo;
