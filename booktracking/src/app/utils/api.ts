import axios from "axios"; // Importing axios library for making HTTP requests

const API_BASE_URL = 'http://localhost:8000'; // Backend API URL

// Function to get a list of books from the backend API.
export const getBooks = async () => {
  try {
    // Send a GET request to the API endpoint for retrieving books.
    const response = await axios.get(`${API_BASE_URL}/books`);

    // Return the data received from the response (list of books).
    return response.data;
  } catch (error) {
    // If an error occurs during the request, throw the error for handling elsewhere.
    throw error;
  }
};

// Function to add a new book to the backend API.
export const addBook = async (title: string) => {
  try {
    // Send a POST request to the API endpoint for adding a book.
    const response = await axios.post(
      `${API_BASE_URL}/books`,
      { title },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the data received from the response (the newly added book).
    return response.data;
  } catch (error) {
    // If an error occurs during the request, throw the error for handling elsewhere.
    throw error;
  }
};

// Function to move a book to a different destination in the backend API.
export const moveBook = async (bookId: number, destination: string) => {
  try {
    // Send a PUT request to the API endpoint for moving a book.
    const response = await axios.put(
      `${API_BASE_URL}/books/${bookId}/move`,
      { destination },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the data received from the response (the updated book).
    return response.data;
  } catch (error) {
    // If an error occurs during the request, throw the error for handling elsewhere.
    throw error;
  }
};

// Function to delete a book from the backend API.
export const deleteBook = async (bookId: number) => {
  try {
    // Send a DELETE request to the API endpoint for deleting a book.
    const response = await axios.delete(`${API_BASE_URL}/books/${bookId}`);

    // Return the data received from the response (confirmation of deletion).
    return response.data;
  } catch (error) {
    // If an error occurs during the request, throw the error for handling elsewhere.
    throw error;
  }
};
