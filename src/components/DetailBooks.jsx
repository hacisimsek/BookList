import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DetailBooks = (props) => {
  const { id } = props.match.params;
  const [bookDetail, setBookDetail] = useState({});

  const truncateOverView = (string, maxlength) => {
    if (!string) return null;
    if (string.length <= maxlength) return string;
    return `${string.substring(0, maxlength)} ...`;
  };

  useEffect(() => {
    axios
      .get(`https://60d4b59fc6549200173a4b88.mockapi.io/api/v1/books/${id}`)
      .then((responses) => {
        setBookDetail(responses.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div
          class="row"
          style={{ width: "50rem", marginLeft: "15rem", marginTop: "5rem" }}
        >
          <div class="col-sm-6">
            <div class="card h-65 w-65">
              <img
                src={bookDetail.imageURL}
                className="card-img-top"
                alt="sample book"
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card" style={{ marginTop: "10rem" }}>
              <div className="card-body">
                <h4 className="card-title">{bookDetail.name}</h4>
                <h5 className="card-title">{bookDetail.author}</h5>
                <h7 className="card-title">{bookDetail.publisher}</h7>
                <p class="card-text mt-3">
                  {truncateOverView(bookDetail.overview, 180)}
                </p>
                <div className="d-flex justify-content-end align-items-center">
                  <Link
                    to={`/`}
                    type="button"
                    className="btn btn-outline-primary"
                  >
                    BookList
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DetailBooks;
