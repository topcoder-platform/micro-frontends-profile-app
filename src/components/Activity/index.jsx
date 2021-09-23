import React from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import * as utils from "../../utils";
import { TRACK_NAMES } from "../../constants";

import CopilotIcon from "assets/icons/ico-track-copilot.svg";
import DataScienceIcon from "assets/icons/ico-track-data.svg";
import DesignIcon from "assets/icons/ico-track-design.svg";
import DevelopIcon from "assets/icons/ico-track-develop.svg";
import ArrowNext from "assets/icons/arrow-next.svg";

import "./styles.scss";
import _ from "lodash";

const Activity = ({ stats, handle }) => {
  const viewBox = "0 0 32 32";
  const activeTracks = utils.profile.getActiveTracks(stats);

  return !_.isEmpty(stats) ? (
    <div id="profile-activity">
      <div styleName="categories">
        {activeTracks.map((track) => (
          <div id={track.name} key={track.name} styleName="track">
            <div styleName="name">
              {track.name === "COPILOT" && <CopilotIcon viewBox={viewBox} />}
              {track.name === "DATA_SCIENCE" && (
                <DataScienceIcon viewBox={viewBox} />
              )}
              {track.name === "DESIGN" && <DesignIcon viewBox={viewBox} />}
              {track.name === "DEVELOP" && <DevelopIcon viewBox={viewBox} />}
              <span>
                {TRACK_NAMES[track.name]} {"ACTIVITY"}
              </span>
            </div>
            {track.subTracks.map((subtrack, index) => (
              <Link
                to={`/members/${handle}/details/?track=${
                  track.name
                }&subTrack=${subtrack.name.replace(" ", "_")}`}
                key={subtrack.name}
                styleName={`subtrack ${index === 0 ? "first" : ""}`}
              >
                <div styleName="name">
                  {subtrack.name
                    .replace("FIRST_2_FINISH", "FIRST2FINISH")
                    .replace(/_/g, " ")}
                </div>
                {subtrack.rank && !_.isUndefined(subtrack.rank.rating) && (
                  <div styleName="ranking">
                    <div
                      style={{
                        color: utils.profile.getRatingColor(
                          subtrack.rank.rating
                        ),
                      }}
                      styleName="number"
                    >
                      {subtrack.rank.rating}
                    </div>
                    <div styleName="tag">Rating</div>
                  </div>
                )}
                {(!subtrack.rank || _.isUndefined(subtrack.rank.rating)) &&
                  !subtrack.fulfillment && (
                    <div styleName="ranking">
                      <div style={{ color: "#21b2f1" }} styleName="number">
                        {subtrack.wins ? subtrack.wins : 0}
                      </div>
                      <div styleName="tag">Wins</div>
                    </div>
                  )}
                {subtrack.fulfillment && (
                  <div styleName="ranking">
                    <div style={{ color: "#a3a3ae" }} styleName="number">
                      {`${subtrack.fulfillment}%`}
                    </div>
                    <div styleName="tag">Fulfillment</div>
                  </div>
                )}
                <ArrowNext styleName="arrow" viewBox="0 0 12 19" />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

Activity.defaultProps = {
  stats: {},
  handle: "",
};

Activity.propTypes = {
  stats: PT.shape(),
  handle: PT.string,
};

export default Activity;
