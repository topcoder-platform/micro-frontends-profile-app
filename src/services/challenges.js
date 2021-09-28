import qs from "qs";
import api from "./api";
import { CHALLENGE_STATUS } from "constants";

/**
 * Gets challenges
 *
 * @param {Object} filters filter object
 *
 * @returns {Promise<{challenges: ([]), totalCount: (number)}>}
 */
async function getChallenges(filters = {}) {
  const query = qs.stringify(filters);
  const url = `/challenges${query ? "?" : ""}${query}`;
  const response = await api.doFetch(url);
  return {
    challenges: (await api.handleApiResponse(response)) || [],
    totalCount: response.headers ? response.headers.get("x-total") : 0,
  };
}

/**
 * Gets member's challenges
 *
 * @param {String} memberId memberId
 * @param {Object} filters filter object
 *
 * @return {Promise} Resolves to the challenges list.
 */
async function getMemberActiveChallenges(memberId, filters = {}) {
  return getChallenges({
    ...filters,
    memberId,
    status: CHALLENGE_STATUS.ACTIVE,
  });
}

export default {
  getMemberActiveChallenges,
  getChallenges,
};
