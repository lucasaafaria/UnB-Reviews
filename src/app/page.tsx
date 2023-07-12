import Link from 'next/link';
import { Estudante } from "./registrar/page";

async function getEstudantes() {
  const res = await fetch(`http://localhost:3000/api/estudantes`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

async function getEstudanteByMatricula(pk_matricula: string) {
  const res = await fetch(`http://localhost:3000/api/estudantes/${pk_matricula}`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

async function updateEstudante(estudanteAtualizado: Estudante) {
  const res = await fetch(`http://localhost:3000/api/estudantes`, {
    method: 'PUT',
    body: JSON.stringify({ estudanteAtualizado }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

async function deleteEstudante(pk_matricula: string) {
  const res = await fetch(`http://localhost:3000/api/estudantes`, {
    method: 'DELETE',
    body: JSON.stringify({ pk_matricula }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

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
  
  return (
    <main className="flex flex-col items-center mb-3">
      <h1 className="font-bold text-3xl mt-6">Selecione uma turma para ver as reviews</h1>
      {turmas.map((turma) => (
        <div key={turma.pk_id_turma} className="flex flex-col max-w-lg w-full rounded border-2 border-gray-200 p-4 mt-8">
          <Link className='flex flex-col' href={`/turmas/${turma.pk_id_turma}`}>
            <h2 className='font-semibold text-xl underline'>{turma.nome_disc}</h2>
            <span>Turma {turma.numero}</span>
            <span>Horário das aulas: {turma.horario}</span>
            <span>Vagas ocupadas: {turma.vagas_ocupadas}/{turma.vagas_totais}</span>
            <span>Local: {turma.local}</span>
            <span>Professor(a): {turma.nome_prof}</span>
            <span>Departamento: {turma.nome_dep}</span>
          </Link>
        </div>
      ))}
    </main>
  )
}
