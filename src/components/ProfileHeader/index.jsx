import React, { useEffect, useState } from "react";
import PT from "prop-types";
import Sticky from "react-stickynode";
import * as utils from "../../utils";
import { MOBILE_MAX_WIDTH, STICKY_TOP_OFFSET } from "../../constants";

import Avatar from "components/Avatar";
import UserInfo from "components/UserInfo";
import UserTracks from "components/UserTracks";
import UserDescription from "components/UserDescription";

import "./styles.scss";
import ForumLink from "../ForumLink";

const ProfileHeader = ({ profile, stats, countries }) => {
  const [isMobile, setIsMobile] = useState(false);
  const country = utils.profile.getCountry(countries, profile);
  const { description, userId } = profile;

  useEffect(() => {
    function handleResize() {
      setIsMobile({ isMobile: window.innerWidth < MOBILE_MAX_WIDTH });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div styleName="profile-header-container">
      <Sticky
        bottomBoundary={document.body.scrollHeight}
        enabled={!isMobile}
        top={STICKY_TOP_OFFSET}
      >
        <div styleName="sticky-container">
          <div styleName="container">
            <Avatar photoURL={profile.photoURL} />
            <UserInfo profile={profile} stats={stats} country={country} />
            <UserTracks profile={profile} stats={stats} />
            <UserDescription description={description} />
            <ForumLink userId={userId} />
          </div>
        </div>
      </Sticky>
    </div>
  );
};

ProfileHeader.defaultProps = {
  profile: {},
  stats: {},
  countries: [],
};

ProfileHeader.propTypes = {
  profile: PT.shape(),
  stats: PT.shape(),
  countries: PT.arrayOf(PT.shape()),
};

export default ProfileHeader;
