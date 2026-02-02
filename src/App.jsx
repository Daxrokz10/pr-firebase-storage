import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddBook from "./components/AddBook";
import ViewBooks from "./components/ViewBooks";
import Header from "./components/Header";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { db, auth } from "./firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [book, setBook] = useState({});
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
      {loading ? (
        <div className="container mt-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Header user={user} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/view-books" element={<ViewBooks list={list} handleEdit={handleEdit} deleteBook={deleteBook} />} />
            <Route
              index
              element={
                <ProtectedRoute user={user}>
                  <AddBook
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    book={book}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
