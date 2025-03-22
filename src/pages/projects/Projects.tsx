import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useUser } from '../../context/UserContext';
import AddProjectModal from './AddProjectModal';

import { Box, Typography } from '@mui/material';

const Projects: React.FC = () => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.VITE_ENV === 'production') {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
  }

  const [loading, setLoading] = useState<boolean>(true);
  const { role } = useUser();
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${backendUrl}/get-projects`);
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = projects.filter((project) => {
      return project.name.toLowerCase().includes(query);
    });

    setFilteredProjects(filtered);
  };

  const handleOpenCreateUserModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleCreateUser = async () => {
    const newProject = {
      name: name,
      id: projectId,
      project: selectedProject,
    };

    console.log(newProject);
    return;
  };

  return (
    <>
      <Helmet>
        <title>Projects | KrikDesk</title>
      </Helmet>

      <section>
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <div className="page-title">
                <h1>Projects</h1>
                {role && role === 'admin' ? (
                  <button
                    className="vx-button vx-button--primary"
                    onClick={handleOpenCreateUserModal}
                  >
                    Add new
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="table-custom">
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <div className="table-custom_box">
                <div className="table-custom_head">
                  <input
                    type="text"
                    placeholder="Search projects"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                {loading && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '16px 0 32px 0',
                    }}
                  >
                    <span className="spinner" style={{ margin: 0 }}></span>
                  </Box>
                )}
                {filteredProjects && filteredProjects.length > 0 && (
                  <div className="table-custom_list projects-list">
                    {filteredProjects.map((project) => (
                      <Box className="table-custom_list--item" key={project.id}>
                        <Typography
                          sx={{
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            fontSize: '21px',
                            lineHeight: '26px',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            color: '#333333',
                            marginBottom: '12px',
                            cursor: 'default  ',
                          }}
                        >
                          {project.name}
                        </Typography>
                        <Box className="table-custom_list--info">
                          <Box>
                            <Typography>Opened</Typography>
                            <Typography>0</Typography>
                          </Box>
                          <Box>
                            <Typography>In progress</Typography>
                            <Typography>0</Typography>
                          </Box>
                          <Box>
                            <Typography>Resolved</Typography>
                            <Typography>0</Typography>
                          </Box>
                          <Box>
                            <Typography>Closed</Typography>
                            <Typography>0</Typography>
                          </Box>
                        </Box>
                        {role && role === 'admin' ? (
                          <Box className="table-custom_list--info">
                            <Box>
                              <Typography>Clients</Typography>
                              <Typography>0</Typography>
                            </Box>
                            <Box>
                              <Typography>Developers</Typography>
                              <Typography>0</Typography>
                            </Box>
                            <Box>
                              <Typography>Designers</Typography>
                              <Typography>0</Typography>
                            </Box>
                            <Box>
                              <Typography>Managers</Typography>
                              <Typography>0</Typography>
                            </Box>
                          </Box>
                        ) : null}
                        <button className="vx-button vx-button--primary">
                          VIEW TICKETS
                        </button>
                      </Box>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddProjectModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleCreateUser}
        name={name}
        id={projectId}
        project={selectedProject}
        setName={setName}
        setId={setProjectId}
        setProject={setSelectedProject}
        projects={projects}
      />
    </>
  );
};

export default Projects;
