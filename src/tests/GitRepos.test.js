import React from 'react';
import {shallow, configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GitRepos from '../components/GitRepos';

describe('<GitRepos />', () => {
    configure({adapter: new Adapter()});

    const total_pages = [
        [
            {
                id: 1, name: 'bobRepo', url: 'https://wwww.example.com', owner:
                    {
                        login: 'Bob'
                    }
            },
            {
                id: 2, name: 'jimbo', url: 'https://wwww.example.com', owner:
                    {
                        login: 'Jim'
                    }
            },
            {
                id: 3, name: 'rambo', url: 'https://wwww.example.com', owner:
                    {
                        login: 'Rambo'
                    }
            }
        ]
    ];

    let wrapper = '';

    beforeEach(() => {
        spyOn(GitRepos.prototype, 'componentDidMount').and.callFake(() => '');
        wrapper = shallow(<GitRepos/>);
        const instance = wrapper.instance();

        instance.total_pages = total_pages;
        instance.setState({page: instance.total_pages[0]});
        wrapper = wrapper.update();
    });

    it('should list repos', () => {
        expect(wrapper.find('div.repo').length).toBe(3);

    });

    it('should have correct repo data in div.repo', () => {
        expect(wrapper.find('div.repo').at(0).find('span').length).toBe(2);
        expect(wrapper.find('div.repo').at(0).find('a').length).toBe(1);

        expect(wrapper.find('div.repo').at(0).find('span').at(0).text()).toBe("bobRepo");
        expect(wrapper.find('div.repo').at(0).find('span').at(1).text()).toBe("Bob");
        expect(wrapper.find('div.repo').at(0).find('a').text()).toBe("https://wwww.example.com");
    });

    it('should have 2 <Pagination/> components', () => {
        expect(wrapper.find('Pagination').length).toBe(2);
    });


});
