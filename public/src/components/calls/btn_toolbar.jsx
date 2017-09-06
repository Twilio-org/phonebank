import React from 'react';

import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

const Toolbar = (props) => {
  const { outcomes, handleOutcome } = props;

  return (
    <div>
      <ButtonToolbar>
        <ButtonGroup vertical>
          <ToggleButtonGroup
            type="radio"
            name="meow"
            onChange={handleOutcome}
          >
            {outcomes.map((outcome, index) => {
              const { value, style } = outcome;
              return (
                <ToggleButton
                  bsStyle={style}
                  value={value.toUpperCase()}
                  key={value.concat(index)}
                  name={value}
                >
                  {value}
                </ToggleButton>
              );
            })
          }
          </ToggleButtonGroup>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
};

Toolbar.displayName = 'Toolbar';

export default Toolbar;
