import { Fragment } from "react";
import Navbar from "@/components/Navbar";
import CreateReviewForm from "@/components/CreateReviewForm";
import getLoggedUser from "@/lib/cookies/getLoggedUser";

export default async function PaginaEscreverAvaliacao({ params }: { params: { idTurma: string } }) {
  const { idTurma } = params;
  const estudante = await getLoggedUser();
  
  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center mb-3">
        <h2 className='font-semibold text-xl mt-10 mb-4'>Nova Review</h2>
        <CreateReviewForm 
          idTurma={idTurma}
          matricula={estudante?.pk_matricula || ''}
        />
      </main>
    </Fragment>
  )
}