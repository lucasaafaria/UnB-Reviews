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