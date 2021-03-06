import _ from "lodash";
import { createActions } from "redux-actions";
import challengesService from "../services/challenges";
import service from "../services/profile";

/**
 * Gets member profile action.
 *
 *  @param {String} handle
 *
 *  @return {Promise} Resolves member profile object.
 */
async function getMemberProfile(handle) {
  return service.getMemberProfile(handle);
}

/**
 * Gets member statistics action.
 *
 *  @param {String} handle
 *
 *  @return {Promise} Resolves to the skills object.
 */
async function getStats(handle) {
  return service.getStats(handle);
}

/**
 * Gets member skills action.
 *
 * @param {String} handle
 *
 * @return {Promise} Resolves to the skills object.
 */
async function getSkills(handle) {
  return service.getSkills(handle);
}

/**
 * Gets member's external links.
 *
 * @param {String} handle
 *
 * @return {Promise} Resolves to the external links object.
 */
async function getExternalLinks(handle) {
  return service.getExternalLinks(handle);
}

/**
 * Gets member's external accounts.
 *
 * @param {String} handle
 *
 * @return {Promise} Resolves to the external accounts object.
 */
async function getExternalAccounts(handle) {
  return service.getExternalAccounts(handle);
}

/**
 * Gets member's active challenges
 *
 * @param {String} memberId
 *
 * @return {Promise} Resolves to active challenges object
 */
async function getActiveChallenges(memberId) {
  return challengesService.getMemberActiveChallenges(memberId);
}

/**
 * Gets member's stats history
 *
 * @param {String} memberId
 *
 * @return {Promise} Resolves to member stats history
 */
async function getStatsHistory(memberId) {
  return service.getStatsHistory(memberId);
}

/**
 * Gets member's stats distribution
 *
 * @param {String} track
 * @param {String} subTrack
 *
 * @return {Promise} Resolves to member stats distribution
 */
async function getStatsDistribution(track, subTrack) {
  return service.getStatsDistribution(track, subTrack);
}

export default createActions({
  GET_MEMBER_PROFILE: getMemberProfile,
  GET_STATS: getStats,
  GET_SKILLS: getSkills,
  GET_EXTERNAL_LINKS: getExternalLinks,
  GET_EXTERNAL_ACCOUNTS: getExternalAccounts,
  GET_ACTIVE_CHALLENGES: getActiveChallenges,
  GET_STATS_HISTORY: getStatsHistory,
  GET_STATS_DISTRIBUTION: getStatsDistribution,
  CLEAR_ERROR: _.noop,
});
