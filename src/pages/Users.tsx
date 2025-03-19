import React from 'react';
import { Helmet } from 'react-helmet-async';

const Users: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Users | KrikDesk</title>
      </Helmet>

      <section>
        <div className="wrapper">
          <div className="row">
            <div className="col-12">
              <h1>Users page</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
