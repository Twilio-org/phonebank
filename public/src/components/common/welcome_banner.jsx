import React from 'react';

const Banner = (props) => {
  const { first_name, last_name, is_admin, page } = props;
  return (
    <div>
      <h2>Welcome, {first_name} {last_name} to the {is_admin ? 'Admin' : 'Volunteer'} {page}s Dashboard!</h2>
    </div>
  );
};

Banner.displayName = 'Banner';

export default Banner;
