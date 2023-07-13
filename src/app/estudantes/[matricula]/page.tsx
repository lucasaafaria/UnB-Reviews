import { Estudante } from "@/app/registrar/page";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/Navbar";
import UpdateUserForm from "@/components/UpdateUserForm";
import getLoggedUser from "@/lib/cookies/getLoggedUser";
import { Fragment } from "react";

export default async function PaginaPerfil() {
  const estudante = await getLoggedUser();

  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mt-6 mb-8">Meu Perfil</h1>
        <UpdateUserForm estudante={estudante || {} as Estudante} />
        <LogoutButton />
        <DeleteAccountButton matricula={estudante?.pk_matricula || '' } />
      </main>
    </Fragment>
  );
};
