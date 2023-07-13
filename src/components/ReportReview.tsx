import Image from "next/image";
import Link from "next/link";

const ReportReview = () => {
  return (
    <Link href="">
      <button className="bg-emerald-500 rounded-full flex items-center justify-center absolute top-3 right-4 p-2">
        <Image
          src="/warning.png"
          width={12}
          height={12}
          alt="Denunciar Review"
        />
      </button>
    </Link>
  );
}

export default ReportReview;