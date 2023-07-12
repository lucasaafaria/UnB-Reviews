import { NextResponse } from 'next/server';
import { queryHandler } from '@/lib/mysql/db-connection';

export async function GET(request: Request, { params }: { params: { idTurma: string }}) {
  try {
    const id = parseInt(params.idTurma);
    const query = `
      SELECT A.*, E.nome_estudante
      FROM Avaliacoes AS A
      JOIN Estudantes AS E ON A.fk_matricula_estud = E.pk_matricula
      WHERE A.fk_id_turma = ?;
    `;
    const values = [id];
    const response = await queryHandler({ query, values });

    return NextResponse.json({ avaliacoes: response });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function POST(request: Request) {
  try {
    const { avaliacao } = await request.json();
    const query = 'INSERT INTO Avaliacoes SET ?;';
    const values = [avaliacao];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function PUT(request: Request) {
  try {
    const { avaliacaoAtualizada } = await request.json();
    const query = 'UPDATE Avaliacoes SET ? WHERE pk_id_avaliacao = ?';
    const values = [avaliacaoAtualizada, avaliacaoAtualizada.pk_id_avaliacao];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function DELETE(request: Request) {
  try {
    const { pk_id_avaliacao } = await request.json();
    const query = 'DELETE FROM Avaliacoes WHERE pk_id_avaliacao = ?';
    const values = [pk_id_avaliacao];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}