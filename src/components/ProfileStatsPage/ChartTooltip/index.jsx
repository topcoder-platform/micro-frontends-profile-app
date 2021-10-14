/**
 * Chart tooltip.  Displays the stats of a TopCoder member.
 */
/* eslint-env browser */
import React from "react";
import PT from "prop-types";
import { Link } from "@reach/router";
import "./styles.scss";

const ChartTooltip = ({
  track,
  show,
  left,
  top,
  challengeName,
  challengeData,
  rating,
  ratingColor,
  link,
}) => {
  if (link == null) {
    return null;
  }

  const popup = (
    <>
      <div styleName="tooltip-rating" style={{ backgroundColor: ratingColor }}>
        {rating}
      </div>
      <div styleName="tooltip-challenge">
        <div styleName="challenge-name">{challengeName}</div>
        <div styleName="challenge-date">{challengeData}</div>
      </div>
    </>
  );

  const style = {
    opacity: show ? 1 : 0,
    left,
    top,
    pointerEvents: link ? "all" : "none",
  };

  if (track === "DEVELOP") {
    return (
      <Link styleName="chart-tooltip" style={style} to={link}>
        {popup}
      </Link>
    );
  }

  // Show Data Science match details in Community App
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      styleName="chart-tooltip"
      style={style}
    >
      {popup}
    </a>
  );
};

ChartTooltip.defaultProps = {
  track: null,
  show: false,
  left: 0,
  top: 0,
  challengeName: "",
  challengeData: "",
  rating: 0,
  ratingColor: "",
  link: null,
};

ChartTooltip.propTypes = {
  track: PT.string,
  show: PT.bool,
  left: PT.number,
  top: PT.number,
  challengeName: PT.string,
  challengeData: PT.string,
  rating: PT.number,
  ratingColor: PT.string,
  link: PT.string,
};

export default ChartTooltip;
