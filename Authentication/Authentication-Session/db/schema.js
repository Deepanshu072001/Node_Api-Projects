import { uuid, pgTable, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN'])

export const  usersTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255}).notNull(),
    email: varchar({ length: 255}).notNull().unique(),
    role: userRoleEnum().notNull().default('USER'),
    password: text().notNull(),
    salt: text().notNull(), //--> salt : it is a password hashing type which converts the plain/text password into some random string. 
});

export const userSessions = pgTable('user_sessions', {
    id:  uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => usersTable.id).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});