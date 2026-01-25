import React from "react";
import "./AddBook.css";
const AddBook = ({ handleChange, handleSubmit, book }) => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form method="post" className="book-form" onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">Add Book</h2>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-bold">
                  Book Title :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={book.title || " "}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label fw-bold">
                  Book Author :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  value={book.author || " "}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label fw-bold">
                  Book Price :
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={book.price || " "}
                  onChange={handleChange}
                  min={100}
                  max={1000}
                />
              </div>
              <button type="submit" className="btn btn-primary fw-bold">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
