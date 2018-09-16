import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Pagination from '../components/Pagination';

describe('<Pagination />', () => {
    configure({adapter: new Adapter()});

    it('should render 0 <li/> items if total_pages = 0', () => {
        const totalPages=[],
            wrapper = shallow(<Pagination total_pages={totalPages} />);

        expect(wrapper.find('li').length).toBe(0);
    });


    it('should render three <li/> items if total_pages > 0', () => {
        const totalPages=[1,2,3],
            wrapper = shallow(<Pagination total_pages={totalPages} />);

        expect(wrapper.find('li').length).toBe(3);
    });

    it('should render `Next` if total_pages > 0 and current = 0', () => {
        const totalPages=[1,2,3],
            current = 0,
        wrapper = shallow(<Pagination total_pages={totalPages} current={current} />);

        expect(wrapper.find('li').first().text()).toEqual('Next');
        expect(wrapper.find('li').length).toBe(4);
    });

    it('should not render `Previous` if total_pages > 0 and current = 0', () => {
        const totalPages=[1,2,3],
            current = 0,
            wrapper = shallow(<Pagination total_pages={totalPages} current={current} />);

        expect(wrapper.find('li').length).toBe(4);
        expect(wrapper.find('li').last().text()).not.toEqual('Previous');
    });


    it('should render `Previous` if total_pages > 0 and current > 0 and < total_pages.length-1', () => {
        const totalPages=[1,2,3],
            current = 2,
            wrapper = shallow(<Pagination total_pages={totalPages} current={current} />);

        expect(wrapper.find('li').length).toBe(4);
        expect(wrapper.find('li').last().text()).toEqual('Previous');
    });

    it('should not render `Next` if total_pages > 0 and current > 0 and < total_pages.length-1', () => {
        const totalPages=[1,2,3],
            current = 2,
            wrapper = shallow(<Pagination total_pages={totalPages} current={current} />);

        expect(wrapper.find('li').first().text()).not.toEqual('Next');
        expect(wrapper.find('li').length).toBe(4);
    });

    it('should increment current and call updatePage when getNext is called', () => {
        const gitRepo = {updatePage:()=>{}},
            spy = spyOn(gitRepo, 'updatePage'),
            totalPages=[1,2,3],
            current = 1,
            wrapper = shallow(<Pagination total_pages={totalPages} current={current} updatePage={spy}/>),
            instance=wrapper.instance();

        instance.getNext();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(instance.current).toBe(2);
    });


    it('should decrement current and call updatePage when getPrevious is called', () => {
        const gitRepo = {updatePage:()=>{}},
            spy = spyOn(gitRepo, 'updatePage'),
            totalPages=[1,2,3],
            current = 1,
            wrapper = shallow(<Pagination total_pages={totalPages} current={current} updatePage={spy}/>),
            instance=wrapper.instance();

        instance.getPrev();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(instance.current).toBe(0);
    });

    it('should set current to passed position and call updatePage when getPage is called', () => {
        const gitRepo = {updatePage:()=>{}},
            spy = spyOn(gitRepo, 'updatePage'),
            totalPages=[1,2,3],
            current = 1,
            wrapper = shallow(<Pagination total_pages={totalPages} current={current} updatePage={spy}/>),
            instance=wrapper.instance();

        instance.getPage(2);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(instance.current).toBe(2);
    });


});
