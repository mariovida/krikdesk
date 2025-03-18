import React from 'react';
import { Helmet } from 'react-helmet-async';

const Projects: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Projects | KrikDesk</title>
      </Helmet>

      <section>
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <h1>Projects</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
