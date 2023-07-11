import { Estudante } from "./registrar/page";

async function getEstudantes() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/estudantes`);

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

async function getEstudanteByMatricula(pk_matricula: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/estudantes/${pk_matricula}`);

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

async function updateEstudante(estudanteAtualizado: Estudante) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/estudantes`, {
    method: 'PUT',
    body: JSON.stringify({ estudanteAtualizado })
  });

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

async function deleteEstudante(pk_matricula: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/estudantes`, {
    method: 'DELETE',
    body: JSON.stringify({ pk_matricula })
  });

  if (!res.ok) throw new Error('Failed to fetch data');
 
  return res.json();
}

export default async function Home() {
  const { estudantes } = await getEstudantes();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  )
}
