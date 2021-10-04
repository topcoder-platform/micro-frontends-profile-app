import React from "react";
import PT from "prop-types";

import ExternalLink from "components/ExternalLink";

import "./styles.scss";

const LinkedAccounts = ({ externals }) => {
  return (
    <div styleName="external-links-container">
      <h3>On The Web</h3>
      <div styleName="external-links">
        {externals.map((external) => (
          <ExternalLink
            data={external.data}
            key={
              external.type !== "weblink"
                ? external.type
                : `${external.type}-${external.data.key}`
            }
            type={external.type}
          />
        ))}
      </div>
    </div>
  );
};

LinkedAccounts.defaultProps = {
  externals: [],
};

LinkedAccounts.propTypes = {
  externals: PT.arrayOf(PT.shape()),
};

export default LinkedAccounts;
