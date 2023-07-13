'use client'

import { Formik, Form, Field, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';

export type TurmaCompleto = {
  pk_id_turma: number;
  numero: number;
  periodo: string;
  horario: string;
  vagas_ocupadas: number;
  vagas_totais: number;
  local: string;
  fk_id_prof: number;
  fk_codigo_dep: number;
  fk_codigo_disc: string;
}

type FormValues = {
  numero: number;
  periodo: string;
  horario: string;
  vagas_ocupadas: number;
  vagas_totais: number;
  local: string;
  fk_id_prof: number;
  fk_codigo_dep: number;
  fk_codigo_disc: string;
}

type UpdateTurmaFormProps = {
  turma: TurmaCompleto;
  idTurma: string;
}

async function updateTurma(turmaAtualizada: Partial<TurmaCompleto>) {
  const res = await fetch(`http://localhost:3000/api/turmas`, {
    method: 'PUT',
    body: JSON.stringify({ turmaAtualizada }),
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Não foi possível atualizar a turma');
 
  return res.json();
}

const TurmaSchema = Yup.object().shape({
  numero: Yup.number().required('Campo Obrigatório'),
  periodo: Yup.string().max(6).required('Campo Obrigatório'),
  horario: Yup.string().required('Campo Obrigatório'),
  vagas_ocupadas: Yup.number().required('Campo Obrigatório'),
  vagas_totais: Yup.number().required('Campo Obrigatório'),
  local: Yup.string().required('Campo Obrigatório'),
  fk_id_prof: Yup.number().required('Campo Obrigatório'),
  fk_codigo_dep: Yup.number().required('Campo Obrigatório'),
  fk_codigo_disc: Yup.string().required('Campo Obrigatório'),
});

export default function UpdateTurmaForm({ turma, idTurma }: UpdateTurmaFormProps) {
  const router = useRouter();
  const fieldClassName = 'mt-1 mb-2 p-2 rounded-l text-gray-800';
  
  return (
    <Formik
      initialValues={{
        numero: turma.numero,
        periodo: turma.periodo,
        horario: turma.horario,
        vagas_ocupadas: turma.vagas_ocupadas,
        vagas_totais: turma.vagas_totais,
        local: turma.local,
        fk_id_prof: turma.fk_id_prof,
        fk_codigo_dep: turma.fk_codigo_dep,
        fk_codigo_disc: turma.fk_codigo_disc,
      }}
      validationSchema={TurmaSchema}
      onSubmit={async (values) => {
        const turma = {
          pk_id_turma: parseInt(idTurma),
          numero: values.numero,
          periodo: values.periodo,
          horario: values.horario,
          vagas_ocupadas: values.vagas_ocupadas,
          vagas_totais: values.vagas_totais,
          local: values.local,
          fk_id_prof: values.fk_id_prof,
          fk_codigo_dep: values.fk_codigo_dep,
          fk_codigo_disc: values.fk_codigo_disc,
        };
        const response = await updateTurma(turma);
        if (response.affectedRows === 1) router.push(`/turmas/${idTurma}`);
      }}
    >
      {({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
        <Form className="flex flex-col w-full max-w-xs mx-auto">
          <label htmlFor="numero">Número da Turma</label>
          <Field className={fieldClassName} name="numero" placeholder="1" />
          {errors.numero && touched.numero ? (
            <div className="text-red-400 text-xs mb-3">{errors.numero}</div>
          ) : null}

          <label htmlFor="periodo">Período de Oferta</label>
          <Field className={fieldClassName} name="periodo" placeholder="2023.1" />
          {errors.periodo && touched.periodo ? (
            <div className="text-red-400 text-xs mb-3">{errors.periodo}</div>
          ) : null}

          <label htmlFor="horario">Horário</label>
          <Field className={fieldClassName} name="horario" placeholder="" />
          {errors.horario && touched.horario ? (
            <div className="text-red-400 text-xs mb-3">{errors.horario}</div>
          ) : null}

          <label htmlFor="vagas_ocupadas">Vagas Ocupadas</label>
          <Field className={fieldClassName} name="vagas_ocupadas" placeholder="" />
          {errors.vagas_ocupadas && touched.vagas_ocupadas ? (
            <div className="text-red-400 text-xs mb-3">{errors.vagas_ocupadas}</div>
          ) : null}

          <label htmlFor="vagas_totais">Vagas Totais</label>
          <Field className={fieldClassName} name="vagas_totais" placeholder="" />
          {errors.vagas_totais && touched.vagas_totais ? (
            <div className="text-red-400 text-xs mb-3">{errors.vagas_totais}</div>
          ) : null}

          <label htmlFor="local">Local</label>
          <Field className={fieldClassName} name="local" placeholder="" />
          {errors.local && touched.local ? (
            <div className="text-red-400 text-xs mb-3">{errors.local}</div>
          ) : null}

          <label htmlFor="fk_id_prof">ID Numérico do Professor</label>
          <Field className={fieldClassName} name="fk_id_prof" placeholder="" />
          {errors.fk_id_prof && touched.fk_id_prof ? (
            <div className="text-red-400 text-xs mb-3">{errors.fk_id_prof}</div>
          ) : null}

          <label htmlFor="fk_codigo_dep">Código do Departamento</label>
          <Field className={fieldClassName} name="fk_codigo_dep" placeholder="" />
          {errors.fk_codigo_dep && touched.fk_codigo_dep ? (
            <div className="text-red-400 text-xs mb-3">{errors.fk_codigo_dep}</div>
          ) : null}

          <label htmlFor="fk_codigo_disc">Código da Disciplina</label>
          <Field className={fieldClassName} name="fk_codigo_disc" placeholder="" />
          {errors.fk_codigo_disc && touched.fk_codigo_disc ? (
            <div className="text-red-400 text-xs mb-3">{errors.fk_codigo_disc}</div>
          ) : null}

          <button className="rounded bg-emerald-500 p-3 mt-4" type="submit" disabled={isSubmitting}>
            Atualizar Turma
          </button>
        </Form>
      )}
    </Formik>
  )
}