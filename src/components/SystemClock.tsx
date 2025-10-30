'use client';

import { useState, useEffect } from 'react';

interface SystemClockProps {
  onCalendarToggle: () => void;
}

export default function SystemClock({ onCalendarToggle }: SystemClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 1초마다 시간 업데이트
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <button
      className="flex items-center gap-2 border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-2 h-8 hover:bg-[#dfdfdf] active:border-t-white active:border-l-white active:border-b-[#808080] active:border-r-[#808080]"
      onClick={onCalendarToggle}
    >
      <span className="text-xs">{formattedTime}</span>
    </button>
  );
}
