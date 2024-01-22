import React, { memo } from 'react';
import ReactCountdown, { zeroPad } from 'react-countdown';
import { CountdownRenderProps } from 'react-countdown/dist/Countdown';

type Props = {
  timer: number;
  withDays?: boolean;
  completeText?: string;
};

function Countdown({ timer, withDays = false, completeText }: Props) {
  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return <span>{completeText ?? '00:00:00'}</span>;
    } else {
      const dateProps = [zeroPad(hours), zeroPad(minutes), zeroPad(seconds)];
      if (withDays) dateProps.unshift(zeroPad(days));
      return <span>{dateProps.join(':')}</span>;
    }
  };

  return <ReactCountdown key={timer.toString()} date={timer} renderer={renderer} />;
}

export default memo(Countdown);
