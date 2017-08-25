import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegistrationForm from '../../containers/registration';
import LogInForm from '../../components/login';

const Public = () => {
  const parent = '/public';
  return (
    <Switch>
      <Route
        path={`${parent}/registration`}
        component={RegistrationForm}
      />
      <Route
        component={LogInForm}
      />
    </Switch>
  );
};

Public.displayName = 'Public';

export default Public;
