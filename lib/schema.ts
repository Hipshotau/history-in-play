import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  unique,
} from 'drizzle-orm/sqlite-core'

// ----------------------------------------
// Roles
// ----------------------------------------

export const roles = sqliteTable('roles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
})

// ----------------------------------------
// Users
// ----------------------------------------

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  role_id: integer('role_id').references(() => roles.id), // Nullable by default
  xp: integer('xp').default(0),
  avatar_url: text('avatar_url'), // Optional
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
})

// ----------------------------------------
// Events (Historical)
// ----------------------------------------

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  date: text('date'), // Optional
  location: text('location'), // Optional
  description: text('description'), // Optional
})

// ----------------------------------------
// Books
// ----------------------------------------

export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  author: text('author'), // Optional
  publication_year: integer('publication_year'), // Optional
  event_id: integer('event_id').references(() => events.id), // Optional
  description: text('description'), // Optional
  cover_url: text('cover_url'), // Optional
  amazon_link: text('amazon_link'), // Optional
})

// ----------------------------------------
// BoardGames
// ----------------------------------------

export const boardgames = sqliteTable('boardgames', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  designer: text('designer'), // Optional
  publisher: text('publisher'), // Optional
  year_published: integer('year_published'), // Optional
  event_id: integer('event_id').references(() => events.id), // Optional
  description: text('description'), // Optional
  cover_url: text('cover_url'), // Optional
  bgg_id: integer('bgg_id'), // Optional
  is_verified_wargame: integer('is_verified_wargame', { mode: 'boolean' }).default(false),
  amazon_link: text('amazon_link'), // Optional
})

// ----------------------------------------
// Questions (Community Q&A)
// ----------------------------------------

export const questions = sqliteTable('questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  user_id: integer('user_id').references(() => users.id), // Optional
  event_id: integer('event_id').references(() => events.id), // Optional
  title: text('title').notNull(),
  body: text('body'), // Optional
  is_approved: integer('is_approved', { mode: 'boolean' }).default(false),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
})
