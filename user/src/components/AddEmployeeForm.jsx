import { Formik, Form, Field } from 'formik';

export default function AddEmployeeForm({ onSave, initialValues }) {
  const defaultValues = initialValues || { name: '', position: '', departmentId: '' };

  const handleSubmit = (values, helpers) => {
    onSave(values);
    helpers.resetForm();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={defaultValues}
      onSubmit={handleSubmit}
    >
       <Form className="d-flex gap-2 align-items-center flex-wrap">
        <Field
          name="name"
          placeholder="Name"
        />
        <Field
          name="position"
          placeholder="Position"
        />
        <Field
          name="departmentId"
          placeholder="Department ID"
        />
        <button
          type="submit"
          className="btn btn-dark px-4"
        >
          {initialValues ? 'Update' : 'Add'}
        </button>
      </Form>
    </Formik>
  );
}