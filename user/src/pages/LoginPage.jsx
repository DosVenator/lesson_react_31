import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { useState } from 'react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');                      

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      dispatch(loginSuccess(data.token));
      setError('');
    } else {
      setError(data.message || 'Login failed');
      
    }
  };

  return (
    <form className="d-flex gap-2 align-items-center flex-wrap" onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <button className="btn btn-dark px-4 gap-2" type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}