import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  TextField,
  Box,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');

  /* useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-users');
        console.log('Users:', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/create-task', {
        title,
        description,
        assignee,
        priority,
        selectedProject,
      });

      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setAssignee('');
      setPriority('Medium');
      setSelectedProject('');
    } catch (error) {
      setMessage('Error creating task.');
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>KrikDesk</title>
      </Helmet>

      <section className="ticket-form">
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <Box className="form-fields">
                  <TextField
                    label={t('create-ticket-title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    variant="filled"
                    required
                  />
                  <TextField
                    label={t('create-ticket-description')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    variant="filled"
                    required
                    multiline
                  />
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <FormControl fullWidth required variant="filled">
                      <InputLabel>{t('create-ticket-assignee')}</InputLabel>
                      <Select
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                      >
                        <MenuItem value="">Select an Assignee</MenuItem>
                        <MenuItem value="8efe864c-4b11-42bb-875a-98b6bf0cf5ff">
                          Mario
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth required variant="filled">
                      <InputLabel>{t('create-ticket-priority')}</InputLabel>
                      <Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth required variant="filled">
                      <InputLabel>{t('create-ticket-project')}</InputLabel>
                      <Select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                      >
                        <MenuItem value="">Select a Project</MenuItem>
                        {projects.map((project) => (
                          <MenuItem key={project.id} value={project.id}>
                            {project.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '24px',
                  }}
                >
                  <button
                    type="submit"
                    className="vx-button vx-button--primary"
                  >
                    {t('create-ticket-submit')}
                  </button>
                </Box>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
