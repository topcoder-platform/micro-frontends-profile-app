import _ from "lodash";
import React from "react";
import PT from "prop-types";
import * as utils from "../../utils";
import { dataMap } from "../../constants";

import EmptyProfile from "components/EmptyProfile";
import Skills from "components/Skills";
import Activity from "components/Activity";
import LinkedAccounts from "components/LinkedAccounts";

import "./styles.scss";

const ProfileAbout = ({
  skills,
  stats,
  profile,
  externalAccounts,
  externalLinks,
}) => {
  let externals = externalAccounts
    ? _.map(
        _.pick(externalAccounts, _.map(dataMap, "provider")),
        (data, type) => ({ type, data })
      )
    : [];
  if (externalLinks) {
    externalLinks.map((data) => externals.push({ type: "weblink", data }));
    externals = _.filter(externals, "data");
    externals = _.sortBy(externals, "type");
  }

  const activeTracks = utils.profile.getActiveTracks(stats);

  return (
    <div styleName="profile-about-container">
      {_.isEmpty(skills) && _.isEmpty(activeTracks) && _.isEmpty(externals) && (
        <EmptyProfile />
      )}
      {!_.isEmpty(skills) && (
        <div id="profile-skills">
          <div styleName="skills">
            <h3 styleName="activity">Skills</h3>
          </div>
          <Skills skills={skills} />
          {!_.isEmpty(stats) && (
            <Activity stats={stats} handle={profile.handle} />
          )}
        </div>
      )}
      {!_.isEmpty(externals) && <LinkedAccounts externals={externals} />}
    </div>
  );
};

ProfileAbout.defaultProps = {
  skills: {},
  stats: {},
  profile: {},
  externalLinks: [],
  externalAccounts: {},
};

ProfileAbout.propTypes = {
  skills: PT.shape(),
  stats: PT.shape(),
  profile: PT.shape(),
  externalLinks: PT.arrayOf(PT.shape()),
  externalAccounts: PT.shape(),
};

export default ProfileAbout;
