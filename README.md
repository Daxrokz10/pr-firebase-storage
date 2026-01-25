# Firestore Book React

A modern React application for managing a book collection using Firebase Firestore as the backend database.

## Deploy Link 

- Link :- https://react-book-firebase-storage-pr.vercel.app/

## Features

- **View Books**: Display all books stored in Firestore
- **Add Books**: Add new books to your collection
- **Firebase Integration**: Real-time data synchronization with Firestore
- **Responsive UI**: Clean and intuitive user interface

## Tech Stack

- **React**: UI library for building interactive components
- **Vite**: Modern build tool for fast development
- **Firebase Firestore**: Cloud-based NoSQL database
- **ESLint**: Code quality and consistency

## Project Structure

```
src/
├── components/
│   ├── AddBook.jsx        # Component to add new books
│   ├── AddBook.css        # Styling for AddBook
│   ├── ViewBooks.jsx      # Component to display books
│   ├── ViewBooks.css      # Styling for ViewBooks
│   ├── Header.jsx         # Header component
│   └── Header.css         # Styling for Header
├── firebase/
│   └── config.js          # Firebase configuration
├── App.jsx                # Main application component
└── main.jsx               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase project with Firestore database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd firestore-book-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Update `src/firebase/config.js` with your Firebase credentials
   - Enable Firestore in your Firebase project

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Usage

1. **View Books**: The main page displays all books from your Firestore collection
2. **Add a Book**: Click the "Add Book" button and fill in the book details
3. **Real-time Updates**: Changes are automatically synchronized with Firestore

## License

This project is open source and available under the MIT License.
