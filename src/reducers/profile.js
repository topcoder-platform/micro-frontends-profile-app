import { handleActions } from "redux-actions";

const defaultState = {
  memberProfile: {},
  skills: {},
  stats: {},
  loading: false,
  challengesLoading: false,
  hasFailed: false,
  externalLinks: null,
  externalAccounts: null,
  activeChallengesCount: 0,
  errors: {
    alerts: [],
  },
};

/**
 * Reducer for get member profile initial action
 *
 * @param state
 *
 * @return {Object} updated state
 */
function onGetMemberProfileInit(state) {
  return {
    ...state,
    loading: true,
    hasFailed: false,
  };
}

/**
 * Reducer for get member profile failure action
 *
 * @param state
 *
 * @return {Object} updated state
 */
function onGetMemberProfileFail(state, { payload }) {
  return {
    ...state,
    loading: false,
    hasFailed: true,
    errors: {
      alerts: [
        ...state.errors.alerts,
        { title: payload.title, details: payload.details },
      ],
    },
  };
}

/**
 * Reducer for get member profile successful action
 *
 * @param state
 * @param payload
 *
 * @return {Object} updated state
 */
function onGetMemberProfileDone(state, { payload }) {
  return { ...state, memberProfile: payload, loading: false, hasFailed: false };
}

/**
 * Reducer for get user skills successful action
 *
 * @param state
 * @param payload
 *
 * @return {Object} updated state
 */
function onGetSkillsDone(state, { payload }) {
  return { ...state, skills: payload.skills };
}

/**
 * Reducer for get user statistics successful action
 *
 * @param state
 * @param payload
 *
 * @return {Object} updated state
 */
function onGetStatsDone(state, { payload }) {
  return { ...state, stats: payload.length ? payload[0] : null };
}

/**
 * Reducer for get external links successful action
 *
 * @param state
 * @param payload
 *
 * @return {Object} updated state
 */
function onGetExternalLinksDone(state, { payload }) {
  return { ...state, externalLinks: payload.result.content };
}

/**
 * Reducer for get external accounts successful action
 *
 * @param state
 * @param payload
 *
 * @return {Object} updated state
 */
function onGetExternalAccountsDone(state, { payload }) {
  return { ...state, externalAccounts: payload.result.content };
}

/**
 * Reducer for get active challenges initial action
 *
 * @param state
 *
 * @return {Object} updated state
 */
function onGetActiveChallengesInit(state) {
  return {
    ...state,
    challengesLoading: true,
  };
}

/**
 * Reducer for get active challenges successful action
 *
 * @param state
 * @param payload
 *
 * @return {Object} updated state
 */
function onGetActiveChallengesDone(state, { payload }) {
  return {
    ...state,
    activeChallengesCount: payload.totalCount,
    challengesLoading: false,
  };
}

/**
 * Reducer for get clear errors
 *
 * @param state
 *
 * @return {Object} updated state
 */
function onClearError(state) {
  return {
    ...state,
    errors: { alerts: state?.profile?.errors?.alerts?.slice(1) || [] },
  };
}

export default handleActions(
  {
    GET_MEMBER_PROFILE_INIT: onGetMemberProfileInit,
    GET_MEMBER_PROFILE_FAILURE: onGetMemberProfileFail,
    GET_MEMBER_PROFILE_DONE: onGetMemberProfileDone,
    GET_SKILLS_DONE: onGetSkillsDone,
    GET_STATS_DONE: onGetStatsDone,
    GET_EXTERNAL_LINKS_DONE: onGetExternalLinksDone,
    GET_EXTERNAL_ACCOUNTS_DONE: onGetExternalAccountsDone,
    GET_ACTIVE_CHALLENGES_INIT: onGetActiveChallengesInit,
    GET_ACTIVE_CHALLENGES_DONE: onGetActiveChallengesDone,
    CLEAR_ERROR: onClearError,
  },
  defaultState
);
