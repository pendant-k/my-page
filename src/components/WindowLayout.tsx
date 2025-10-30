'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface WindowLayoutProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  enableWindowControls?: boolean; // 드래그 및 maximize 기능 (기본: true)
}

/**
 * Window Layout Component
 * @param title - The title of the window
 * @param children - The children of the window
 * @param initialPosition - Initial window position (default: {x: 50, y: 50})
 * @param enableWindowControls - Enable drag and maximize features (default: true)
 * @returns The Window Layout Component
 */
export default function WindowLayout({
  title,
  children,
  initialPosition = { x: 50, y: 50 },
  enableWindowControls = true,
}: WindowLayoutProps) {
  const router = useRouter();
  const [position, setPosition] = useState(initialPosition);
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
    // 윈도우 컨트롤 비활성화 또는 maximize 상태에서는 드래그 불가
    if (!enableWindowControls || isMaximized) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  const handleMaximize = () => {
    if (!enableWindowControls) return;

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
    // maximize 상태거나 드래깅 중이 아니면 리스너 등록 안 함
    if (!isDragging || isMaximized) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.startPosX + deltaX,
        y: dragRef.current.startPosY + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // cleanup: effect가 다시 실행되거나 컴포넌트 언마운트 시 리스너 제거
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized]);

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
        className={
          enableWindowControls && !isMaximized ? 'title-bar cursor-move' : 'title-bar'
        }
        onMouseDown={handleMouseDown}
      >
        <div className="title-bar-text ">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" disabled></button>
          <button
            aria-label="Maximize"
            onClick={handleMaximize}
            disabled={!enableWindowControls}
          ></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      <div className="window-body overflow-auto h-[calc(100%-30px)]">{children}</div>
    </div>
  );
}
