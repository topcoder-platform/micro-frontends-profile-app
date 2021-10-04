/**
 * Skill Component.  Displays an icon and label dynamically based on data.
 */
import React from "react";
import PT from "prop-types";
import { truncate } from "lodash";

import FallbackIcon from "assets/icons/id-develop.svg";
import VerifiedBadgeIcon from "assets/icons/verified-skill-badge.svg";

import "./styles.scss";

const assets = require.context("assets/icons/skills", false, /svg/);

const Skill = ({ tagId, tagName, isVerified }) => (
  <div styleName="container">
    <div styleName="skill-icon" aria-label={`${tagName} Icon`}>
      {assets && assets.keys().includes(`./id-${tagId}.svg`) ? (
        <img
          src={assets(`./id-${tagId}.svg`).default}
          alt={`${tagName} Icon`}
        />
      ) : (
        <FallbackIcon />
      )}
    </div>
    <div styleName="name-wrapper">
      <div styleName="name">{truncate(tagName, 20)}</div>
      {isVerified && (
        <div styleName="verified-badge">
          <VerifiedBadgeIcon />
        </div>
      )}
    </div>
  </div>
);

Skill.propTypes = {
  tagId: PT.string.isRequired,
  tagName: PT.string.isRequired,
  isVerified: PT.bool.isRequired,
};

export default Skill;
