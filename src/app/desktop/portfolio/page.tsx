import WindowLayout from '@/components/WindowLayout';

export default function PortfolioPage() {
  return (
    <WindowLayout title="내 포트폴리오">
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">내 포트폴리오</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">프로젝트</h2>
        <div className="field-row-stacked mb-4">
          <label className="font-bold">프로젝트 1</label>
          <p className="ml-4">프로젝트 설명을 작성하세요.</p>
        </div>
        <div className="field-row-stacked mb-4">
          <label className="font-bold">프로젝트 2</label>
          <p className="ml-4">프로젝트 설명을 작성하세요.</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">기술 스택</h2>
        <ul className="ml-4 list-disc">
          <li>React / Next.js</li>
          <li>TypeScript</li>
          <li>Node.js</li>
        </ul>
      </div>
      </div>
    </WindowLayout>
  );
}
