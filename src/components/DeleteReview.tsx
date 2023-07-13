'use client'

import Image from "next/image";

type DeleteReviewProps = {
  idReview: number;
  idTurma: number;
}

async function deleteReview(pk_id_avaliacao: number, idTurma: number) {
  const res = await fetch(`http://localhost:3000/api/turmas/${idTurma}/avaliacoes`, {
    method: 'DELETE',
    body: JSON.stringify({ pk_id_avaliacao }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Não foi possível deletar o comentário');
 
  return res.json();
}

const handleClick = async ({ idReview, idTurma }: DeleteReviewProps) => {
  const response = await deleteReview(idReview, idTurma);
  if (response.affectedRows === 1) location.reload();
}

const DeleteReview = ({ idReview, idTurma }: DeleteReviewProps  ) => {
  return (
    <button onClick={() => handleClick({ idReview, idTurma })} className="bg-emerald-500 rounded-full flex items-center justify-center absolute top-3 right-20 p-2">
      <Image
        src="/trash.png"
        width={12}
        height={12}
        alt="Deletar Review"
      />
    </button>
  );
}

export default DeleteReview;