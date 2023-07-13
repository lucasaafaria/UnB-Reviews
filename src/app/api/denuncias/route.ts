import { NextResponse } from "next/server";
import { queryHandler } from "@/lib/mysql/db-connection";

export async function GET() {
  try {
    const query = 'SELECT * from denuncias_aprimoradas;';
    const response = await queryHandler({ query });

    return NextResponse.json({ denuncias: response });
  } catch (error: any) {
    throw new Error(error.message);
  }
}