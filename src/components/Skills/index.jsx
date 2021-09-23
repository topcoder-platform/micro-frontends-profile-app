import _ from "lodash";
import React, { useState } from "react";
import PT from "prop-types";
import { MAX_SKILLS } from "../../constants";

import Skill from "components/Skill";
import { PrimaryButton } from "components/buttons";

import "./styles.scss";

const Skills = ({ skills }) => {
  const [skillsExpanded, setSkillsExpanded] = useState(false);

  // Convert skills from object to an array for easier iteration
  let skillsArray = skills
    ? _.map(skills, (skill, tagId) => ({ tagId, ...skill }))
    : [];
  const showMoreButton = skillsArray.length > MAX_SKILLS;

  return (
    <>
      <div styleName="list">
        {(skillsExpanded ? skillsArray : skillsArray.slice(0, MAX_SKILLS)).map(
          ({ tagId, tagName, hidden, sources }) =>
            !hidden && (
              <div key={tagId} styleName="skill">
                <Skill
                  tagId={tagId}
                  tagName={tagName}
                  isVerified={_.includes(sources, "CHALLENGE")}
                />
              </div>
            )
        )}
      </div>
      <div styleName="buttonContainer">
        {showMoreButton && !skillsExpanded && (
          <PrimaryButton onClick={() => setSkillsExpanded(true)}>
            VIEW ALL
          </PrimaryButton>
        )}
        {skillsExpanded && (
          <PrimaryButton onClick={() => setSkillsExpanded(false)}>
            VIEW LESS
          </PrimaryButton>
        )}
      </div>
    </>
  );
};

Skills.defaultProps = {
  skills: {},
};

Skills.propTypes = {
  skills: PT.shape(),
};

export default Skills;
