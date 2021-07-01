import React, { Component } from "react";
import axios from "axios";

export default class EditBooks extends Component {
  state = {
    name: " ",
    author: "",
    imageURL: " ",
    overview: "",
    publisher: "",
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await axios.get(`https://60d4b59fc6549200173a4b88.mockapi.io/api/v1/books/${id}`);
    const book = response.data;
    this.setState({
      name: book.name,
      author: book.author,
      imageURL: book.imageURL,
      overview: book.overview,
      publisher: book.publisher,
    });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, author, imageURL, overview, publisher } = this.state;
    const id = this.props.match.params.id;
    const updateBook = {
      name,
      author,
      imageURL,
      overview,
      publisher,
    };
    this.props.onEditBook(id, updateBook);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.handleFormSubmit}>
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Fill The Form To Edit A Book.."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Author</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={this.state.author}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                value={this.state.imageURL}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-group col-md-10">
              <label htmlFor="inputPublisher">Publisher</label>
              <input
                type="text"
                className="form-control"
                name="publisher"
                value={this.state.publisher}
                onChange={this.onInputChange}
              />
            </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Quotation</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
                value={this.state.overview}
                onChange={this.onInputChange}
              ></textarea>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-danger btn-block mt-3"
            value="Edit Book"
          />
        </form>
      </div>
    );
  }
}
