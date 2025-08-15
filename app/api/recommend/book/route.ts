import { db } from "@/lib/db";
import { books } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const allBooks = await db.select().from(books);
  const random = allBooks[Math.floor(Math.random() * allBooks.length)];
  return NextResponse.json(random);
}
