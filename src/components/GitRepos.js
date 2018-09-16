import React, {Component} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import settings from '../settings';

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

    /**
     * Gets the position parameter and sets the page to equal to the corresponding index
     * in total_pages
     *
     * @param position The position in the total_pages array.
     */
    updatePage=(position)=>{
        if (this.total_pages[position]) {
            this.setState({page: this.total_pages[position], current:position});
        }
    };

    /**
     * Gets a list of repository, saves them in an internal array. Each index of the
     * array contains 10 results per page. The index corresponds to the page that is shown
     *
     * @returns {Promise<AxiosResponse<any>>}
     */

    getRepos() {
        return axios.get(settings.repositoryUrl)
            .then(res => {
            let page = [];

            for (let i = 0; i < res.data.length; i++) {
                //Push results in a page array
                if (page.length < this.perPage) {
                    page.push(res.data[i]);
                }
                //We have 10 items per page. Push them in total pages array
                else {
                    this.total_pages.push(page);
                    page = [];

                }
            }
            this.setState({page: this.total_pages[0]});

        })
    }

    render() {

        /*
        Generate repo cards
         */
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