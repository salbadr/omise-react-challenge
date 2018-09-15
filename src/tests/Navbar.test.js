import React from 'react';
import {NavLink} from 'react-router-dom';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navbar from '../components/Navbar';
describe('<Navbar />', () => {
    configure({adapter: new Adapter()});

    it('renders two <NavLink /> components', () => {
        const wrapper = shallow(<Navbar />);
        expect(wrapper.find(NavLink).length).toBe(2);
    });
});
