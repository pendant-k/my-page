'use client';

interface CalendarWindowProps {
  onClose: () => void;
}

export default function CalendarWindow({ onClose }: CalendarWindowProps) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // 이번 달의 첫날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 첫날의 요일 (0: 일요일)
  const firstDayOfWeek = firstDay.getDay();

  // 이번 달의 총 일수
  const daysInMonth = lastDay.getDate();

  // 캘린더 그리드 생성
  const calendarDays: (number | null)[] = [];

  // 첫 주의 빈 칸
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // 날짜 채우기
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const monthName = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="window absolute bottom-12 right-1 w-64 z-100">
      <div className="title-bar">
        <div className="title-bar-text">달력</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      <div className="window-body p-2">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`text-center text-xs font-bold ${
                index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isToday = day === now.getDate();
            const isSunday = index % 7 === 0;
            const isSaturday = index % 7 === 6;

            return (
              <div
                key={index}
                className={`text-center text-xs p-1 
                 ${isToday ? 'bg-[#000080] text-white font-bold' : ''} ${
                   isSunday && day !== null ? 'text-red-600' : ''
                 } ${isSaturday && day !== null ? 'text-blue-600' : ''}`}
              >
                {day ?? ''}
              </div>
            );
          })}
        </div>

        {/* 오늘 날짜 표시 */}
        <div className="mt-2 pt-2 border-t border-[#808080] text-xs text-center">
          {now.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </div>
      </div>
    </div>
  );
}
