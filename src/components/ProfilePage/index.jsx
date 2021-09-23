import React from "react";
import PT from "prop-types";
import ProfileHeader from "components/ProfileHeader";
import ProfileAbout from "components/ProfileAbout";

import "./styles.scss";

const ProfilePage = ({
  profile,
  skills,
  stats,
  countries,
  externalLinks,
  externalAccounts,
}) => {
  return (
    <div styleName="main">
      <div styleName="outer-container">
        <div styleName="profile-container" role="main">
          <div styleName="main-container">
            <ProfileHeader
              profile={profile}
              stats={stats}
              countries={countries}
            />
            <ProfileAbout
              skills={skills}
              stats={stats}
              profile={profile}
              externalLinks={externalLinks}
              externalAccounts={externalAccounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProfilePage.defaultProps = {
  profile: {},
  skills: {},
  stats: {},
  countries: [],
  externalLinks: [],
  externalAccounts: {},
};

ProfilePage.propTypes = {
  profile: PT.shape(),
  skills: PT.shape(),
  stats: PT.shape(),
  countries: PT.arrayOf(PT.shape()),
  externalLinks: PT.arrayOf(PT.shape()),
  externalAccounts: PT.shape(),
};

export default ProfilePage;
