import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { Header } from '../../public/src/components/header';


it('renders correctly', () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});

