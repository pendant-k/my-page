import WindowLayout from '@/components/WindowLayout';

export default function AboutPage() {
  return (
    <WindowLayout title="소개">
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">소개</h1>

      <div className="window mb-4">
        <div className="title-bar">
          <div className="title-bar-text">프로필</div>
        </div>
        <div className="window-body">
          <div className="flex gap-4 items-start">
            <div className="w-24 h-24 bg-gray-300 flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg mb-2">이름</h2>
              <p className="mb-2">소프트웨어 개발자</p>
              <p className="text-sm">자기소개 내용을 작성하세요.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">경력</div>
        </div>
        <div className="window-body">
          <ul className="list-disc ml-4 space-y-2">
            <li>
              <strong>회사명</strong> - 직책 (2020 - 현재)
              <p className="text-sm ml-4">업무 내용 설명</p>
            </li>
            <li>
              <strong>회사명</strong> - 직책 (2018 - 2020)
              <p className="text-sm ml-4">업무 내용 설명</p>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </WindowLayout>
  );
}
