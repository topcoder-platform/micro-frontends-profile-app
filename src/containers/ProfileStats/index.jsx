import { useLocation } from "@reach/router";
import actions from "actions";
import Loading from "components/Loading";
import MetaTags from "components/MetaTags";
import NotFoundPage from "components/NotFoundPage";
import ProfileStatsPage from "components/ProfileStatsPage";
import PT from "prop-types";
import qs from "qs";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const getQueryParamsQuery = (location) =>
  location.search ? qs.parse(location.search.slice(1)) : {};

const ProfileStats = (props) => {
  const {
    profile,
    stats,
    statsHistory,
    statsDistribution,
    handle,
    loading,
    hasFailed,
    activeChallengesCount,
  } = props;
  useEffect(() => {
    const {
      handle,
      getMemberProfile,
      getStats,
      getStatsHistory,
      getStatsDistribution,
    } = props;
    getStats(handle);
    getStatsHistory(handle);
    getStatsDistribution(track, subTrack);
    getMemberProfile(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile.userId) {
      const { getActiveChallenges } = props;
      getActiveChallenges(profile.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.userId]);

  const location = useLocation();
  const { track, subTrack, tab } = getQueryParamsQuery(location);

  if (hasFailed) {
    return <NotFoundPage />;
  }

  const title = `${handle} | Community Profile | Topcoder`;
  const description = `Meet Topcoder member ${handle} and view their skills and development and design activity. You can also see wins and tenure with Topcoder.`;

  return loading ? (
    <Loading />
  ) : (
    <>
      <MetaTags title={title} description={description} />
      <ProfileStatsPage
        profile={profile}
        handle={handle}
        activeChallengesCount={activeChallengesCount}
        stats={stats}
        track={track}
        subTrack={subTrack}
        tab={tab}
        statsHistory={statsHistory}
        statsDistribution={statsDistribution}
      />
    </>
  );
};

ProfileStats.defaultProps = {
  profile: {},
  stats: {},
  loading: false,
  hasFailed: false,
  activeChallengesCount: 0,
};

ProfileStats.propTypes = {
  handle: PT.string.isRequired,
  profile: PT.shape(),
  stats: PT.shape(),
  loading: PT.bool,
  hasFailed: PT.bool,
  activeChallengesCount: PT.number,
  statsHistory: PT.arrayOf(PT.shape()),
};

const mapStateToProps = (state) => ({
  profile: state.profile.memberProfile,
  stats: state.profile.stats,
  loading: state.profile.loading || state.profile.challengesLoading,
  hasFailed: state.profile.hasFailed,
  activeChallengesCount: state.profile.activeChallengesCount,
  statsHistory: state.profile.statsHistory,
  statsDistribution: state.profile.statsDistribution,
});

const mapDispatchToProps = {
  getMemberProfile: actions.profile.getMemberProfile,
  getStats: actions.profile.getStats,
  getStatsHistory: actions.profile.getStatsHistory,
  getStatsDistribution: actions.profile.getStatsDistribution,
  getActiveChallenges: actions.profile.getActiveChallenges,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStats);
