import React from 'react';

const Banner = (props) => {
  const { page } = props;
  return (
    <div className={'welcome-banner'}>
      <h2>{page}s</h2>
    </div>
  );
};

Banner.displayName = 'Banner';

export default Banner;

// first_name, last_name, is_admin,
// Welcome, {first_name} {last_name} to the {is_admin ? 'Admin' : 'Volunteer'} {page}s Dashboard!
