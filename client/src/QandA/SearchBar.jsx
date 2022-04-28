import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      search: ''
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleSearchChange=this.handleSearchChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('submit clicked on search bar');
    this.props.handleSearch(this.state.search);
  }

  handleSearchChange(e){
    this.setState({
      search: e.target.value
    });
  }

  render(){
    return(
      <div className="search-bar-container" onSubmit={this.handleSubmit}>
        <input className='search-bar'
          type="text"
          placeholder="Have a question?"
          value={this.state.search}
          onChange={this.handleSearchChange}
        />
        <button  onClick={this.handleSubmit} className='search-bar-submit-btn' type='submit'>Search</button>
      </div>
    );
  }
}

export default SearchBar;