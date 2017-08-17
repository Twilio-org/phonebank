import React from 'react';

const AdminBanner = (props) => {
  const { first_name, last_name, page } = props;
  return (
    <div>
      <h2>Welcome, {first_name} {last_name} to the Admin {page}s Dashboard!</h2>
    </div>
  );
};

AdminBanner.displayName = 'AdminBanner';

export default AdminBanner;
