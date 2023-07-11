import { NextResponse } from 'next/server';
import { queryHandler } from '@/lib/mysql/db-connection';
 
export async function GET() {
  try {
    const query = 'SELECT * from Estudantes';
    const response = await queryHandler({ query });

    return NextResponse.json({ estudantes: response });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function POST(request: Request) {
  try {
    const { estudante } = await request.json();
    const query = 'INSERT INTO Estudantes SET ?';
    const values = [estudante];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function PUT(request: Request) {
  try {
    const { estudanteAtualizado } = await request.json();
    const query = 'UPDATE Estudantes SET ? WHERE pk_matricula = ?';
    const values = [estudanteAtualizado, estudanteAtualizado.pk_matricula];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function DELETE(request: Request) {
  try {
    const { pk_matricula } = await request.json();
    const query = 'DELETE FROM Estudantes WHERE pk_matricula = ?';
    const values = [pk_matricula];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}