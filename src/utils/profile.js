import _ from "lodash";
import { RATING_COLORS } from "../constants";

/**
 * Given user rating returns corresponding rating level (from 1 to 5, both
 * inclusive). The rating levels are used to group members into categories
 * by their performance, and to assign colors to their handles.
 *
 * @param {Number} rating
 *
 * @return {Number} Rating level.
 */
export function getRatingLevel(rating) {
  if (rating < 900) return 1;
  if (rating < 1200) return 2;
  if (rating < 1500) return 3;
  if (rating < 2200) return 4;
  return 5;
}

/**
 * Determine if the given user is a copilot
 *
 * @param {Object} stats
 *
 * @return {Boolean} is given user a copilot
 */
export function isCopilot(stats) {
  return _.has(stats, "COPILOT");
}

/**
 * Inspects a subtrack and determines if the member is active
 * based on submissions and/or ranks.
 *
 * @param {Object} subtrack Subtrack object
 * @return {Boolean}
 */
const isActiveSubtrack = (subtrack) => {
  if (subtrack.name === "COPILOT_POSTING") {
    return false;
  }
  if (subtrack.rank && subtrack.rank.rating > 0) {
    return true;
  }
  if (_.isNumber(subtrack.submissions)) {
    return subtrack.submissions > 0;
  }
  return subtrack.submissions && subtrack.submissions.submissions > 0;
};

/**
 * Get rating colors
 *
 * @param {Number} rating user rating
 *
 * @return {String} color
 */
export function getRatingColor(rating) {
  let i = 0;
  const r = Number(rating);
  while (RATING_COLORS[i].limit <= r) i += 1;
  return RATING_COLORS[i].color || "black";
}

/**
 * Determine if the given user is a copilot
 *
 * @param {Object} stats
 *
 * @return {Boolean} is given user a copilot
 */
export function getActiveTracks(stats) {
  const copilot = isCopilot(stats);
  if (_.isArray(stats)) {
    // eslint-disable-next-line prefer-destructuring
    stats = stats[0];
  }
  const activeTracks = [];

  if (copilot && stats && stats.COPILOT && stats.COPILOT.fulfillment) {
    activeTracks.push({
      name: "COPILOT",
      subTracks: [
        {
          fulfillment: stats.COPILOT.fulfillment,
          name: "COPILOT",
        },
      ],
    });
  }

  ["DEVELOP", "DESIGN", "DATA_SCIENCE"].forEach((track) => {
    const active = [];
    const subTracks = stats && stats[track] ? stats[track].subTracks || [] : [];

    if (stats && stats[track] && stats[track].SRM) {
      subTracks.push({ ...stats[track].SRM, name: "SRM" });
    }
    if (stats && stats[track] && stats[track].MARATHON_MATCH) {
      subTracks.push({
        ...stats[track].MARATHON_MATCH,
        name: "MARATHON MATCH",
      });
    }

    subTracks.forEach((subtrack) => {
      if (isActiveSubtrack(subtrack) && !isHidden(subtrack)) {
        active.push({ ...subtrack, active: true });
      }
    });
    if (active.length > 0) {
      const sorted = _.orderBy(
        active,
        [(s) => s.wins, (s) => (s.rank ? s.rank.rating : 0)],
        ["desc", "desc"]
      );
      activeTracks.push({ name: track, subTracks: sorted });
    }
  });

  return activeTracks;
}

/**
 * Get Country
 *
 * @param {Array} countries lookup countries
 * @param {Object} profile user profile
 *
 * @return {Boolean} is given user a copilot
 */
export function getCountry(countries, profile) {
  let country = "";
  if (countries.length > 0) {
    const countryCode = _.isEmpty(_.get(profile, "homeCountryCode"))
      ? _.get(profile, "competitionCountryCode")
      : _.get(profile, "homeCountryCode");

    const result = _.find(
      countries,
      (c) => countryCode && c.countryCode === countryCode.toUpperCase()
    );
    country = _.isEmpty(result) ? "" : result.country;
  }

  return country;
}

/**
 * Inspects a subtrack and determines if it should be hidden
 *
 * @param {Object} subtrack Subtrack object
 * @returns {Boolean}
 */
const isHidden = (subtrack) => {
  if (subtrack.name === "DEVELOP_MARATHON_MATCH") {
    return true;
  }

  return false;
};
