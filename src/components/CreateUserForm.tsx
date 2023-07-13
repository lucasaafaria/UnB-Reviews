'use client'

import { useRouter } from "next/navigation";
import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from 'yup';
import { Estudante } from "@/app/registrar/page";
import { login } from "./LoginForm";

type FormValues = {
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  curso: string;
  file: Blob;
};

async function createEstudante(estudante: Estudante) {
  const res = await fetch(`http://localhost:3000/api/estudantes`, {
    method: 'POST',
    body: JSON.stringify({ estudante }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Não foi possível criar este usuário');
 
  return res.json();
}

const SignupSchema = Yup.object().shape({
  matricula: Yup.string()
    .min(9, 'Matrícula precisa ter 9 dígitos')
    .max(9, 'Matrícula precisa ter 9 dígitos')
    .required('Campo Obrigatório'),
  nome: Yup.string()
    .max(255, 'Número máximo de caracteres excedido')
    .required('Campo Obrigatório'),
  email: Yup.string()
    .email('Endereço de email inválido')
    .required('Campo Obrigatório'),
  senha: Yup.string()
    .max(20, 'Sua senha deve ter no máximo 20 caracteres')
    .required('Campo Obrigatório'),
  curso: Yup.string().max(255, 'Número máximo de caracteres excedido')
});

export default function CreateUserForm() {
  const router = useRouter();
  const fieldClassName = 'mt-1 mb-2 p-2 rounded-l text-gray-800';

  return (
    <Formik
      initialValues={{
        matricula: '',
        nome: '',
        email: '',
        senha: '',
        curso: '',
        file: {} as Blob,
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        const estudante = {
          pk_matricula: values.matricula,
          nome_estudante: values.nome,
          email: values.email,
          senha: values.senha,
          curso: values.curso,
          foto_perfil: values.file,
          status: 'usuario'
        };
        const response = await createEstudante(estudante);
        if (response.affectedRows === 1) {
          await login({ email: values.email, senha: values.senha });
          router.push('/');
        };
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }: FormikProps<FormValues>) => (
        <Form className="flex flex-col w-full max-w-xs mx-auto">
          <label htmlFor="matricula">Matrícula</label>
          <Field className={fieldClassName} name="matricula" placeholder="123456789" />
          {errors.matricula && touched.matricula ? (
            <div className="text-red-400 text-xs mb-3">{errors.matricula}</div>
          ) : null}

          <label htmlFor="nome">Nome</label>
          <Field className={fieldClassName} name="nome" placeholder="Elsmari" />
          {errors.nome && touched.nome ? (
            <div className="text-red-400 text-xs mb-3">{errors.nome}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <Field className={fieldClassName} name="email" placeholder="aluno@unb.br" type="email" />
          {errors.email && touched.email ? (
            <div className="text-red-400 text-xs mb-3">{errors.email}</div>
          ) : null}


          <label htmlFor="curso">Curso</label>
          <Field className={fieldClassName} name="curso" placeholder="Ciência da Computação"/>
          {errors.curso && touched.curso ? (
            <div className="text-red-400 text-xs mb-3">{errors.curso}</div>
          ) : null}
          
          <label htmlFor="senha">Senha</label>
          <Field className={fieldClassName} name="senha" placeholder="*******" type="password" />
          {errors.senha && touched.senha ? (
            <div className="text-red-400 text-xs mb-3">{errors.senha}</div>
          ) : null}

          <label htmlFor="foto">Foto de Perfil</label>
          <input id="foto" name="foto" type="file" onChange={(event) => {
            setFieldValue("file", event.currentTarget.files?.[0]);
          }} />

          <button className="rounded bg-emerald-500 p-3 mt-4" type="submit" disabled={isSubmitting}>
            Fazer Registro
          </button>
        </Form>
      )}
    </Formik>
  );
};