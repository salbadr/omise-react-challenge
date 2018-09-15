import React from 'react';

import JSONViewer from '../components/JSONViewer';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('JSONViewer', () => {

    describe ('parser' , () => {
        const jsonViewer = new JSONViewer();

        it('should extract all root level items and not include any that have wrong level', () => {
            const input = {
                "0":
                    [{
                        "id": 10,
                        "title": "House",
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    },
                        {
                            "id": 11,
                            "title": "Car",
                            "level": 1,
                            "children": [],
                            "parent_id": null
                        },
                        {
                            "id": 13,
                            "title": "Truck",
                            "level": 1,
                            "children": [],
                            "parent_id": null
                        }
                    ]
            };


            const result = jsonViewer.parser(input);


            expect(result.length).toBe(1);
            expect(result[0].id).toBe(10);
            expect(result[0].level).toBe(0);


        });

        it('should add children to the correct parent when only 1 child', () => {
            const input = {
                "0":
                    [{
                        "id": 10,
                        "title": "House",
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    },
                        {
                            "id": 13,
                            "title": "House",
                            "level": 0,
                            "children": [],
                            "parent_id": null
                        }],
                "1":
                    [{
                        "id": 12,
                        "title": "Red Roof",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    }],
            };

            const result = jsonViewer.parser(input);

            expect(result[0].children[0].id).toBe(12);
            expect(result[1].children.length).toBe(0);


        });
        it('should add children to the parent when >1 child', () => {
            const input = {
                "0":
                    [{
                        "id": 10,
                        "title": "House",
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    }],
                "1":
                    [{
                        "id": 12,
                        "title": "Red Roof",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    }, {
                        "id": 18,
                        "title": "Blue Roof",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    },
                        {
                            "id": 13,
                            "title": "Wall",
                            "level": 1,
                            "children": [],
                            "parent_id": 10
                        }],
            };

            const result = jsonViewer.parser(input);

            expect(result[0].children[0].id).toBe(12);
            expect(result[0].children[1].id).toBe(18);
            expect(result[0].children[2].id).toBe(13);


        });
        it('should add children to the correct parent when only 1 child and level = 2', () => {
            const input = {
                "0":
                    [{
                        "id": 10,
                        "title": "House",
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    }],
                "1":
                    [{
                        "id": 12,
                        "title": "Blue Wall",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    }],
                "2":
                    [{
                        "id": 17,
                        "title": "Red Roof",
                        "level": 2,
                        "children": [],
                        "parent_id": 12
                    }]
            };

            const result = jsonViewer.parser(input);

            expect(result[0].children[0].id).toBe(12);
            expect(result[0].children[0].children[0].id).toBe(17);


        });
        it('should add children to the correct parent when >1 child and level = 2', () => {
            const input = {
                "0":
                    [{
                        "id": 10,
                        "title": "House",
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    }],
                "1":
                    [{
                        "id": 12,
                        "title": "Red Roof",
                        "level": 1,
                        "children": [],
                        "parent_id": 10
                    },
                        {
                            "id": 18,
                            "title": "Blue Roof",
                            "level": 1,
                            "children": [],
                            "parent_id": 10
                        },
                        {
                            "id": 13,
                            "title": "Wall",
                            "level": 1,
                            "children": [],
                            "parent_id": 10
                        }],
                "2":
                    [{
                        "id": 17,
                        "title": "Blue Window",
                        "level": 2,
                        "children": [],
                        "parent_id": 12
                    },
                        {
                            "id": 16,
                            "title": "Door",
                            "level": 2,
                            "children": [],
                            "parent_id": 13
                        },
                        {
                            "id": 15,
                            "title": "Red Window",
                            "level": 2,
                            "children": [],
                            "parent_id": 12
                        }]
            };

            const result = jsonViewer.parser(input);

            expect(result[0].children[0].id).toBe(12);
            expect(result[0].children[1].id).toBe(18);
            expect(result[0].children[2].id).toBe(13);

            expect(result[0].children[0].children[0].id).toBe(17);
            expect(result[0].children[0].children[1].id).toBe(15);
            expect(result[0].children[1].children.length).toBe(0);
            expect(result[0].children[2].children.length).toBe(1);
            expect(result[0].children[2].children[0].id).toBe(16);


        });
    });
    describe('render', ()=>{
        configure({adapter: new Adapter()});

        it('renders two <textarea />', () => {
            const wrapper = shallow(<JSONViewer />);
            expect(wrapper.find('textarea').length).toBe(2);
        });
    })

});
