import Image from "next/image";
import Link from "next/link";

type UpdateTurmaProps = {
  idTurma: number;
};

const UpdateTurma = ({ idTurma }: UpdateTurmaProps  ) => {
  return (
    <Link href={`/turmas/${idTurma}/update`}>
      <button className="bg-emerald-500 rounded-full flex items-center justify-center absolute top-3 right-3 p-2">
        <Image
          src="/edit.png"
          width={12}
          height={12}
          alt="Editar Turma"
        />
      </button>
    </Link>
  );
}

export default UpdateTurma;