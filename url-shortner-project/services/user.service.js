import { db } from '../db/db_index.js';
import { usersTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email) {

    const [existingUser] = await db
        .select({
            id: usersTable.id,
            firstname: usersTable.first_name,
            lastname: usersTable.last_name,
            email: usersTable.email,
            salt: usersTable.salt,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email));

        return existingUser ;
}