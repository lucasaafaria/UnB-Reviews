import { Estudante } from "@/app/registrar/page";
import { queryHandler } from "@/lib/mysql/db-connection";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let loginStatus = false;
    const { email, senha } = await request.json();
    const query = 'SELECT * from Estudantes WHERE email = ? AND senha = ?;';
    const values = [email, senha];
    const response = await queryHandler({ query, values });

    if (Array.isArray(response) && response.length === 1) {
      loginStatus = true;
      const { pk_matricula } = response[0] as Estudante;
      cookies().set('matriculaLogada', pk_matricula);
    }

    return NextResponse.json({ loginStatus, estudante: response });
  } catch (error: any) {
    throw new Error(error.message);
  }
}