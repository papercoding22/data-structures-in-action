import { describe, it, expect } from 'vitest';

import UserDatabase from '../UserDatabase';

describe('UserDatabase', () => {
  it('should add a user to the database', () => {
    const database = new UserDatabase();
    database.addUser({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    });
    expect(database.getUserById(1)).toEqual({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    });
  });

  it('should display all users in the database', () => {
    const database = new UserDatabase();
    database.addUser({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    });
    database.addUser({
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
    });
    database.addUser({
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
    });
    database.displayAllUsers();
    expect(database.getUserById(1)).toEqual({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    });
  });
});
