'use client';

import { useEffect, useState } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

  const bootSequence = [
    'Starting MS-DOS...',
    '',
    'HIMEM is testing extended memory...done.',
    '',
    'Microsoft(R) Windows 98',
    '   (C)Copyright Microsoft Corp 1981-1998.',
    '',
    'Loading system files...',
    'CONFIG.SYS',
    'AUTOEXEC.BAT',
    '',
    'Initializing portfolio system...',
    '.env.local 파일 삭제 중.....[OK]',
    'Slack 알림 비활성화 중......[OK]',
    '고양이 짤 1,024장 로딩 중......[OK]',
    'eslint 비활성화 중......[OK]',
    'console.log 주석 처리 중...............[OK]',
    '버그를 feature로 변환 중........[OK]',
    'TODO 주석 감추는 중.............[OK]',
    'Stack Overflow 크롤링 중.......[OK]',
    '100% 재사용 코드 친환경 표시 중......[OK]',
    '주석 없는 코드 정당화 중........[OK]',
    '',
    'Starting Windows 98...',
  ];

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);


  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, bootSequence[currentLine]]);
        setCurrentLine(currentLine + 1);
      }, 100 + Math.random() * 100);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        onBootComplete();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentLine, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white font-mono flex flex-col p-8 overflow-hidden">
      <div className="flex-1 overflow-auto">
        {lines.map((line, index) => (
          <div key={index} className="leading-relaxed">
            {line || '\u00A0'}
          </div>
        ))}
        {currentLine < bootSequence.length && (
          <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span>
        )}
      </div>
    </div>
  );
}
