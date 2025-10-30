'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DirectoryOpenFileIcon from '../../public/icons/desktop/directory_open_file.png';
import DesktopIcon from './DesktopIcon';
import IntroWindow from './IntroWindow';
import SystemClock from './SystemClock';
import CalendarWindow from './CalendarWindow';

const desktopIcons = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    icon: DirectoryOpenFileIcon,
    path: '/desktop/portfolio',
  },
  { id: 'blog', title: 'Blog', icon: DirectoryOpenFileIcon, path: '/desktop/blog' },
];

interface DesktopLayoutProps {
  children?: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  const router = useRouter();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const openWindow = (path: string) => {
    router.push(path);
  };

  const handleCalendarToggle = () => {
    setCalendarOpen(!calendarOpen);
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundColor: '#008080' }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-8 z-0">
        {desktopIcons.map(({ id, title, icon, path }) => (
          <DesktopIcon
            key={id}
            id={id}
            title={title}
            icon={icon.src}
            onClick={() => openWindow(path)}
          />
        ))}
      </div>
      <IntroWindow />

      {/* Window Content */}
      {children}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 z-50">
        {/* Start Button */}
        <button
          className="flex items-center gap-1 px-2 h-8 font-bold text-sm border-2 border-[#dfdfdf] border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:border-[#000080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          style={{
            background: startMenuOpen
              ? 'linear-gradient(to bottom, #c0c0c0, #dfdfdf)'
              : 'linear-gradient(to bottom, #dfdfdf, #c0c0c0)',
          }}
        >
          <div className="w-4 h-4 flex items-center justify-center"></div>
          <span>Start</span>
        </button>

        {/* Separator */}
        <div className="w-px h-8 bg-[#808080] mx-1 shadow-[1px_0_0_white]"></div>

        {/* Empty space for open windows */}
        <div className="flex-1"></div>

        {/* System Tray */}
        <SystemClock onCalendarToggle={handleCalendarToggle} />
      </div>

      {/* Calendar Window */}
      {calendarOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setCalendarOpen(false)}
          ></div>
          <CalendarWindow onClose={() => setCalendarOpen(false)} />
        </>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setStartMenuOpen(false)}></div>
          <div className="window absolute bottom-10 left-1 w-64 z-50">
            <div className="window-body p-0">
              <div className="flex">
                <div className="bg-[#808080] w-8 flex items-end pb-2 px-1">
                  <div
                    className="text-white font-bold text-xs"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Windows 98
                  </div>
                </div>
                <div className="flex-1 p-2">
                  {desktopIcons.map((icon) => (
                    <button
                      key={icon.id}
                      className="w-full text-left px-2 py-1 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                      onClick={() => {
                        openWindow(icon.path);
                        setStartMenuOpen(false);
                      }}
                    >
                      <Image src={icon.icon.src} alt={icon.title} width={20} height={20} />
                      <span className="text-sm">{icon.title}</span>
                    </button>
                  ))}
                  <hr className="my-1 border-t border-[#808080]" />
                  <button className="w-full text-left px-2 py-1 hover:bg-[#000080] hover:text-white text-sm">
                    ⚙️ 설정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
