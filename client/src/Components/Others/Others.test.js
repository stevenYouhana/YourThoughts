import React from 'react';
import { shallow } from 'enzyme';

import Others from './Others';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const others = shallow(<Others />);
    expect(others).toFind(".thoughts-section");
  });
});
