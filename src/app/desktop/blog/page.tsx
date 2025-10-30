import WindowLayout from '@/components/WindowLayout';
import Image from 'next/image';
import Blog1Image from '../../../../public/post_og.jpg';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: '첫 번째 블로그 포스트',
      date: '2024-01-01',
      excerpt: '블로그 시작에 대한 내용...',
      image: Blog1Image,
    },
    {
      id: 2,
      title: 'Windows 98 스타일 웹사이트 만들기',
      date: '2024-01-02',
      excerpt: '98.css를 활용한 레트로 스타일 구현...',
      image: Blog1Image,
    },
  ];

  return (
    <WindowLayout title="Blog">
      <h2 className="font-bold">Blog</h2>

      <div className="flex space-y-4 flex-row gap-4">
        <aside>
          <ul className="tree-view w-40">
            <li>JavaScript</li>
            <li>CSS(8)</li>
          </ul>
        </aside>
        <section className="grid gap-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="window">
              <div className="window-body">
                <div className="flex flex-col gap-3">
                  <Image src={post.image} alt={post.title} className="object-cover w-full h-full" />
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{post.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{post.date}</p>
                    <p className="text-sm">{post.excerpt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </WindowLayout>
  );
}
