'use client'

async function deleteTurma(idTurma: string) {
  const res = await fetch(`http://localhost:3000/api/estudantes`, {
    method: 'DELETE',
    body: JSON.stringify({ idTurma }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Erro ao deletar estudante');
 
  return res.json();
}

const handleClick = async (idTurma: string) => {
  await deleteTurma(idTurma);
  location.replace('http://localhost:3000/');
}

const DeleteTurmaButton = ({ idTurma }: { idTurma: string }) => {
  return (
    <button onClick={() => handleClick(idTurma)} className="w-40 p-4 bg-red-500 rounded mt-4 mb-5">
      Excluir Turma
    </button>
  );
}

export default DeleteTurmaButton;