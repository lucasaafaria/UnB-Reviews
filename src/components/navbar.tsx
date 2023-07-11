const Navbar = () => {
  return (
    <nav className="bg-emerald-700 text- flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">UnB Reviews</a>
      </div>
      <div>
        <a href="/login" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Login</a>
        <a href="/registrar" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Registrar</a>
      </div>
    </nav>
  );
};

export default Navbar;