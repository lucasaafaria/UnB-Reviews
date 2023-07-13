import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Fragment } from "react";

async function getDenuncias(): Promise<{ denuncias: Denuncia[] }> {
  const res = await fetch(`http://localhost:3000/api/denuncias`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Erro ao buscar denúncias');

  return res.json();
}

type Denuncia = {
  pk_id_denuncia: number;
  texto_denuncia: string;
  nome_estudante: string;
  texto_avaliacao: string;
  nota: number;
  nome_disc: string; 
}

export default async function PaginaDenuncias() {
  const { denuncias } = await getDenuncias();

  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center mb-3">
        <h1 className="font-bold text-3xl mt-6">Denúncias de Avaliações</h1>
        {denuncias.map((denuncia) => (
          <div key={denuncia.pk_id_denuncia} className="flex flex-col max-w-lg w-full rounded border-2 border-gray-200 p-4 mt-8">
            <span>Comentário do denunciante: &quot;{denuncia.texto_denuncia}&quot;</span>
            <p>Review denunciada:</p>
            <div className="flex flex-col w-full rounded border border-gray-200 p-2">
              <span>Nota: {denuncia.nota}</span>
              <span>Comentário: {denuncia.texto_avaliacao}</span>
              <span>Autor(a): {denuncia.nome_estudante}</span>
            </div>
          </div>
        ))}

        <Link href="/">
          <button className='rounded bg-emerald-500 p-4 mt-8'>
            Voltar à lista de turmas
          </button>
        </Link>
      </main>
    </Fragment>
  );
};
