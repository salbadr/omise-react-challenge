describe('Formatter', () => {

    function Formatter(input) {
        const output = Object.keys(input).map((key) => {
            return input[key].filter((item) => {
                return item.level === Number(key);
            });

        });

        return output;
    }

    function getChildren(input) {
        return input.reduce((parents, value) => {
            return value.reduce((parents, item) => {
                if (!item.parent_id) {
                    parents.push(item);
                }
                else {
                   addChildren(parents, item);

                    function addChildren(parents, item) {

                        return parents.map((parent, index) => {

                            if(parent.children.length > 0){
                                 addChildren(parent.children, item);
                            }

                            if (item.parent_id === parent.id) {
                                return parents[index].children.push(item);

                            }
                        });
                    }

                }
                return parents;
            }, parents);
        }, []);
    }

    it('should extract all root level items', () => {
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
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    },
                    {
                        "id": 13,
                        "title": "Truck",
                        "level": 0,
                        "children": [],
                        "parent_id": null
                    }
                ]
        };


        const result = Formatter(input);


        expect(result.length).toBe(1);
        expect(result[0].length).toBe(3);


    });
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


        const result = Formatter(input);


        expect(result.length).toBe(1);
        expect(result[0].length).toBe(1);


    });
    it('should extract all root level items and children items', () => {
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
        };


        const result = Formatter(input);

        expect(result.length).toBe(2);
        expect(result[0].length).toBe(1);
        expect(result[1].length).toBe(3);


    });
    it('should extract all root level items and children items not include any that have wrong level', () => {
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
                        "level": 3,
                        "children": [],
                        "parent_id": 10
                    }],
        };


        const result = Formatter(input);

        expect(result.length).toBe(2);
        expect(result[0].length).toBe(1);
        expect(result[1].length).toBe(2);


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

        const result = getChildren(Formatter(input));

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

        const result = getChildren(Formatter(input));

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

        const result = getChildren(Formatter(input));

        expect(result[0].children[0].id).toBe(12);
        expect(result[0].children[0].children[0].id).toBe(17);


    });
    it('should add children to the correct parent when >1 child and level = 2', () => {
        const input = {"0":
                [{"id": 10,
                    "title": "House",
                    "level": 0,
                    "children": [],
                    "parent_id": null}],
            "1":
                [{"id": 12,
                    "title": "Red Roof",
                    "level": 1,
                    "children": [],
                    "parent_id": 10},
                    {"id": 18,
                        "title": "Blue Roof",
                        "level": 1,
                        "children": [],
                        "parent_id": 10},
                    {"id": 13,
                        "title": "Wall",
                        "level": 1,
                        "children": [],
                        "parent_id": 10}],
            "2":
                [{"id": 17,
                    "title": "Blue Window",
                    "level": 2,
                    "children": [],
                    "parent_id": 12},
                    {"id": 16,
                        "title": "Door",
                        "level": 2,
                        "children": [],
                        "parent_id": 13},
                    {"id": 15,
                        "title": "Red Window",
                        "level": 2,
                        "children": [],
                        "parent_id": 12}]};

        const result = getChildren(Formatter(input));

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
