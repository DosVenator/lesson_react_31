import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../store/employeesSlice";
import AddEmployeeForm from "../components/AddEmployeeForm";
import { Container, Table, Button } from 'react-bootstrap';

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const { data: employees, loading } = useSelector((state) => state.employees);
  const departments = useSelector((state) => state.departments.data);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAdd = (values) => {
    if (editingEmployee) {
      dispatch(updateEmployee({ id: editingEmployee.id, employee: values }));
      setEditingEmployee(null);
    } else {
      dispatch(addEmployee(values));
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const getDepartmentName = (id) => {
    const dep = departments.find((d) => d.id === Number(id));
    return dep ? `${dep.name} (ID: ${id})` : `Unknown department (${id})`;
  };

  return (
    <section className="section">
      <h2>Employees</h2>
      {loading && <p>Loading...</p>}
      <Container className="py-5">
      <h2 className="mb-4 text-center">Employees</h2>

      <Button
        className="mb-3"
        variant={showForm ? 'secondary' : 'primary'}
        onClick={() => {
          setEditingEmployee(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? 'Cancel' : 'Add Employee'}
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{getDepartmentName(emp.departmentId)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => {
                      setEditingEmployee(emp);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {(showForm || editingEmployee) && (
        <div className="mt-4">
          <h4>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h4>
          <AddEmployeeForm onSave={handleAdd} initialValues={editingEmployee} />
        </div>
      )}
    </Container>
    </section>
  );
}
