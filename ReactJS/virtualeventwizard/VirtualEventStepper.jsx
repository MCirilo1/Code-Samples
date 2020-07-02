import React from "react";
import propTypes from "prop-types";

export default function VirtualEventStepper(props) {
  const determineProgressClassname = (stepId) => {
    const wizardStep = props.wizardStep;
    let className = "progtrckr-todo";
    if (stepId === wizardStep) {
      className = "progtrcker-doing";
    } else if (stepId < wizardStep) {
      className = "progtecker-done";
    }
    return className;
  };
  return (
    <ol className="progtrckr">
      <li className={determineProgressClassname(0)} value={0}>
        <span>Event Details</span>
      </li>
      <li className={determineProgressClassname(1)} value={1}>
        <span>Done</span>
      </li>
    </ol>
  );
}

VirtualEventStepper.propTypes = {
  wizardStep: propTypes.number,
};
