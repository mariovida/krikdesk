import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Typography } from '@mui/material';
import { useUser } from '../context/UserContext';

import krikLogo from '../assets/logo.svg';

const TopHeader: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    <header className="top-header">
      <div className="wrapper">
        <div className="row">
          <div className="col-12">
            <div className="top-header_content">
              <div>
                <img src={krikLogo} alt="Krik studio logo" />
                <Typography>Ticketing</Typography>
              </div>
              <IconButton
                onClick={handleMenuOpen}
                className="avatar"
              ></IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="user-menu"
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>Settings</MenuItem>
                <MenuItem>Account</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
