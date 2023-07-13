'use client'

import { login } from "./LoginForm";

async function deleteEstudante(pk_matricula: string) {
  const res = await fetch(`http://localhost:3000/api/estudantes`, {
    method: 'DELETE',
    body: JSON.stringify({ pk_matricula }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Erro ao deletar estudante');
 
  return res.json();
}

const handleClick = async (matricula: string) => {
  await login({ email: '', senha: '' });
  await deleteEstudante(matricula);
  location.replace('http://localhost:3000/registrar');
}

const DeleteAccountButton = ({ matricula }: { matricula: string }) => {
  return (
    <button onClick={() => handleClick(matricula)} className="w-40 p-4 bg-red-500 rounded mt-4">
      Excluir conta
    </button>
  );
}

export default DeleteAccountButton;