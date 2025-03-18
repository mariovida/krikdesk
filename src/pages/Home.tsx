import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/create-task', {
        title,
        description,
      });

      setMessage(response.data.message);
      setTitle('');
      setDescription('');
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

      <section>
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <h1>Home page</h1>
            </div>
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div>
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
                <button type="submit">{t('create-ticket-submit')}</button>
              </form>{' '}
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
