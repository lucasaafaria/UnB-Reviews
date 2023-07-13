import CreateUserForm from "@/components/CreateUserForm";
import Navbar from "@/components/Navbar";
import { Fragment } from "react";

export type Estudante = {
  pk_matricula: string;
  nome_estudante: string;
  email: string;
  senha: string;
  curso: string;
  foto_perfil: Blob;
  status: string;
}

const PaginaRegistrar = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mt-6 mb-8">Registrar</h1>
        <CreateUserForm />
      </main>
    </Fragment>
  );
}

export default PaginaRegistrar;