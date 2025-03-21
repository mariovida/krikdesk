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

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: { name: string; id: string; project: string }) => void;
  name: string;
  id: string;
  project: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setProject: React.Dispatch<React.SetStateAction<string>>;
  projects: { id: string; name: string }[];
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  open,
  onClose,
  onSubmit,
  name,
  id,
  project,
  setName,
  setId,
  setProject,
  projects,
}) => {
  const [errors, setErrors] = useState({
    name: '',
  });

  useEffect(() => {
    setName('');
    setId('');
  }, [setName, setId]);

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'project_name') setName(value);
    if (name === 'project_id') setId(value);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSubmit({ name, id, project });
    }
  };

  const handleClose = () => {
    setErrors({ name: '' });
    setName('');
    setId('');
    setProject('');
    onClose();
  };

  const isSaveDisabled = name === '';

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
            label="Project name"
            name="project_name"
            value={name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            variant="filled"
            inputProps={{ maxLength: 50 }}
            required
          />
          {/* <TextField
            label="Project ID"
            name="project_id"
            value={id}
            onChange={handleInputChange}
            fullWidth
            variant="filled"
          /> */}
          <FormControl fullWidth required variant="filled">
            <InputLabel>Select project</InputLabel>
            <Select
              value={project}
              onChange={(e) => setProject(e.target.value)}
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

export default AddProjectModal;
