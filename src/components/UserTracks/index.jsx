import _ from "lodash";
import React from "react";
import PT from "prop-types";
import * as utils from "../../utils";
import { TRACK_LABELS } from "../../constants";

import CopilotIcon from "assets/icons/ico-track-copilot.svg";
import DataScienceIcon from "assets/icons/ico-track-data.svg";
import DesignIcon from "assets/icons/ico-track-design.svg";
import DevelopIcon from "assets/icons/ico-track-develop.svg";

import "./styles.scss";

const UserTracks = ({ profile, stats }) => {
  const { tracks } = profile;
  const viewBox = "0 0 32 32";
  return tracks && tracks.length > 0 ? (
    <div styleName="tracks-links">
      <div styleName="tracks">
        {[
          ...tracks,
          ...(utils.profile.isCopilot(stats) ? ["COPILOT"] : []),
        ].map((track) => (
          <div key={track} styleName="track">
            {track === "COPILOT" && (
              <CopilotIcon styleName="track-icon" viewBox={viewBox} />
            )}
            {track === "DATA_SCIENCE" && (
              <DataScienceIcon styleName="track-icon" viewBox={viewBox} />
            )}
            {track === "DESIGN" && (
              <DesignIcon styleName="track-icon" viewBox={viewBox} />
            )}
            {track === "DEVELOP" && (
              <DevelopIcon styleName="track-icon" viewBox={viewBox} />
            )}
            <div styleName="text">{TRACK_LABELS[track]}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

UserTracks.defaultProps = {
  profile: {},
  stats: {},
};

UserTracks.propTypes = {
  profile: PT.shape(),
  stats: PT.shape(),
};

export default UserTracks;
