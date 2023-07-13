import { Fragment } from "react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

const PaginaLogin = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mt-6 mb-8">Login</h1>
        <LoginForm />
      </main>
    </Fragment>
  );
}

export default PaginaLogin;