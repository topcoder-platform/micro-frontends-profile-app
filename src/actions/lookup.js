import { createActions } from "redux-actions";
import service from "../services/lookup";

/**
 * Gets countries.
 *
 * @return {Promise} Resolves to the countries list.
 */
async function getCountries() {
  return service.getCountries();
}

export default createActions({
  GET_COUNTRIES: getCountries,
});
