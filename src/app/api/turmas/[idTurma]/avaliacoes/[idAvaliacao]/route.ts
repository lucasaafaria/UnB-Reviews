import { NextResponse } from 'next/server';
import { queryHandler } from '@/lib/mysql/db-connection';

export async function GET(request: Request, { params }: { params: { idAvaliacao: string }}) {
  try {
    const id = parseInt(params.idAvaliacao);
    const query = `
      SELECT A.*, E.nome_estudante
      FROM Avaliacoes AS A
      JOIN Estudantes AS E ON A.fk_matricula_estud = E.pk_matricula
      WHERE A.pk_id_avaliacao = ?;
    `;
    const values = [id];
    const response = await queryHandler({ query, values });

    return NextResponse.json({ avaliacoes: response });
  } catch (error: any) {
    throw new Error(error.message);
  }
}