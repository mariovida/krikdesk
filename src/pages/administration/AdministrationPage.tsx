import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import { Box, Tabs, Tab, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: '24px 16px' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdministrationPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Administration | KrikDesk</title>
      </Helmet>

      <section>
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <div className="page-title">
                <h1>Administration</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="custom-tabs">
        <div className="wrapper">
          <Grid container spacing={2}>
            <Grid size={12}>
              <Box className="custom-tabs_box">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Tracker" {...a11yProps(0)} />
                  <Tab label="Priority" {...a11yProps(1)} />
                  <Tab label="Status" {...a11yProps(2)} />
                </Tabs>

                <CustomTabPanel value={value} index={0}>
                  Item One
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  Item Three
                </CustomTabPanel>
              </Box>
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default AdministrationPage;
