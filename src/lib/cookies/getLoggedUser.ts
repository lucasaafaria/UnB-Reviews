import { Estudante } from "@/app/registrar/page";
import { cookies } from "next/headers"

const getLoggedUser = async () => {
  const cookie = cookies().get('matriculaLogada');
  const pk_matricula = cookie?.value;

  if (!pk_matricula) return null;

  const res = await fetch(`http://localhost:3000/api/estudantes/${pk_matricula}`, { cache: 'no-store' });
  const { estudante } = await res.json();
  return estudante as Estudante;
}

export default getLoggedUser;