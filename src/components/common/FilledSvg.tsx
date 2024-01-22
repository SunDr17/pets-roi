import React, { memo } from 'react';
import { ReactSVG } from 'react-svg';

type Props = {
  src: string;
  color: string | number | readonly string[];
  height?: string | number;
  width?: string | number;
};

function FilledSvg({ src, color, height = 'auto', width = 'auto' }: Props) {
  return <ReactSVG
    src={src}
    beforeInjection={(svg) => {
      svg.setAttribute('fill', String(color));
      svg.setAttribute('height', String(height));
      svg.setAttribute('width', String(width));
    }}
  />;
}

export default memo(FilledSvg);
