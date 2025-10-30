'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface WindowLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function WindowLayout({ title, children }: WindowLayoutProps) {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  const handleClose = () => {
    router.push('/desktop');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
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
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '800px',
        maxWidth: 'calc(100vw - 100px)',
        height: '600px',
        maxHeight: 'calc(100vh - 100px)',
      }}
    >
        <div className="title-bar cursor-move" onMouseDown={handleMouseDown}>
          <div className="title-bar-text ">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" disabled></button>
            <button aria-label="Maximize" disabled></button>
            <button aria-label="Close" onClick={handleClose}></button>
          </div>
        </div>
      <div className="window-body overflow-auto h-[calc(100%-30px)]">
        {children}
      </div>
    </div>
  );
}
