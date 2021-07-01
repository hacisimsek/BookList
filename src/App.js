import React from "react";
import SearchBar from "./components/SearchBar";
import BooksList from "./components/BooksList";
import EditBooks from "./components/EditBooks";
import DetailBooks from "./components/DetailBooks";
import axios from "axios";
import AddBooks from "./components/AddBooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    books: [],
    searchQuery: "",
  };

  //axios api
  componentDidMount() {
    this.getBookList();
  }

  async getBookList() {
    const response = await axios.get("https://60d4b59fc6549200173a4b88.mockapi.io/api/v1/books");
    this.setState({ books: response.data });
  }

  deleteBooks = async (book) => {
    axios.delete(`https://60d4b59fc6549200173a4b88.mockapi.io/api/v1/books/${book.id}`);
    const newBookList = this.state.books.filter((m) => m.id !== book.id);

    this.setState((state) => ({
      books: newBookList,
    }));
  };

  searhBook = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  //add book with axios api
  addBook = async (book) => {
    await axios.post(`https://60d4b59fc6549200173a4b88.mockapi.io/api/v1/books/`, book);
    this.setState((state) => ({
      books: state.books.concat([book]),
    }));
    this.getBookList();
  };

  //edit book with axios api
  editBook = async (id, updateBook) => {
    await axios.put(`https://60d4b59fc6549200173a4b88.mockapi.io/api/v1/books/${id}`, updateBook);
    this.getBookList();
  };

  detailBook = async (id, showBook) => {
    await axios.get(`https://60d4b59fc6549200173a4b88.mockapi.io/api/v1/books/${id}`, showBook);
    this.getBookList();
  };

  render() {
    let filterBooks = this.state.books
      .filter((book) => {
        return (
          book.name
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });

      if (filterBooks.length  === 0){
        filterBooks = this.state.books
      .filter((book) => {
        return (
          book.author
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
      }
      if (filterBooks.length  === 0){
        filterBooks = this.state.books
      .filter((book) => {
        return (
          book.publisher
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
      }

    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchBookProp={this.searhBook} />
                    </div>
                  </div>
                  <BooksList
                    books={filterBooks}
                    deleteBooksProp={this.deleteBooks}
                  />
                </>
              )}
            ></Route>
            <Route
              path="/add"
              render={({ history }) => (
                <AddBooks
                  onAddBook={(book) => {
                    this.addBook(book);
                    history.push("/");
                  }}
                />
              )}
            ></Route>
            <Route
              path="/edit/:id"
              render={(props) => (
                <EditBooks
                  {...props}
                  onEditBook={(id, book) => {
                    this.editBook(id, book);
                  }}
                />
              )}
            ></Route>
            <Route
              path="/detail/:id"
              render={(props) => (
                <DetailBooks
                  {...props}
                  onDetailBook={(id, book) => {
                    this.detailBook(id, book);
                  }}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
