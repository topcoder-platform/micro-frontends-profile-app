/* global process */
import api from "./api";

/**
 * Gets member profile.
 * @param {String} handle
 * @return {Promise} Resolves to the member profile object.
 */
async function getMemberProfile(handle) {
  const response = await api.doFetch(`/members/${handle}`);
  return api.handleApiResponse(response);
}

/**
 * Gets member skills.
 * @param {String} handle
 * @return {Promise} Resolves to the skills object.
 */
async function getSkills(handle) {
  const response = await api.doFetch(`/members/${handle}/skills`);
  return api.handleApiResponse(response);
}

/**
 * Gets member statistics.
 *
 * @param {String} handle
 *
 * @return {Promise} Resolves to the stats object.
 */
async function getStats(handle) {
  const response = await api.doFetch(`/members/${handle}/stats`);
  return api.handleApiResponse(response);
}

/**
 * Gets member's external links.
 *
 * @param {String} handle
 *
 * @return {Promise} Resolves to the external links object.
 */
async function getExternalLinks(handle) {
  const response = await api.doFetch(
    `/members/${handle}/externalLinks`,
    {},
    true
  );
  return api.handleApiResponse(response);
}

/**
 * Gets member's external accounts.
 *
 * @param {String} handle
 *
 * @return {Promise} Resolves to the external accounts object.
 */
async function getExternalAccounts(handle) {
  const response = await api.doFetch(
    `/members/${handle}/externalAccounts`,
    {},
    true
  );
  return api.handleApiResponse(response);
}

export default {
  getMemberProfile,
  getSkills,
  getStats,
  getExternalLinks,
  getExternalAccounts,
};
