// Define an interface named 'Book' to represent book objects.
export interface Book {
  // 'id' is a unique identifier for the book, typically a number.
  id: number;

  // 'title' is a string that represents the title of the book.
  title: string;

  // 'state' is a string that represents the state or status of the book.
  // This could be used to indicate whether the book is in progress, completed, or some other state.
  state: string;
}
