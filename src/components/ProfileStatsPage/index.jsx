import React from "react";
import PT from "prop-types";
import _ from "lodash";
import { Link } from "@reach/router";
import { getDetails, getSummary } from "utils/memberStats";
import { getRatingColor } from "utils/profile";
import LeftArrow from "assets/icons/arrow-prev.svg";

import SRMStats from "./SRMStats";

import styles from "./styles.scss";
import Avatar from "../Avatar";

const ProfileStatsPage = ({
  track,
  subTrack,
  tab: activeTab,
  profile,
  handle,
  activeChallengesCount,
  stats,
}) => {
  if (_.isArray(stats)) {
    // eslint-disable-next-line prefer-destructuring
    stats = stats[0];
  }

  const tabs = ["statistics"];

  const subTrackSummary = getSummary(stats, track, subTrack) || [];
  const subTrackDetails = getDetails(stats, track, subTrack) || [];
  const ratingObj = subTrackSummary.filter((k) => k.label === "rating");
  let subTrackRating = ratingObj && ratingObj[0] ? ratingObj[0].value : 0;
  if (subTrackRating === 0 || !subTrackRating) {
    // if subtrack has no rating, pick default rating
    subTrackRating = profile.maxRating ? profile.maxRating.rating : 0;
  }

  if (track === "DEVELOP") {
    const reliability = subTrackSummary.find(
      (stat) => stat.label === "reliability"
    );
    if (reliability) {
      reliability.link =
        "https://help.topcoder.com/hc/en-us/articles/219240797-Development-Reliability-Ratings- and-Bonuses";
    }
    const mustHaveMetrics = ["rank", "rating", "reliability"];
    // check if rating, rank & reliability are all set
    const filteredObjs = _.filter(
      subTrackSummary,
      (k) => _.indexOf(mustHaveMetrics, k.label) > -1
    );
    if (_.every(_.map(filteredObjs, "value"), (v) => !v)) {
      // all false filter em out
      _.remove(
        subTrackSummary,
        (k) => _.indexOf(mustHaveMetrics, k.label) > -1
      );
    }
  }

  return (
    <div styleName="profile-subtrack-container" role="main">
      <div styleName="content">
        <div styleName="page-state-header">
          <header>
            <div styleName="page-info">
              <Link to={`/profile/${handle}`}>
                <LeftArrow styleName="left-arrow" />
              </Link>
              &nbsp;
              <h1>
                {subTrack
                  .replace("FIRST_2_FINISH", "FIRST2FINISH")
                  .replace(/_/g, " ")}
              </h1>
            </div>
            <div styleName="info">
              <div styleName="item">
                <div styleName="value">{activeChallengesCount}</div>
                <div styleName="title">Active Challenges</div>
              </div>
            </div>
          </header>
        </div>
        <div>
          <ul styleName="tab-set">
            {tabs.map((tab) => (
              <li key={tab}>
                <Link
                  className={activeTab === tab ? styles.selected : ""}
                  to={`/profile/${handle}/details/?track=${track}&subTrack=${subTrack}&tab=${tab}`}
                >
                  {tab}
                </Link>
              </li>
            ))}
          </ul>
          <ul styleName="subtrack-stats">
            {subTrackSummary && (
              <li key={profile.handle}>
                <div>
                  <Avatar
                    photoURL={profile.photoURL}
                    styleName="profile-circle"
                  />
                </div>
                <div
                  styleName="valueHandle"
                  className={subTrackRating ? styles.rating : ""}
                  style={{
                    color: subTrackRating
                      ? getRatingColor(
                          parseInt(
                            subTrackRating.toString().replace(/\D/g, ""),
                            10
                          )
                        )
                      : undefined,
                  }}
                >
                  <a
                    href={`${window.origin}/profile/${profile.handle}`}
                    target={`${
                      _.includes(window.origin, "www") ? "_self" : "_blank"
                    }`}
                    rel="noopener noreferrer"
                  >
                    {profile.handle || "-"}
                  </a>
                </div>
              </li>
            )}
            {subTrackSummary.map(({ label, value, link }) => (
              <li key={label}>
                {link ? (
                  <a styleName="value" href={link}>
                    {value || "-"}
                  </a>
                ) : (
                  <div
                    styleName="value"
                    className={label === "rating" ? styles.rating : ""}
                    style={{
                      color:
                        label === "rating"
                          ? getRatingColor(
                              parseInt(value.replace(/\D/g, ""), 10)
                            )
                          : undefined,
                    }}
                  >
                    {value || "-"}
                    {label === "rating" && (
                      <span
                        styleName="square"
                        style={{
                          backgroundColor: getRatingColor(
                            parseInt(value.replace(/\D/g, ""), 10)
                          ),
                        }}
                      />
                    )}
                  </div>
                )}
                <p styleName="label">{label}</p>
              </li>
            ))}
          </ul>
          {activeTab === "statistics" && (
            <div className="tab-view">
              {track !== "COPILOT" && (
                <div styleName="details">
                  <h2>Details</h2>
                  {subTrack !== "SRM" ? (
                    <ul styleName="vertical-stats">
                      {subTrackDetails.map(({ label, value }) => (
                        <li key={label}>
                          <div>{label}</div>
                          <div styleName="right">{value || "-"}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <SRMStats subTrackDetails={subTrackDetails} />
                  )}
                </div>
              )}
            </div>
          )}
          {(activeTab === "challenges" || activeTab === "Past srm") && (
            <SubTrackChallengeView
              handle={handle}
              track={track}
              subTrack={subTrack}
              userId={profile.userId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ProfileStatsPage.defaultProps = {
  tab: "statistics",
  statsHistory: null,
  activeChallengesCount: null,
  profile: {},
  stats: {},
};

ProfileStatsPage.propTypes = {
  stats: PT.shape(),
  handle: PT.string.isRequired,
  track: PT.string.isRequired,
  subTrack: PT.string.isRequired,
  tab: PT.string,
  profile: PT.shape().isRequired,
  activeChallengesCount: PT.number,
};

export default ProfileStatsPage;
