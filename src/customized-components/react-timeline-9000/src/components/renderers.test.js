'use strict';
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import '../setupTests';
import {DefaultItemRenderer, DefaultGroupRenderer} from './renderers';

describe('Item renderer', () => {
  it('should render the item', () => {
    const item = {title: 'my_test'};
    const component = shallow(<DefaultItemRenderer item={item} />);
    expect(component.text()).to.contain('my_test');
  });
});
describe('Group renderer', () => {
  it('should render the group', () => {
    const group = {title: 'my_test'};
    const component = shallow(<DefaultGroupRenderer group={group} />);
    expect(component.text()).to.contain('my_test');
  });
});
