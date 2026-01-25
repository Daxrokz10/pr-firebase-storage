import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddBook from "./components/AddBook";
import ViewBooks from "./components/ViewBooks";
import Header from "./components/Header";
import { db } from "./firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const App = () => {
  const [book, setBook] = useState({});
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Create Book in Firestore
  const createBook = async (book) => {
    try {
      let docRef = await addDoc(collection(db, "books"), book);
      console.log(docRef.id);
    } catch (error) {
      alert(error);
    }
  };

  // Get All Book from Firestore
  const getAllBooks = async () => {
    try {
      let booksData = [];
      let querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => {
        booksData.push({ ...doc.data(), id: doc.id });
      });
      setList(booksData);
    } catch (error) {
      alert(error);
    }
  };

  // Delete Book in Firestore
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
      alert("Book Deleted.");
      getAllBooks();
    } catch (error) {
      alert(error);
    }
  };

  // Update Book in Firestore
  const updateBook = async (id, book) => {
    try {
      delete book.id;
      await updateDoc(doc(db, "books", id), book);
      alert("Book Updated.");
      getAllBooks();
    } catch (error) {
      alert(error);
    }
  };

  
  useEffect(() => {
    getAllBooks();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (book.id) {
      updateBook(book.id, book);
    } else {
      createBook(book);
    }
    navigate("/view-books");
    getAllBooks();
    setBook({});
  };

  const handleEdit = (id) => {
    const data = list.find((val) => val.id == id);
    setBook(data);
    navigate("/");
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          index
          element={
            <AddBook
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              book={book}
            />
          }
        />
        <Route
          path="/view-books"
          element={
            <ViewBooks
              handleEdit={handleEdit}
              deleteBook={deleteBook}
              list={list}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
