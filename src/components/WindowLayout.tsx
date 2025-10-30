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
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 50, y: 50 });
  const [previousSize, setPreviousSize] = useState({ width: 800, height: 600 });
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
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
      // maximize: 현재 위치와 크기 저장하고 전체 화면으로
      setPreviousPosition(position);
      setPreviousSize(size);
      setPosition({ x: 0, y: 0 });
    } else {
      // restore: 이전 위치와 크기로 복원
      setPosition(previousPosition);
      setSize(previousSize);
    }
    setIsMaximized(!isMaximized);
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    if (!enableWindowControls || isMaximized) return;

    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  // Dragging effect
  useEffect(() => {
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  // Resizing effect
  useEffect(() => {
    if (!isResizing || isMaximized) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeRef.current) return;

      const deltaX = e.clientX - resizeRef.current.startX;
      const deltaY = e.clientY - resizeRef.current.startY;

      let newWidth = resizeRef.current.startWidth;
      let newHeight = resizeRef.current.startHeight;
      let newX = resizeRef.current.startPosX;
      let newY = resizeRef.current.startPosY;

      // 최소 크기
      const minWidth = 300;
      const minHeight = 200;

      if (resizeDirection.includes('e')) {
        newWidth = Math.max(minWidth, resizeRef.current.startWidth + deltaX);
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(minHeight, resizeRef.current.startHeight + deltaY);
      }
      if (resizeDirection.includes('w')) {
        const proposedWidth = resizeRef.current.startWidth - deltaX;
        if (proposedWidth >= minWidth) {
          newWidth = proposedWidth;
          newX = resizeRef.current.startPosX + deltaX;
        }
      }
      if (resizeDirection.includes('n')) {
        const proposedHeight = resizeRef.current.startHeight - deltaY;
        if (proposedHeight >= minHeight) {
          newHeight = proposedHeight;
          newY = resizeRef.current.startPosY + deltaY;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection('');
      resizeRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection, isMaximized]);

  return (
    <div
      className="window absolute z-10"
      style={{
        left: isMaximized ? '0' : `${position.x}px`,
        top: isMaximized ? '0' : `${position.y}px`,
        width: isMaximized ? '100vw' : `${size.width}px`,
        height: isMaximized ? 'calc(100vh - 40px)' : `${size.height}px`,
      }}
    >
      <div
        className={enableWindowControls && !isMaximized ? 'title-bar cursor-move' : 'title-bar'}
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

      {/* Resize Handles */}
      {enableWindowControls && !isMaximized && (
        <>
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />

          {/* Edges */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
        </>
      )}
    </div>
  );
}
