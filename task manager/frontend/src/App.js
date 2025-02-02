import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('planned');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await api.post(endpoint, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setProjects([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', {
        title,
        description,
        status
      });
      setTitle('');
      setDescription('');
      setStatus('planned');
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/projects/${id}`, { status: newStatus });
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (!token) {
    return (
      <div className="App" style={{ padding: '20px' }}>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleAuth} style={{ marginBottom: '20px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button type="submit" style={{ padding: '5px 10px' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </div>
    );
  }

  return (
    <div className="App" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Project Manager</h1>
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
      </div>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </select>
        <button type="submit" style={{ padding: '5px 10px' }}>Add Project</button>
      </form>

      <div>
        {projects.map(project => (
          <div key={project._id} style={{ 
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px'
          }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div style={{ marginBottom: '10px' }}>
              <select
                value={project.status}
                onChange={(e) => handleStatusUpdate(project._id, e.target.value)}
                style={{ marginRight: '10px', padding: '5px' }}
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
              <button 
                onClick={() => handleDelete(project._id)}
                style={{ 
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;