import express from 'express';      
import cors from 'cors';             
import jwt from 'jsonwebtoken';     
import bcrypt from 'bcrypt';         

const app = express();
app.use(cors());                    
app.use(express.json());         

const employees = [
  { id: 1, name: 'John Smith', position: 'Frontend', departmentId: 1 },
  { id: 2, name: 'Jane Doe', position: 'Backend', departmentId: 2 }
];

const departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Marketing' }
];

const users = [
  {
    username: 'admin',
    password: '$2b$10$EBsUXWo2pWNjXFOJehnXcuLZzg/UYx5u3VwZRFyeLbjYXbvPuRJNK'
  }
];

const SECRET_KEY = 'hillel_fullstack';

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(usr => usr.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '5min' });

  res.json({ token });
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) return res.sendStatus(403); 
    next(); 
  });
};

// EMPLOYEES

app.get('/api/employees', authMiddleware, (req, res) => {
  res.json(employees);
});

app.post('/api/employees', authMiddleware, (req, res) => {
  const { employee } = req.body;
  const newEmployee = {
    ...employee,
    id: employees.length + 1
  };
  employees.push(newEmployee);
  res.json({ employee: newEmployee });
});

app.put('/api/employees/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const { employee } = req.body;
  const index = employees.findIndex(e => e.id === id);

  if (index === -1) return res.status(404).json({ message: 'Not found' });

  employees[index] = { ...employees[index], ...employee };
  res.json({ employee: employees[index] });
});

app.delete('/api/employees/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const index = employees.findIndex(e => e.id === id);

  if (index === -1) return res.status(404).json({ message: 'Not found' });

  employees.splice(index, 1);
  res.json({ message: 'Deleted' });
});

//  DEPARTMENTS

app.get('/api/departments', authMiddleware, (req, res) => {
  res.json(departments);
});

app.post('/api/departments', authMiddleware, (req, res) => {
  const { department } = req.body;
  const newDep = {
    ...department,
    id: departments.length + 1
  };
  departments.push(newDep);
  res.json({ department: newDep });
});

app.put('/api/departments/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const { department } = req.body;
  const index = departments.findIndex(d => d.id === id);

  if (index === -1) return res.status(404).json({ message: 'Not found' });

  departments[index] = { ...departments[index], ...department };
  res.json({ department: departments[index] });
});

app.delete('/api/departments/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const index = departments.findIndex(d => d.id === id);

  if (index === -1) return res.status(404).json({ message: 'Not found' });

  departments.splice(index, 1);
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});