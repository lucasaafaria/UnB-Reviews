import Link from 'next/link';
import { Turma } from "@/app/page";
import DeleteReview from '@/components/DeleteReview';
import UpdateReview from '@/components/UpdateReview';
import ReportReview from '@/components/ReportReview';
import { Fragment } from 'react';
import Navbar from '@/components/Navbar';

export async function getTurma(idTurma: string): Promise<{ turmas: Turma[] }> {
  const res = await fetch(`http://localhost:3000/api/turmas/${idTurma}`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Erro ao buscar turma');
 
  return res.json();
}

async function getAvaliacoesByTurma(idTurma: string): Promise<{ avaliacoes: Avaliacao[] }> {
  const res = await fetch(`http://localhost:3000/api/turmas/${idTurma}/avaliacoes`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Erro ao buscar avaliações desta turma');
 
  return res.json();
}

export type Avaliacao = {
  pk_id_avaliacao: number;
  texto_avaliacao: string;
  nome_estudante: string;
  nota: number;
}

export default async function PaginaTurma({ params }: { params: { idTurma: string } }) {
  const { idTurma } = params;
  const { turmas } = await getTurma(idTurma);
  const turma = turmas[0] || {};

  const { avaliacoes } = await getAvaliacoesByTurma(idTurma);
  
  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center mb-3">
        <h1 className="font-bold text-3xl mt-6 mb-5">{turma.nome_disc}</h1>
        <span>Turma {turma.numero}</span>
        <span>Horário das aulas: {turma.horario}</span>
        <span>Vagas ocupadas: {turma.vagas_ocupadas}/{turma.vagas_totais}</span>
        <span>Local: {turma.local}</span>
        <span>Professor(a): {turma.nome_prof}</span>
        <span>Departamento: {turma.nome_dep}</span>

        <div className='flex justify-center relative'>
          <h2 className='font-semibold text-xl mt-10'>Reviews</h2>
          <Link className='absolute bottom-1 -right-10' href={`/turmas/${idTurma}/avaliacoes`}>
            <button className='rounded-full bg-emerald-500 w-6 h-6 font-bold text-lg flex items-center justify-center leading-none'>+</button>
          </Link>
        </div>

        {avaliacoes.map(avaliacao => (
          <div key={avaliacao.pk_id_avaliacao} className="flex flex-col max-w-lg w-full rounded border-2 border-gray-200 p-4 mt-6 relative">
            <h3 className='text-lg font-semibold mb-3'>Nota: {avaliacao.nota}/10</h3>
            <span>{avaliacao.texto_avaliacao}</span>
            <span className='text-sm mt-2'>Autor(a): {avaliacao.nome_estudante}</span>
            <UpdateReview idTurma={turma.pk_id_turma} idReview={avaliacao.pk_id_avaliacao} />
            <DeleteReview idTurma={turma.pk_id_turma} idReview={avaliacao.pk_id_avaliacao} />
            <ReportReview />
          </div>
        ))}

        <Link href="/">
          <button className='rounded bg-emerald-500 p-4 mt-8'>
            Voltar à lista de turmas
          </button>
        </Link>

      </main>
    </Fragment>
  )
}
