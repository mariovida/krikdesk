import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import croatiaFlag from '../assets/flag-croatia.png';
import usaFlag from '../assets/flag-usa.png';

const LoginPage = () => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.VITE_ENV === 'production') {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
  }

  const { t } = useTranslation();
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorVerification, setErrorVerification] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorDisabled, setErrorDisabled] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      navigate('/');
    }
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, [navigate]);

  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch(`${backendUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
      credentials: 'include',
    });

    const data = await response.json();
    if (response.ok && data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/');
    } else {
      setErrorMail(data.error === 'User not found');
      setErrorVerification(data.error === 'Account not verified');
      setErrorDisabled(data.error === 'Account disabled');
      setError(data.error === 'Invalid');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | KrikDesk</title>
      </Helmet>

      <Grid container>
        <Grid item xs={12} md={8} sx={{ minHeight: '100vh' }}>
          <Box className="left-part">
            <Typography>
              Krik<span>Desk</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="right-part">
            <Box className="right-part_lang">
              <button onClick={() => changeLanguage('hr')}>
                <img src={croatiaFlag} />
              </button>
              <button onClick={() => changeLanguage('en')}>
                <img src={usaFlag} />
              </button>
            </Box>
            <Box className="right-part_box">
              <Typography variant="h4">{t('login')}</Typography>
              <form onSubmit={handleLogin}>
                {errorVerification && (
                  <div className="verification-error">
                    {t('login.verificationError')}
                  </div>
                )}
                {errorDisabled && (
                  <div className="verification-error">
                    {t('login.disabledError')}
                  </div>
                )}
                {errorMail && (
                  <div className="verification-error">
                    {t('login.mailError')}
                  </div>
                )}
                {error && (
                  <div className="verification-error">
                    {t('login.passwordError')}
                  </div>
                )}
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={t('login.username')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input type="submit" value={t('login.submit')} name="login" />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
