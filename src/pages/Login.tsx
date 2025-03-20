import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem, IconButton } from '@mui/material';

import welcomeImage from '../assets/krikdesk-welcome2.png';
import croatiaFlag from '../assets/flag-croatia.png';
import usaFlag from '../assets/flag-usa.png';

const LoginPage = () => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.VITE_ENV === 'production') {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
  }

  const { i18n } = useTranslation();
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorVerification, setErrorVerification] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorDisabled, setErrorDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentLanguage = i18n.language;

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

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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
      setErrorMail(false);
      setErrorVerification(false);
      setErrorDisabled(false);
      setError(false);
      setUser(data.user);
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        navigate('/');
      }, 1000);
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
        <title>{i18n.t('login')} | KrikDesk</title>
      </Helmet>

      <Grid container>
        <Grid item xs={12} md={7} sx={{ minHeight: '100vh' }}>
          <Box className="left-part">
            <Typography>
              Krik<span>Desk</span>
            </Typography>
            <img
              style={{ maxWidth: '800px', width: '100%', height: 'auto' }}
              src={welcomeImage}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box className="right-part">
            <Box className="right-part_lang">
              <IconButton onClick={handleMenuOpen} className="current-lang-btn">
                <img
                  src={currentLanguage === 'hr' ? croatiaFlag : usaFlag}
                  alt={currentLanguage === 'hr' ? 'Croatia Flag' : 'USA Flag'}
                  className="current-lang-flag"
                  style={{ width: '32px', height: '32px' }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="lang-menu"
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => changeLanguage('hr')}>
                  <img src={croatiaFlag} alt="Croatia Flag" />
                  HRV
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('en')}>
                  <img src={usaFlag} alt="USA Flag" />
                  ENG
                </MenuItem>
              </Menu>
              {/* <button onClick={() => changeLanguage('hr')}>
                <img
                  style={{ width: '28px', height: '28px' }}
                  src={croatiaFlag}
                />
              </button>
              <button onClick={() => changeLanguage('en')}>
                <img style={{ width: '28px', height: '28px' }} src={usaFlag} />
              </button> */}
            </Box>
            <Box className="right-part_box">
              <Typography variant="h4">
                {i18n.t('login')}
                {showSpinner && <span className="spinner"></span>}
              </Typography>
              <form onSubmit={handleLogin}>
                {errorVerification && (
                  <div className="verification-error">
                    {i18n.t('login.verificationError')}
                  </div>
                )}
                {errorDisabled && (
                  <div className="verification-error">
                    {i18n.t('login.disabledError')}
                  </div>
                )}
                {errorMail && (
                  <div className="verification-error">
                    {i18n.t('login.mailError')}
                  </div>
                )}
                {error && (
                  <div className="verification-error">
                    {i18n.t('login.passwordError')}
                  </div>
                )}
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={i18n.t('login.username')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={i18n.t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="submit"
                  value={i18n.t('login.submit')}
                  name="login"
                />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
