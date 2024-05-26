import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    try {
        const result = await sql`CREATE TABLE IF NOT EXISTS kitchenApp.meals (
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     slug TEXT NOT NULL UNIQUE,
                     title TEXT NOT NULL,
                     image TEXT NOT NULL,
                     summary TEXT NOT NULL,
                     instructions TEXT NOT NULL,
                     creator TEXT NOT NULL,
                     creator_email TEXT NOT NULL
                  );`;
        return NextResponse.json({ result }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}