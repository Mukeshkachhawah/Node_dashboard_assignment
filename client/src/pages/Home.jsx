import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskBoard/TaskList';


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID', error);
        navigate('/login');
      }
    };

    fetchUserId();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchTasks();
    }
  }, [userId]);

  const handleDragEnd = async (taskId, newListId) => {
    try {
      await axios.put(`http://localhost:3000/api/${taskId}`, { listName: newListId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(prevTasks => prevTasks.map(task => 
        task._id === taskId ? { ...task, listName: newListId } : task
      ));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleUpdate = (taskId, newTitle) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task._id === taskId ? { ...task, title: newTitle } : task
    ));
  };

  const handleDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api', {
        title: newTaskTitle,
        userId: userId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} onDragEnd={handleDragEnd} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Home;