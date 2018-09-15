import React, { Component } from 'react';


class JSONViewer extends Component{
    constructor(props){
        super(props);
        this.state={input:{}};

    }

    parser=(input)=>{
        /*
        Get the json object represented as an array
         */
        const jsonArray = Object.keys(input).map((key) => {
            /*
            Filter out any key that is in incorrect level
             */
            return input[key].filter((item) => {
                return item.level === Number(key);
            });

        });


        return getChildren(jsonArray);


        /**
         Loop through the input JSON Object, while adding children to the parent
         */
        function getChildren(input) {
            return input.reduce((parents, value) => {
                return value.reduce((parents, item) => {
                    //The is the root level parents
                    if (!item.parent_id) {
                        parents.push(item);
                    }
                    else {
                        /*
                        recursively call addChildren to check if item needs
                        to be added to a parent's children
                         */
                        addChildren(parents, item);

                        function addChildren(parents, item) {
                            return parents.map((parent, index) => {
                                //the parent has children, check if we need to add to it
                                if (parent.children.length > 0) {
                                    addChildren(parent.children, item);
                                }
                                //the item is a child of the parent
                                if (item.parent_id === parent.id) {
                                    return parents[index].children.push(item);

                                }
                                else{
                                    return false;
                                }
                            });
                        }

                    }
                    return parents;
                }, parents);
            }, []);
        }
    }
    render(){
        return(
            <h2>JSON Viewer</h2>


        );
    }

}

export default JSONViewer;