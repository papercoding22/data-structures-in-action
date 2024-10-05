// Define a Book type
type Book = {
  title: string;
  author: string;
};

// Librarian (hash function) assigns the book to a shelf based on title
class Librarian {
  static hash(bookTitle: string, shelfSize: number): number {
    let hash = 0;
    for (let i = 0; i < bookTitle.length; i++) {
      hash += bookTitle.charCodeAt(i);
    }
    return hash % shelfSize; // Return shelf index based on hash
  }
}

// Library (hash table) with dynamic resizing of shelves
class UniversityLibrary {
  private shelves: Map<number, Book[]> = new Map(); // Hash table (shelves)
  private shelfCapacity: number; // Capacity of each shelf
  private numShelves: number; // Number of shelves

  constructor(shelfCapacity: number, initialShelves: number) {
    this.shelfCapacity = shelfCapacity;
    this.numShelves = initialShelves;
    this.initializeShelves();
  }

  // Initialize the shelves
  private initializeShelves() {
    for (let i = 0; i < this.numShelves; i++) {
      this.shelves.set(i, []);
    }
  }

  // Add a book to the library
  public donateBook(book: Book): void {
    const shelfIndex = Librarian.hash(book.title, this.numShelves);
    const shelf = this.shelves.get(shelfIndex)!;

    // Check if the shelf is full
    if (shelf.length >= this.shelfCapacity) {
      console.log(`Shelf ${shelfIndex} is full! Buying new shelves...`);
      this.reorganizeLibrary();
      return this.donateBook(book); // Reattempt to add the book after reorganizing
    }

    // Store the book in the assigned shelf
    shelf.push(book);
    console.log(
      `Added "${book.title}" by ${book.author} to shelf ${shelfIndex}.`,
    );
  }

  // Reorganize the library by buying new shelves and reassigning books
  private reorganizeLibrary() {
    const oldBooks: Book[] = [];

    // Collect all books from the old shelves
    for (let [_, shelf] of this.shelves) {
      oldBooks.push(...shelf);
    }

    // Double the number of shelves
    this.numShelves *= 2;
    this.initializeShelves(); // Create new shelves

    // Reassign all books to the new shelves
    for (const book of oldBooks) {
      this.donateBook(book);
    }
    console.log('Reorganized the library with more shelves.');
  }

  // Reorganize the library when removing a shelf
  private reorganizeLibraryAfterRemoval() {
    const oldBooks: Book[] = [];

    // Collect all books from the old shelves
    for (let [_, shelf] of this.shelves) {
      oldBooks.push(...shelf);
    }

    // Halve the number of shelves
    this.numShelves /= 2;
    this.initializeShelves(); // Create new shelves

    // Reassign all books to the new shelves
    for (const book of oldBooks) {
      this.donateBook(book);
    }
    console.log('Reorganized the library with fewer shelves.');
  }

  // Find a book by title
  public findBook(bookTitle: string): Book | undefined {
    const shelfIndex = Librarian.hash(bookTitle, this.numShelves);
    const shelf = this.shelves.get(shelfIndex)!;

    return shelf.find(book => book.title === bookTitle);
  }

  public removeBook(bookTitle: string): void {
    const shelfIndex = Librarian.hash(bookTitle, this.numShelves);
    const shelf = this.shelves.get(shelfIndex)!;

    const bookIndex = shelf.findIndex(book => book.title === bookTitle);
    if (bookIndex !== -1) {
      shelf.splice(bookIndex, 1);
      console.log(`Removed "${bookTitle}" from shelf ${shelfIndex}.`);
      if (shelf.length === 0) {
        console.log(`Shelf ${shelfIndex} is empty.`);
        // Remove the shelf if it's empty
        this.shelves.delete(shelfIndex);
        this.reorganizeLibraryAfterRemoval();
      }
    } else {
      console.log(`"${bookTitle}" not found in the library.`);
    }
  }

  public getShelves(): Map<number, Book[]> {
    return this.shelves;
  }

  public getShelfCapacity(): number {
    return this.shelfCapacity;
  }
}

export default UniversityLibrary;
