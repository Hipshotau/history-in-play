import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  unique,
} from 'drizzle-orm/sqlite-core';

// ----------------------------------------
// Users & Roles
// ----------------------------------------

export const roles = sqliteTable('roles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // e.g. 'admin', 'member', 'moderator', 'developer', 'playtester'
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  role_id: integer('role_id').references(() => roles.id),
  xp: integer('xp').default(0),
  avatar_url: text('avatar_url'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

// ----------------------------------------
// Books
// ----------------------------------------

export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  author: text('author'),
  publication_year: integer('publication_year'),
  event_id: integer('event_id').references(() => events.id),
  description: text('description'),
  cover_url: text('cover_url'),
  amazon_link: text('amazon_link'),
});

// ----------------------------------------
// BoardGames
// ----------------------------------------

export const boardgames = sqliteTable('boardgames', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  designer: text('designer'),
  publisher: text('publisher'),
  year_published: integer('year_published'),
  event_id: integer('event_id').references(() => events.id),
  description: text('description'),
  cover_url: text('cover_url'),
  bgg_id: integer('bgg_id'),
  is_verified_wargame: integer('is_verified_wargame', { mode: 'boolean' }).default(false),
  amazon_link: text('amazon_link'),
});


// Events (Historical)

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  date: text('date'), // Use ISO format
  location: text('location'),
  description: text('description'),
});

// ----------------------------------------
// Questions (Community Q&A)
// ----------------------------------------

export const questions = sqliteTable('questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  user_id: integer('user_id').references(() => users.id),
  event_id: integer('event_id').references(() => events.id),
  title: text('title').notNull(),
  body: text('body'),
  is_approved: integer('is_approved', { mode: 'boolean' }).default(false),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});
