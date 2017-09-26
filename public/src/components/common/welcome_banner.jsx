import React from 'react';

const Banner = (props) => {
  const { page, is_admin, first_name } = props;
  return (
    <div className={'welcome-banner'}>
      <h2>{is_admin ? `${page}s` : `Welcome, ${first_name}!`}</h2>
    </div>
  );
};

Banner.displayName = 'Banner';

export default Banner;
