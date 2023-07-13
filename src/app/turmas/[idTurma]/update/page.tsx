import Navbar from "@/components/Navbar";
import { Fragment } from "react";
import { getTurma } from "../page";
import UpdateTurmaForm, { TurmaCompleto } from "@/components/UpdateTurmaForm";
import DeleteTurmaButton from "@/components/DeleteTurmaButton";

export default async function PaginaUpdateTurma({ params }: { params: { idTurma: string } }) {
  const { idTurma } = params;
  const { turmas } = await getTurma(idTurma);
  const turma = (turmas[0] as unknown) as TurmaCompleto || {} as TurmaCompleto

  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mt-6 mb-8">Editar Turma</h1>
        <UpdateTurmaForm turma={turma} idTurma={idTurma} />
        <DeleteTurmaButton idTurma={idTurma} />
      </main>
    </Fragment>
  );
};
