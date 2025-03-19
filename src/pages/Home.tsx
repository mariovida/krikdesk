import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  TextField,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/create-task', {
        title,
        description,
        assignee,
        priority,
      });

      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setAssignee('');
      setPriority('Medium');
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
              <h1>Home page</h1>
            </div>
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div>
                  {/* <TextField
                    label={t('create-ticket-title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    variant="filled"
                    className="custom-input"
                  />
                  <TextField
                    label={t('create-ticket-description')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    multiline
                    rows={3}
                    fullWidth
                    variant="filled"
                  />
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
                  </FormControl> */}
                  <label>{t('create-ticket-title')}</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>{t('create-ticket-description')}</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>{t('create-ticket-assignee')}</label>
                  <select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    required
                  >
                    <option value="">Select an Assignee</option>
                    <option value="8efe864c-4b11-42bb-875a-98b6bf0cf5ff">
                      Mario
                    </option>
                  </select>
                </div>
                <div>
                  <label>{t('create-ticket-priority')}</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <button type="submit">{t('create-ticket-submit')}</button>
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
