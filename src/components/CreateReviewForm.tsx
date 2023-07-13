'use client'

import * as Yup from 'yup';
import { Avaliacao } from "@/app/turmas/[idTurma]/page";
import { useRouter } from 'next/navigation';
import { Field, Form, Formik, FormikProps } from 'formik';

async function createAvaliacao(avaliacao: Partial<Avaliacao>, idTurma: string) {
  const res = await fetch(`http://localhost:3000/api/turmas/${idTurma}/avaliacoes`, {
    method: 'POST',
    body: JSON.stringify({ avaliacao }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Não foi possível criar a avaliação');
 
  return res.json();
}

type FormValues = {
  texto: string;
  nota: string;
}

type CreateReviewFormProps = {
  idTurma: string;
  matricula: string;
}

const ReviewSchema = Yup.object().shape({
  texto: Yup.string().required('Campo Obrigatório'),
  nota: Yup.string().required('Campo Obrigatório'),
});

export default function CreateReviewForm({ idTurma, matricula }: CreateReviewFormProps) {
  const router = useRouter();
  const fieldClassName = 'mt-1 mb-2 p-2 rounded-l text-gray-800';

  return (
    <Formik
      initialValues={{
        texto: '',
        nota: '',
      }}
      validationSchema={ReviewSchema}
      onSubmit={async (values) => {
        const avaliacao = {
          texto_avaliacao: values.texto,
          fk_id_turma: parseInt(idTurma),
          fk_matricula_estud: matricula,
          nota: parseInt(values.nota),
        };
        const response = await createAvaliacao(avaliacao, idTurma);
        if (response.affectedRows === 1) router.push(`/turmas/${idTurma}`);
      }}
    >
      {({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
        <Form className="flex flex-col w-full max-w-xs mx-auto">
          <label htmlFor="nota">Nota</label>
          <Field className={fieldClassName} name="nota" placeholder="" as="select" >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Field>
          {errors.nota && touched.nota ? (
            <div className="text-red-400 text-xs mb-3">{errors.nota}</div>
          ) : null}

          <label htmlFor="texto">Comentário</label>
          <Field className={fieldClassName} name="texto" placeholder="Excelente disciplina" as="textarea" />
          {errors.texto && touched.texto ? (
            <div className="text-red-400 text-xs mb-3">{errors.texto}</div>
          ) : null}

          <button className="rounded bg-emerald-500 p-3 mt-4" type="submit" disabled={isSubmitting}>
            Enviar Review
          </button>
        </Form>
      )}
    </Formik>
  );
};
