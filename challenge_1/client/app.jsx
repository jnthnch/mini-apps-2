import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './search.jsx';
import SearchResults from './searchResults.jsx';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordSearch: '',
      searchResults: [],
      currentPageNumber: 1,
      pageCount: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.querySearch = this.querySearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleSubmit(e, keywordSearch) {
    const that = this;
    e.preventDefault();
    this.setState({
      keywordSearch: keywordSearch
    })
    axios.get(`/events?q=${keywordSearch}`)
      .then(function (response) {
        console.log(response)
        that.setState({
          searchResults: response.data.slice(0, 10),
          pageCount: Math.ceil(response.data.length / 10)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  querySearch(word, pageNumber) {
    const that = this;
    axios.get(`/events?q=${word}&_page=${pageNumber}&_limit=10`)
      // axios.get(`/events?q=${word}&_page=2&_limit=10`)
      .then(function (response) {
        console.log(response)
        that.setState({
          searchResults: response.data,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handlePageClick(data) {
    this.querySearch(this.state.keywordSearch, data.selected + 1);
    this.setState({
      currentPageNumber: data.selected + 1
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Historical Events Finder</h1>
          <Search handleSubmit={this.handleSubmit} />
        </div>

        <div className="commentBox">
          <SearchResults searchResults={this.state.searchResults} />
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));