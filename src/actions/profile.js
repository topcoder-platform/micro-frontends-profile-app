import _ from "lodash";
import { createActions } from "redux-actions";
import service from "../services/profile";
import challengesService, {
  getMemberActiveChallenges,
} from "../services/challenges";

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

export default createActions({
  GET_MEMBER_PROFILE: getMemberProfile,
  GET_STATS: getStats,
  GET_SKILLS: getSkills,
  GET_EXTERNAL_LINKS: getExternalLinks,
  GET_EXTERNAL_ACCOUNTS: getExternalAccounts,
  GET_ACTIVE_CHALLENGES: getActiveChallenges,
  CLEAR_ERROR: _.noop,
});
