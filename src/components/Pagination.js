import React, {Component} from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.current = this.props.current;
    }

    getNext = () => {

        this.current++;
        this.props.updatePage(this.current);


    };
    getPrev = () => {
        this.current--;
        this.props.updatePage(this.current);

    };

    getPage = (position) => {
        this.current = position;
        this.props.updatePage(this.current);

    };

    render() {
        const pagination = this.props.total_pages.map((page, index) => {
            return (
                <li key={index} onClick={this.getPage.bind(this, index)} className={this.props.current===index ? 'current-page': ''}>{index + 1}</li>
            );

        });

        return (
            <nav className="pagination">
                <ul >
                    {this.props.total_pages[this.props.current + 1]? <li onClick={this.getNext}>Next</li> : ''}
                    {pagination}
                    {this.props.current > 0 ? <li onClick={this.getPrev}>Previous</li> : ''}

                </ul>
            </nav>
        )
    }
};


export default Pagination;