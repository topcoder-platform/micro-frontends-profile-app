/* global process */
import api from "./api";

/**
 * Gets countries from V3 API.
 *
 * @return {Promise} Resolves to the countries.
 */
async function getCountries() {
  const response = await api.doFetch("/members/lookup/countries", {}, true);
  return api.handleApiResponse(response);
}

export default {
  getCountries,
};
