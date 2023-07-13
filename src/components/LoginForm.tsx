'use client'

import { Estudante } from "@/app/registrar/page";
import { Formik, Form, Field, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';

type FormValues = {
  email: string;
  senha: string;
};

export const login = async ({ email, senha }: FormValues): Promise<{ loginStatus: boolean, estudante: Estudante }> => {
  const res = await fetch(`http://localhost:3000/api/estudantes/login`, {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Erro ao fazer login');

  return res.json();
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Endereço de email inválido')
    .required('Campo Obrigatório'),
  senha: Yup.string().required('Campo Obrigatório'),
});

export default function LoginForm() {
  const router = useRouter();
  const fieldClassName = 'mt-1 mb-2 p-2 rounded-l text-gray-800';

  return (
    <Formik
      initialValues={{
        email: '',
        senha: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        document.querySelector('#loginErrorMessage')?.classList.add('hidden');

        const loginData = {
          email: values.email,
          senha: values.senha,
        };
        const { loginStatus } = await login(loginData);

        if (loginStatus) router.push('/');
        else document.querySelector('#loginErrorMessage')?.classList.remove('hidden');
      }}
    >
      {({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
        <Form className="flex flex-col w-full max-w-xs mx-auto">
          <label htmlFor="email">Email</label>
          <Field className={fieldClassName} name="email" placeholder="aluno@unb.br" type="email" />
          {errors.email && touched.email ? (
            <div className="text-red-400 text-xs mb-3">{errors.email}</div>
          ) : null}

          <label htmlFor="senha">Senha</label>
          <Field className={fieldClassName} name="senha" placeholder="*******" type="password" />
          {errors.senha && touched.senha ? (
            <div className="text-red-400 text-xs mb-3">{errors.senha}</div>
          ) : null}

          <span id="loginErrorMessage" className="text-red-400 text-xs mt-3 mb-1 hidden">Email ou senha incorretos</span>
          <button className="rounded bg-emerald-500 p-3 mt-4" type="submit" disabled={isSubmitting}>
            Entrar
          </button>
        </Form>
      )}
    </Formik>
  );
};