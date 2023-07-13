'use client'

import { login } from "./LoginForm";

const handleClick = async () => {
  await login({ email: '', senha: '' });
  location.replace('http://localhost:3000/login');
}

const LogoutButton = () => {
  return (
    <button onClick={() => handleClick()} className="w-40 p-4 bg-gray-600 rounded mt-8">
      Fazer Logout
    </button>
  );
}

export default LogoutButton;