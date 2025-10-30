'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface WindowLayoutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Window Layout Component
 * @param title - The title of the window
 * @param children - The children of the window
 * @returns The Window Layout Component
 */
export default function WindowLayout({ title, children }: WindowLayoutProps) {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 50, y: 50 });
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  const handleClose = () => {
    router.push('/desktop');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // maximize 상태에서는 드래그 불가
    if (isMaximized) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      // maximize: 현재 위치 저장하고 전체 화면으로
      setPreviousPosition(position);
      setPosition({ x: 0, y: 0 });
    } else {
      // restore: 이전 위치로 복원
      setPosition(previousPosition);
    }
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        setPosition({
          x: dragRef.current.startPosX + deltaX,
          y: dragRef.current.startPosY + deltaY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="window absolute z-10"
      style={{
        left: isMaximized ? '0' : `${position.x}px`,
        top: isMaximized ? '0' : `${position.y}px`,
        width: isMaximized ? '100vw' : '800px',
        maxWidth: isMaximized ? '100vw' : 'calc(100vw - 100px)',
        height: isMaximized ? 'calc(100vh - 40px)' : '600px',
        maxHeight: isMaximized ? 'calc(100vh - 40px)' : 'calc(100vh - 100px)',
      }}
    >
      <div
        className={isMaximized ? 'title-bar' : 'title-bar cursor-move'}
        onMouseDown={handleMouseDown}
      >
        <div className="title-bar-text ">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" disabled></button>
          <button aria-label="Maximize" onClick={handleMaximize}></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      <div className="window-body overflow-auto h-[calc(100%-30px)]">{children}</div>
    </div>
  );
}
