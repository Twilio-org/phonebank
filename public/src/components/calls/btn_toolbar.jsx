import React from 'react';

import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

const Toolbar = (props) => {
  const { outcomes, handleOutcome, onChange } = props;

  // Note: need to fix btn group
  return (
    <div id="call-outcome-toolbar">
      <ButtonToolbar>
        <ToggleButtonGroup
          bsClass="btn-group-vertical"
          type="radio"
          name="side-bar-toggle"
          onChange={handleOutcome}
        >
          {outcomes.map((outcome, index) => {
            const { value, styled, icon } = outcome;
            return (
              <ToggleButton
                bsStyle={styled}
                value={value.toUpperCase()}
                key={value.concat(index)}
                name={value}
                onChange={onChange}
              >
                <i className="material-icons md-16">{icon}</i> {value}
              </ToggleButton>
            );
          })
        }
        </ToggleButtonGroup>
      </ButtonToolbar>
    </div>
  );
};

Toolbar.displayName = 'Toolbar';

export default Toolbar;
