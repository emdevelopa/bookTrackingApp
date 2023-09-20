import React from 'react';
import { FaPlus, FaUser } from 'react-icons/fa';

// BookList is a functional React component that displays a list of books.
// It accepts three props: books (an array of book objects), onMove (a function to handle moving a book),
// and onDelete (a function to handle deleting a book).
const BookList = ({ books, onMove, onDelete }) => {
  return (
    // Render an unordered list with a flexbox layout and a gap of 4 units between children.
    <ul className='flex flex-col gap-4'>
      {/* Map over the array of books and render each book as a list item. */}
      {books.map((book, index) => (
        <li key={book.id} className='flex flex-col gap-2'>
          {/* Display the title of the book. */}
          {book.title}

          {/* Button to move the book to the 'inProgress' category when clicked. */}
          <button
            key={`move-${book.id}-${index}`}
            onClick={() => onMove(book.id, 'inProgress')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-md"
          >
            In progress
          </button>

          {/* Button to move the book to the 'completed' category when clicked. */}
          <button
            key={`complete-${book.id}-${index}`}
            onClick={() => onMove(book.id, 'completed')}
            className="bg-green-500 hover-bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Completed
          </button>

          {/* Button to delete the book when clicked. */}
          <button
            key={`delete-${book.id}-${index}`}
            onClick={() => onDelete(book.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// Export the BookList component as the default export of this module.
export default BookList;
