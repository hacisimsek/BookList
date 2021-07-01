import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-row mb-5 mt-5" style={{ display: "flex" , marginLeft: "4rem"}}>
          <div className="col-10 inline">
            <input
              onChange={this.props.searchBookProp}
              className="form-control"
              placeholder="Search a book"
            />
          </div>
          <div className="col-2">
            <Link to="/add" type="button" className="btn btn-md btn-danger">
              Add Book
            </Link>
          </div>
        </div>
      </form>
    );
  }
}
export default SearchBar;
