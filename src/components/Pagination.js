import React, {Component} from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.current = this.props.current;
    }

    /**
     * Increment the current index and call updatePage on parent
     */
    getNext = () => {
        this.current++;
        this.props.updatePage(this.current);
    };

    /**
     * Decrement the current index and call updatePage on parent
     */
    getPrev = () => {
        this.current--;
        this.props.updatePage(this.current);
    };

    /**
     * Get the page at a particular position
     */
    getPage = (position) => {
        this.current = position;
        this.props.updatePage(this.current);
    };

    render() {
        /*
        Render the numeric pages for pagination
         */
        const pagination = this.props.total_pages.map((page, index) => {
            return (
                <li key={index} onClick={this.getPage.bind(this, index)} className={this.props.current===index ? 'current-page': ''}>{index + 1}</li>
            );

        });

        return (
            <nav className="pagination">
                <ul >
                    {this.props.current < this.props.total_pages.length-1? <li onClick={this.getNext}>Next</li> : ''}
                    {pagination}
                    {this.props.current > 0 ? <li onClick={this.getPrev}>Previous</li> : ''}
                </ul>
            </nav>
        )
    }
};


export default Pagination;