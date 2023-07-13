import { NextResponse } from 'next/server';
import { queryHandler } from '@/lib/mysql/db-connection';
 
export async function GET() {
  try {
    const query = `
      SELECT T.*, P.nome_prof, D.nome_dep, DI.nome_disc
      FROM Turmas AS T
      JOIN Professores AS P ON T.fk_id_prof = P.pk_id_prof
      JOIN Departamentos AS D ON T.fk_codigo_dep = D.pk_codigo_dep
      JOIN Disciplinas AS DI ON T.fk_codigo_disc = DI.pk_codigo_disc;
    `;
    const response = await queryHandler({ query });

    return NextResponse.json({ turmas: response });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function PUT(request: Request) {
  try {
    const { turmaAtualizada } = await request.json();
    const query = 'UPDATE Turmas SET ? WHERE pk_id_turma = ?';
    const values = [turmaAtualizada, turmaAtualizada.pk_id_turma];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function DELETE(request: Request) {
  try {
    const { idTurma } = await request.json();
    const query = 'DELETE FROM Turmas WHERE pk_id_turma = ?';
    const values = [parseInt(idTurma)];
    const response = await queryHandler({ query, values });

    return NextResponse.json(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
}