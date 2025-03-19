import React, { useState, useEffect } from 'react';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from '@mui/material';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: {
    first_name: string;
    last_name: string;
    email: string;
  }) => void;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onSubmit,
  firstName,
  lastName,
  email,
  role,
  setFirstName,
  setLastName,
  setEmail,
  setRole,
}) => {
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('');
  }, [setFirstName, setLastName, setEmail]);

  const validateFields = () => {
    let isValid = true;
    const newErrors = { first_name: '', last_name: '', email: '', role: '' };

    if (!firstName.trim()) {
      newErrors.first_name = 'First name is required.';
      isValid = false;
    } else if (firstName.length > 50) {
      newErrors.first_name = 'First name must be less than 50 characters.';
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.last_name = 'Last name is required.';
      isValid = false;
    } else if (lastName.length > 50) {
      newErrors.last_name = 'Last name must be less than 50 characters.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!role) {
      newErrors.role = 'Role is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'first_name') setFirstName(value);
    if (name === 'last_name') setLastName(value);
    if (name === 'email') setEmail(value);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
    setErrors((prevErrors) => ({ ...prevErrors, role: '' }));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSubmit({ first_name: firstName, last_name: lastName, email });
    }
  };

  const handleClose = () => {
    setErrors({ first_name: '', last_name: '', email: '', role: '' });
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('');
    onClose();
  };

  const isSaveDisabled =
    firstName === '' || lastName === '' || email === '' || !role;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="custom-modal"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '540px',
          width: '100%',
        },
      }}
    >
      <DialogTitle>Add new user</DialogTitle>
      <DialogContent>
        <Box className="form-fields">
          <TextField
            label="First name"
            name="first_name"
            value={firstName}
            onChange={handleInputChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
            fullWidth
            variant="filled"
            inputProps={{ maxLength: 50 }}
            required
          />
          <TextField
            label="Last name"
            name="last_name"
            value={lastName}
            onChange={handleInputChange}
            error={!!errors.last_name}
            helperText={errors.last_name}
            fullWidth
            variant="filled"
            inputProps={{ maxLength: 50 }}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            variant="filled"
            required
          />
          <FormControl
            fullWidth
            variant="filled"
            required
            error={!!errors.role}
          >
            <InputLabel id="user-role-label">Role</InputLabel>
            <Select
              labelId="user-role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Administrator</MenuItem>
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="designer">Designer</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="reporter">Account manager</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={handleClose} className="cancel-btn">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="submit-btn"
          disabled={isSaveDisabled}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
