import { handleActions } from "redux-actions";

const defaultState = {
  countries: [],
};

/**
 * Reducer for get countries successful action
 *
 * @param state
 * @param payload
 *
 * @return {Object} updated state
 */
function onGetCountriesDone(state, { payload }) {
  return { ...state, countries: payload.result.content };
}

export default handleActions(
  {
    GET_COUNTRIES_DONE: onGetCountriesDone,
  },
  defaultState
);
