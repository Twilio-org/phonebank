import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
        path={`${parent}/login`}
        component={LogInForm}
      />
      <Redirect from={parent} to={`${parent}/login`} />
    </Switch>
  );
};

Public.displayName = 'Public';

export default Public;
