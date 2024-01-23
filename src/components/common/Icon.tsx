import React, { memo } from 'react';

type Props = {
  className?: string;
  name?: string;
  url?: string;
};

function Icon({ className = 'icon', name, url }: Props) {
  return (name || url) ? (
    <i className={className}>
      <img alt="icon" src={name ? process.env.PUBLIC_URL + `/images/icons/${name}.svg` : url}></img>
    </i>
  ) : null;
}

export default memo(Icon);
