import Image from "next/image";
import Link from "next/link";

type UpdateReviewProps = {
  idReview: number;
  idTurma: number;
};

const UpdateReview = ({ idReview, idTurma }: UpdateReviewProps  ) => {
  return (
    <Link href={`/turmas/${idTurma}/avaliacoes/${idReview}`}>
      <button className="bg-emerald-500 rounded-full flex items-center justify-center absolute top-3 right-12 p-2">
        <Image
          src="/edit.png"
          width={12}
          height={12}
          alt="Editar Review"
        />
      </button>
    </Link>
  );
}

export default UpdateReview;