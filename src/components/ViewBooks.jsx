import React from "react";
import "./ViewBooks.css";

const ViewBooks = ({ list, handleEdit, deleteBook }) => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <table className="table book-table caption-top text-center">
              <caption>
                <h2 className="text-center mb-4">Books Data</h2>
              </caption>
              <thead>
                <tr>
                  <th className="fw-bold text-dark">Sr.No</th>
                  <th className="fw-bold text-dark">Book Title</th>
                  <th className="fw-bold text-dark">Book Author</th>
                  <th className="fw-bold text-dark">Book Price</th>
                  <th className="fw-bold text-dark">Action</th>
                </tr>
              </thead>
              <tbody>
                {list?.length == 0 && (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      No books found
                    </td>
                  </tr>
                )}

                {list?.map((val, index) => {
                  const { title, author, price, id } = val;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{title}</td>
                      <td>{author}</td>
                      <td>{price}</td>
                      <td className="action-cell">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger-outline fw-bold"
                          onClick={() => deleteBook(id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-warning-outline fw-bold"
                          onClick={() => handleEdit(id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBooks;
