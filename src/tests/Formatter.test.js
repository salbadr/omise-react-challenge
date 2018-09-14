describe('Formatter', () => {

    function Formatter(input) {
        const output = Object.keys(input).map((key) => {
            return input[key].filter((item) => {
                return item.level === Number(key);
            });

        });


        return output;
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
                        "level": 3,
                        "children": [],
                        "parent_id": 10}],
        };


        const result = Formatter(input);

        expect(result.length).toBe(2);
        expect(result[0].length).toBe(1);
        expect(result[1].length).toBe(2);



    });

});
