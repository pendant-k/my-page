'use client';

import { useState } from 'react';
import WindowLayout from './WindowLayout';
import StackIcon from './StackIcon';
import ReactIcon from '../../public/icons/stacks/react_icon.svg';
import NextIcon from '../../public/icons/stacks/next_icon.svg';
import NestIcon from '../../public/icons/stacks/nestJS_icon.svg';
import NodeIcon from '../../public/icons/stacks/nodejs.svg';
import EslintIcon from '../../public/icons/stacks/eslint_icon.svg';

// 나를 소개하는 창
// 이름, 간단한 소개 (한 눈에 들어오도록)

const IntroWindow = () => {
  // useState의 lazy initialization을 사용하여 초기값 계산
  const [initialX] = useState(() => {
    // 서버 사이드에서는 기본값, 클라이언트에서는 계산된 값
    if (typeof window === 'undefined') return 100;
    return Math.max(100, window.innerWidth - 1000);
  });

  const handleGithubButton = () => {
    window.open('https://github.com/pendant-k', '_blank');
  };
  const handleLinkedinButton = () => {
    window.open('https://www.linkedin.com/in/pendant-k/', '_blank');
  };
  return (
    <WindowLayout
      title="소개글"
      initialPosition={{ x: initialX, y: 100 }}
      enableWindowControls={false}
    >
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-black">주도적인 개발자 김동한입니다</h2>
          <div className="flex flex-col gap-8 text-lg text-black">
            <p className="whitespace-pre-line">
              웹 및 모바일 애플리케이션을 주로 개발하며,{'\n'}
              <strong>함께 일하기 좋은 코드</strong>를 추구합니다.
            </p>
            <p className="whitespace-pre-line">
              그리 대단한 사람은 아니지만,{'\n'}어제도 코드를 작성했고,{'\n'}오늘도 코드를
              작성했습니다.
            </p>
          </div>
        </section>
        {/* Stacks Section */}
        <section className="flex flex-col gap-2">
          <span className="text-[14px] text-gray-500">기술 스택</span>
          <div className="flex flex-row gap-2">
            <StackIcon src={ReactIcon} alt="React" />
            <StackIcon src={NextIcon} alt="Next.js" />
            <StackIcon src={NestIcon} alt="Nest.js" />
            <StackIcon src={NodeIcon} alt="Node.js" />
            <StackIcon src={EslintIcon} alt="Eslint" />
          </div>
        </section>

        {/* Links Section */}
        <section className="flex flex-col gap-2">
          <span className="text-[14px] text-gray-500">기타 링크</span>
          <div className="flex flex-row gap-2">
            <button onClick={handleGithubButton}>Github</button>
            <button onClick={handleLinkedinButton}>Linkedin</button>
          </div>
        </section>
      </div>
    </WindowLayout>
  );
};

export default IntroWindow;
