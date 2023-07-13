import getLoggedUser from "@/lib/cookies/getLoggedUser";
import { Fragment } from "react";

const Navbar = async () => {
  const estudante = await getLoggedUser();

  return (
    <nav className="bg-emerald-700 text- flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">UnB Reviews</a>
      </div>
      <div>
        {estudante ? (
          <a href={`/estudantes/${estudante.pk_matricula}`} className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-6">Perfil</a>
        ) : (
          <Fragment>
            <a href="/login" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-6">Login</a>
            <a href="/registrar" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-6">Registrar</a>
          </Fragment>
        )}
        {estudante?.status === 'admin' ? (
          <a href="/denuncias" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-6">Denúncias</a>
        ) : null }
      </div>
    </nav>
  );
};

export default Navbar;