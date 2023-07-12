import { Avaliacao } from "../../page";
import UpdateReviewForm from "@/components/UpdateReviewForm";

export async function getAvaliacao(idTurma: string, idAvaliacao: string): Promise<{ avaliacoes: Avaliacao[] }> {
  const res = await fetch(`http://localhost:3000/api/turmas/${idTurma}/avaliacoes/${idAvaliacao}`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Erro ao buscar avaliação');
 
  return res.json();
}

export default async function PaginaAtualizarAvaliacao({ params }: { params: { idTurma: string, idAvaliacao: string } }) {
  const { idTurma, idAvaliacao } = params;
  const { avaliacoes } = await getAvaliacao(idTurma, idAvaliacao);
  const avaliacao = avaliacoes[0] || {} as Avaliacao;
  
  return (
    <main className="flex flex-col items-center mb-3">
      <h2 className='font-semibold text-xl mt-10 mb-4'>Atualizar Review</h2>
      <UpdateReviewForm
        textoOriginal={avaliacao.texto_avaliacao}
        notaOriginal={avaliacao.nota}
        idTurma={idTurma}
        idEstudante="170016668"
        idAvaliacao={idAvaliacao}
      />
    </main>
  )
}