import WindowLayout from '@/components/WindowLayout';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: '첫 번째 블로그 포스트',
      date: '2024-01-01',
      excerpt: '블로그 시작에 대한 내용...',
    },
    {
      id: 2,
      title: 'Windows 98 스타일 웹사이트 만들기',
      date: '2024-01-02',
      excerpt: '98.css를 활용한 레트로 스타일 구현...',
    },
  ];

  return (
    <WindowLayout title="기술 블로그">
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">기술 블로그</h1>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="window">
            <div className="title-bar">
              <div className="title-bar-text">{post.title}</div>
            </div>
            <div className="window-body">
              <p className="text-xs text-gray-600 mb-2">{post.date}</p>
              <p>{post.excerpt}</p>
              <button className="mt-2">더 보기...</button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </WindowLayout>
  );
}
