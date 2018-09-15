import React, { Component } from 'react';


class GitRepos extends Component{
    constructor(props){
        super(props);
        this.state={repos:[]};
    }

    render(){
        return(<p>GitRepos</p>);
    }

}

export default GitRepos;