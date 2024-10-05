import { describe, it, expect } from 'vitest';

import UniversityLibrary from '../university-library';

describe('UniversityLibrary', () => {
  it('should add a book to the library', () => {
    const library = new UniversityLibrary(2, 1);
    library.donateBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });
    expect(library.findBook('The Great Gatsby')).toEqual({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });
  });

  it('should reorganize the library when a shelf is full', () => {
    const library = new UniversityLibrary(2, 1);
    library.donateBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });
    library.donateBook({
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
    });

    // Add one more book to trigger reorganization
    library.donateBook({
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
    });

    // Check if the book was added
    expect(library.findBook('To Kill a Mockingbird')).toEqual({
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
    });

    // Check if the library was reorganized
    expect(library.findBook('The Great Gatsby')).toEqual({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });

    expect(library.findBook('The Catcher in the Rye')).toEqual({
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
    });
  });

  it('should maintain only one shelf for 2 books', () => {
    const library = new UniversityLibrary(2, 1);
    library.donateBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });
    library.donateBook({
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
    });

    expect(library.getShelves().size).toBe(1);
  });

  it('should create a new shelf when the number of donated books exceeds the current shelf capacity', () => {
    const library = new UniversityLibrary(2, 1);
    library.donateBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });
    library.donateBook({
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
    });
    library.donateBook({
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
    });
    library.donateBook({
      title: '1984',
      author: 'George Orwell',
    });
    expect(library.getShelves().size).toBe(2);
  });

  it('should only maintain one shelf when remove all books, except the first one', () => {
    const library = new UniversityLibrary(2, 1);
    library.donateBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });
    library.donateBook({
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
    });
    library.donateBook({
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
    });
    library.donateBook({
      title: '1984',
      author: 'George Orwell',
    });
    expect(library.getShelves().size).toBe(2);

    // Then remove all books, except the first one
    library.removeBook('1984');
    library.removeBook('To Kill a Mockingbird');
    library.removeBook('The Catcher in the Rye');
    expect(library.getShelves().size).toBe(1);
    expect(library.findBook('The Great Gatsby')).toEqual({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    });
  });
});
