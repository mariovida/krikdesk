import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Box,
} from '@mui/material';
import AddUserModal from './AddUserModal';
import { formatDateWithClock } from '../../helpers/formatDateWithClock';
import EyeIcon from '../../assets/eye.svg';

const Users: React.FC = () => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.VITE_ENV === 'production') {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
  }

  const { i18n } = useTranslation();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${backendUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [backendUrl]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return (
        fullName.includes(query) ||
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });

    setFilteredUsers(filtered);
  };

  const handleOpenCreateUserModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDrawer = (user: any) => {
    setSelectedUser(user);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedUser(null);
  };

  const handleCreateUser = async () => {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: role,
    };

    console.log(newUser);
    return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(`${backendUrl}/api/users`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response && response.data) {
        if (
          response.data.message &&
          response.data.message === 'User with this email already exists'
        ) {
          // setUserExistsError(true);
        }
      }

      if (response.status === 201) {
        setUsers((prevUsers) => [...prevUsers, response.data.user]);
        setOpenModal(false);
        setFirstName('');
        setLastName('');
        setEmail('');

        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('nav-users')} | KrikDesk</title>
      </Helmet>

      <section className="table-custom">
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <div className="table-custom_box">
                <div className="table-custom_head">
                  <input
                    type="text"
                    placeholder="Search users"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <button onClick={handleOpenCreateUserModal}>Add new</button>
                </div>
                <div className="table-custom_table">
                  <TableContainer>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: '100px' }}>Status</TableCell>
                          <TableCell sx={{ width: '300px' }}>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Last login</TableCell>
                          <TableCell>Date created</TableCell>
                          <TableCell sx={{ width: '40px' }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell sx={{ width: '100px' }}>
                                {user.verified === false ? (
                                  <span className="status-badge status-badge_closed">
                                    NOT VERIFIED
                                  </span>
                                ) : user.is_verified === 1 ? (
                                  <span className="status-badge status-badge_active">
                                    ACTIVE
                                  </span>
                                ) : (
                                  <span className="status-badge status-badge_inactive">
                                    INACTIVE
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Box sx={{ fontWeight: '600' }}>
                                  {user.first_name + ' ' + user.last_name}
                                </Box>
                                <Box
                                  sx={{ fontSize: '14px', marginTop: '-3px' }}
                                >
                                  {user.role === 'admin'
                                    ? 'Administrator'
                                    : 'N/A'}
                                </Box>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                {user.last_login
                                  ? formatDateWithClock(user.last_login)
                                  : '-'}
                              </TableCell>
                              <TableCell>
                                {formatDateWithClock(user.date_created)}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={() => handleOpenDrawer(user)}
                                >
                                  <img src={EyeIcon} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              sx={{ textAlign: 'center !important' }}
                            >
                              No users found with the query
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddUserModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleCreateUser}
        firstName={firstName}
        lastName={lastName}
        email={email}
        role={role}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setRole={setRole}
      />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseDrawer}
        className="custom-drawer"
      >
        <Box className="users-drawer">
          <Typography className="custom-drawer_title">User details</Typography>
          {selectedUser && (
            <Box className="users-drawer_table">
              <Box>
                <Typography className="users-drawer_table_title">
                  First name
                </Typography>
                <Typography className="users-drawer_table_text">
                  {selectedUser.first_name}
                </Typography>
              </Box>
              <Box>
                <Typography className="users-drawer_table_title">
                  Last name
                </Typography>
                <Typography className="users-drawer_table_text">
                  {selectedUser.last_name}
                </Typography>
              </Box>
              <Box>
                <Typography className="users-drawer_table_title">
                  Role
                </Typography>
                <Typography className="users-drawer_table_text">
                  {selectedUser.role === 'admin' ? 'Administrator' : '-'}
                </Typography>
              </Box>
              <Box>
                <Typography className="users-drawer_table_title">
                  Email
                </Typography>
                <Typography className="users-drawer_table_text">
                  {selectedUser.email}
                </Typography>
              </Box>
              <Box>
                <Typography className="users-drawer_table_title">
                  Date created
                </Typography>
                <Typography className="users-drawer_table_text">
                  {formatDateWithClock(selectedUser.date_created)}
                </Typography>
              </Box>
              <Box>
                <Typography className="users-drawer_table_title">
                  Last login
                </Typography>
                <Typography className="users-drawer_table_text">
                  {formatDateWithClock(selectedUser.last_login)}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Users;
