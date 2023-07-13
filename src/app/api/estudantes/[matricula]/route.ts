import { Estudante } from "@/app/registrar/page";
import { queryHandler } from "@/lib/mysql/db-connection";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { matricula: string } }) {
  try {
    const query = 'SELECT * from Estudantes WHERE pk_matricula = ?;';
    const values = [params.matricula];
    const response = await queryHandler({ query, values });

    if (Array.isArray(response) && response.length === 1) {
      const estudante = response[0] as Estudante;
      return NextResponse.json({ estudante });
    }

    return NextResponse.json({ estudante: response });
  } catch (error: any) {
    throw new Error(error.message);
  }
}