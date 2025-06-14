import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, addDepartment } from '../store/departmentsSlice';
import { Formik, Form, Field } from 'formik';

export default function DepartmentsPage() {
  const dispatch = useDispatch();
  const { data: departments, loading } = useSelector(state => state.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleAdd = values => {
    dispatch(addDepartment(values));
  };

  return (
    <div>
      <h2>Departments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        departments.map(dep => (
          <div key={dep.id}>
            {dep.name} (ID: {dep.id})
          </div>
        ))
      )}

      <h3>Add Department</h3>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, helpers) => {
          handleAdd(values);
          helpers.resetForm();
        }}
      >
        <Form className="d-flex gap-2 align-items-center flex-wrap">
          <Field name="name" placeholder="Department Name" />
          <button type="submit" className="btn btn-dark px-4">Add</button>
        </Form>
      </Formik>
    </div>
  );
}