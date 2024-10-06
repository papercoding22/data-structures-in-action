// User interface defining the structure of a user record
interface User {
	id: number; // Unique identifier
	name: string; // User's name
	email: string; // User's email
}

/**
 * @author: Paper Coding
 * @description:
 * - Leveraging Hash Table to store user records
 * - Hash Table helps in quick retrieval of user records by ID
 * - Time complexity of retrieval is O(1)
 */

// Class representing the database with a hash table for indexing
class UserDatabase {
	private userIndex: Map<number, User>; // Hash table using Map

	constructor() {
			this.userIndex = new Map<number, User>();
	}

	// Method to add a new user to the database
	addUser(user: User): void {
			this.userIndex.set(user.id, user);
			console.log(`User added: ${JSON.stringify(user)}`);
	}

	// Method to retrieve a user by ID
	getUserById(userId: number): User | undefined {
			const user = this.userIndex.get(userId);
			if (user) {
					console.log(`User retrieved: ${JSON.stringify(user)}`);
					return user;
			} else {
					console.log(`User with ID ${userId} not found.`);
					return undefined;
			}
	}

	// Method to display all users in the database
	displayAllUsers(): void {
			console.log("All users in the database:");
			this.userIndex.forEach((user) => {
					console.log(JSON.stringify(user));
			});
	}
}

export default UserDatabase;