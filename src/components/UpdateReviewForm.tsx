'use client'

import { Formik, Form, Field, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';

type Avaliacao = {
  pk_id_avaliacao: number;
  texto_avaliacao: string;
  nota: number;
}

type FormValues = {
  texto: string;
  nota: string;
}

type UpdateReviewFormProps = {
  textoOriginal: string;
  notaOriginal: number;
  idTurma: string;
  idAvaliacao: string;
}

async function updateAvaliacao(avaliacaoAtualizada: Partial<Avaliacao>, idTurma: string) {
  const res = await fetch(`http://localhost:3000/api/turmas/${idTurma}/avaliacoes`, {
    method: 'PUT',
    body: JSON.stringify({ avaliacaoAtualizada }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Não foi possível atualizar a avaliação');
 
  return res.json();
}

const ReviewSchema = Yup.object().shape({
  texto: Yup.string().required('Campo Obrigatório'),
  nota: Yup.string().required('Campo Obrigatório'),
});

export default function UpdateReviewForm({ textoOriginal, notaOriginal, idTurma, idAvaliacao }: UpdateReviewFormProps) {
  const router = useRouter();
  const fieldClassName = 'mt-1 mb-2 p-2 rounded-l text-gray-800';
  
  return (
    <Formik
      initialValues={{
        texto: textoOriginal,
        nota: `${notaOriginal}`,
      }}
      validationSchema={ReviewSchema}
      onSubmit={async (values) => {
        const avaliacao = {
          pk_id_avaliacao: parseInt(idAvaliacao),
          texto_avaliacao: values.texto,
          nota: parseInt(values.nota),
        };
        const response = await updateAvaliacao(avaliacao, idTurma);
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
            Atualizar Review
          </button>
        </Form>
      )}
    </Formik>
  )
}