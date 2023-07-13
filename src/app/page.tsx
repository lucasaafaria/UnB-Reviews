import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Fragment } from 'react';
import UpdateTurma from '@/components/UpdateTurma';
import getLoggedUser from '@/lib/cookies/getLoggedUser';

async function getTurmas(): Promise<{ turmas: Turma[] }> {
  const res = await fetch(`http://localhost:3000/api/turmas`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Erro ao buscar turmas');
 
  return res.json();
}

export type Turma = {
  pk_id_turma: number;
  numero: number;
  periodo: string;
  horario: string;
  vagas_ocupadas: number;
  vagas_totais: number;
  local: string;
  nome_prof: string;
  nome_dep: string;
  nome_disc: string;
}

export default async function Home() {
  const { turmas } = await getTurmas();
  const estudante = await getLoggedUser();
  
  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center mb-3">
        <h1 className="font-bold text-3xl mt-6">Selecione uma turma para ver as reviews</h1>
        {turmas.map((turma) => (
          <div key={turma.pk_id_turma} className="flex flex-col max-w-lg w-full rounded border-2 border-gray-200 p-4 mt-8 relative">
            <Link className='flex flex-col' href={`/turmas/${turma.pk_id_turma}`}>
              <h2 className='font-semibold text-xl underline mb-3'>{turma.nome_disc}</h2>
              <span>Professor(a): {turma.nome_prof}</span>
              <span>Departamento: {turma.nome_dep}</span>
            </Link>
            {estudante?.status === 'admin' ? (
              <UpdateTurma idTurma={turma.pk_id_turma} />
            ) : null }
          </div>
        ))}
      </main>
    </Fragment>
  )
}
