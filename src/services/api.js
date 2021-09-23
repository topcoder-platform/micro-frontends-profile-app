/* global process */
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import { API } from "../../config";

/**
 * Perform request to V5 API.
 *
 * @param {String} endpoint
 * @param {Object} options
 *
 * @return {Promise} Returns the request response.
 */
async function doFetch(endpoint, options = {}, v3, baseUrl) {
  const headers = options.headers ? { ...options.headers } : {};
  const token = await getAuthUserTokens();
  let url;
  if (baseUrl) {
    url = baseUrl;
  } else if (v3) {
    url = API.V3;
  } else {
    url = API.V5;
  }

  if (token && token.tokenV3) {
    headers.Authorization = `Bearer ${token.tokenV3}`;
  }

  return fetch(`${url}${endpoint}`, {
    ...options,
    headers,
  });
}
/**
 * Gets payload from a stand success response from TC V5 API or
 * throws errors in case of a failure responose
 *
 * @param {Object} response
 *
 * @returns V5 API response
 */
async function handleApiResponse(response) {
  const res = await response.clone().json();
  const result = res.result;

  if (!response.ok || (result && !result.success)) {
    const errorMessage =
      response.statusText || result?.content || res.message || "Error occured";
    return Promise.reject({
      title: errorMessage,
      details: "",
    });
  }
  return response.json();
}

export default {
  doFetch,
  handleApiResponse,
};
