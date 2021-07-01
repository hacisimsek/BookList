import React, { Component } from "react";
import serialize from "form-serialize";

export default class AddBooks extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    const newBook = serialize(e.target, { hash: true });
    this.props.onAddBook(newBook);
  };

  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.handleFormSubmit}>
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Fill The Form To Add A Book.."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputName">Name</label>
              <input type="text" className="form-control" name="name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">İmage URL</label>
              <input type="text" className="form-control" name="imageURL" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputAuthor">Author</label>
              <input type="text" className="form-control" name="author" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputPublisher">Publisher</label>
              <input type="text" className="form-control" name="publisher" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Overview</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
              ></textarea>
            </div>
          </div>

          <input
            type="submit"
            className="btn btn-danger btn-block mt-2"
            value="Add Book"
          />
        </form>
      </div>
    );
  }
}
