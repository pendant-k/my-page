'use client';

// import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BootScreen from '@/components/BootScreen';

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   // 첫 방문 여부 체크
  //   const hasBooted = localStorage.getItem('hasBooted');

  //   if (hasBooted === 'true') {
  //     // 이미 부팅 화면을 본 적이 있으면 바로 데스크탑으로 이동
  //     router.push('/desktop');
  //   }
  // }, [router]);

  const handleBootComplete = () => {
    // 부팅 완료 후 localStorage에 기록하고 데스크탑으로 이동
    // localStorage.setItem('hasBooted', 'true');
    router.push('/desktop');
  };

  return <BootScreen onBootComplete={handleBootComplete} />;
}
