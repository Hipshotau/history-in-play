import { db } from "@/lib/db";
import { boardgames } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const allGames = await db.select().from(boardgames);
  const random = allGames[Math.floor(Math.random() * allGames.length)];
  return NextResponse.json(random);
}
