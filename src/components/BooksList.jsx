import React from "react";
import { Link } from "react-router-dom";

const BooksList = (props) => {
  return (
    <div className="row">
      {props.books.map((book, i) => (
        <div className="col-lg-4" key={i}>
          <div className="card mb-4 shadow-sm">
            <img
              src={book.imageURL}
              className="card-img-top h-100 "
              alt="sample book"
            />
            <div className="card-body">
              <h5 className="card-title">{book.name}</h5>
              <h6 className="card-title">{book.author}</h6>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  onClick={(event) => props.deleteBooksProp(book)}
                  className="btn btn-md btn-outline-danger"
                >
                  Delete
                </button>
                <Link
                  to={`edit/${book.id}`}
                  type="button"
                  className="btn btn-outline-primary"
                >
                  Edit
                </Link>
                <Link
                  to={`detail/${book.id}`}
                  type="button"
                  className="btn btn-outline-primary"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BooksList;
