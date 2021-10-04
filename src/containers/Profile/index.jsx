import React, { useEffect } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import actions from "../../actions";

import ProfilePage from "components/ProfilePage";
import Loading from "components/Loading";
import NotFoundPage from "components/NotFoundPage";
import MetaTags from "components/MetaTags";

const Profile = (props) => {
  const {
    profile,
    skills,
    stats,
    countries,
    externalLinks,
    externalAccounts,
    loading,
    hasFailed,
    handle,
  } = props;

  useEffect(() => {
    const {
      getSkills,
      getMemberProfile,
      getStats,
      getCountries,
      getExternalLinks,
      getExternalAccounts,
    } = props;
    getSkills(handle);
    getStats(handle);
    getMemberProfile(handle);
    getCountries();
    getExternalLinks(handle);
    getExternalAccounts(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

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
      <ProfilePage
        profile={profile}
        skills={skills}
        stats={stats}
        countries={countries}
        externalLinks={externalLinks}
        externalAccounts={externalAccounts}
      />
    </>
  );
};

Profile.defaultProps = {
  skills: {},
  profile: {},
  stats: {},
  loading: false,
  hasFailed: false,
  externalLinks: [],
  externalAccounts: {},
  countries: [],
};

Profile.propTypes = {
  handle: PT.string.isRequired,
  skills: PT.shape(),
  profile: PT.shape(),
  stats: PT.shape(),
  loading: PT.bool,
  hasFailed: PT.bool,
  externalLinks: PT.arrayOf(PT.shape()),
  externalAccounts: PT.shape(),
  countries: PT.arrayOf(PT.shape()),
};

const mapStateToProps = (state) => ({
  skills: state.profile.skills,
  profile: state.profile.memberProfile,
  stats: state.profile.stats,
  loading: state.profile.loading,
  hasFailed: state.profile.hasFailed,
  externalLinks: state.profile.externalLinks,
  externalAccounts: state.profile.externalAccounts,
  countries: state.lookup.countries,
});

const mapDispatchToProps = {
  getSkills: actions.profile.getSkills,
  getMemberProfile: actions.profile.getMemberProfile,
  getStats: actions.profile.getStats,
  getExternalLinks: actions.profile.getExternalLinks,
  getExternalAccounts: actions.profile.getExternalAccounts,
  getCountries: actions.lookup.getCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
