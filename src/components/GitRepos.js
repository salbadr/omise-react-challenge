import React, {Component} from 'react';
import axios from 'axios';
import Pagination from './Pagination';

class GitRepos extends Component {
    constructor(props) {
        super(props);
        this.total_pages = [];
        this.state = {page: [], current:0};
        this.perPage = 10;

    }

    componentDidMount() {
        this.getRepos();
    }


    updatePage=(current)=>{
        if (this.total_pages[current]) {
            this.setState({page: this.total_pages[current], current:current});
        }
    };

    getRepos() {
        return axios.request({
            method: 'get',
            url: '/repositories',
            baseURL: 'https://api.github.com/'

        }).then(res => {
            let temp = [];

            for (let i = 0; i < res.data.length; i++) {
                if (temp.length < this.perPage) {
                    temp.push(res.data[i]);
                }
                else {
                    this.total_pages.push(temp);

                    temp = [];

                }
            }
            this.setState({page: this.total_pages[0]});

        })
    }

    render() {

        const repo = this.state.page.map((repo) => {
            return (
                <div className="repo" key={repo.id}>
                    <p><label>Name:</label><span>{repo.name}</span></p>
                    <p><label>Owner:</label><span>{repo.owner.login}</span></p>
                    <p><label>Url:</label><a href={repo.url} target="_blank">{repo.url}</a></p>
                </div>
            );

        });


        return (
            <div className="container">
                <h2>Git Repos</h2>
                <Pagination total_pages={this.total_pages} updatePage={this.updatePage} current={this.state.current}/>
                <div className="repos-container">
                {repo}
                </div>
                <Pagination total_pages={this.total_pages} updatePage={this.updatePage} current={this.state.current}/>
            </div>
        );
    }

}


export default GitRepos;