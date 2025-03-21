import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

import croatiaFlag from '../assets/flag-croatia.png';
import usaFlag from '../assets/flag-usa.png';

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { role, setUser } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentLanguage = i18n.language;

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

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="row">
          <div className="col-12">
            <nav>
              <div>
                <NavLink to="/">{i18n.t('nav-home')}</NavLink>
                <NavLink to="/projects">{i18n.t('nav-projects')}</NavLink>
                {role && role === 'admin' ? (
                  <>
                    <NavLink to="/users">{i18n.t('nav-users')}</NavLink>
                    <NavLink to="/">{i18n.t('nav-administration')}</NavLink>
                  </>
                ) : null}
                {/* <button onClick={handleLogout}>{i18n.t('logout')}</button> */}
              </div>
              <div className="header_lang">
                <IconButton
                  onClick={handleMenuOpen}
                  className="current-lang-btn"
                >
                  <img
                    src={currentLanguage === 'hr' ? croatiaFlag : usaFlag}
                    alt={currentLanguage === 'hr' ? 'Croatia Flag' : 'USA Flag'}
                    className="current-lang-flag"
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
                    <img
                      src={croatiaFlag}
                      alt="Croatia Flag"
                      className="flag-icon"
                    />
                    HRV
                  </MenuItem>
                  <MenuItem onClick={() => changeLanguage('en')}>
                    <img src={usaFlag} alt="USA Flag" className="flag-icon" />
                    ENG
                  </MenuItem>
                </Menu>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
