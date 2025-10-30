import WindowLayout from '@/components/WindowLayout';
import Image from 'next/image';
import ProfileImage from '../../../../public/submit.jpg';
export default function AboutPage() {
  return (
    <WindowLayout title="About Me">
      <section className="p-4 text-black">
      <h2 className="font-bold mb-4">Hello, I&apos;m Donghan Kim</h2>
      <div className="flex items-center gap-4">
        <Image src={ProfileImage} alt="Profile" width={120} height={120} />
        <p className="text-[14px]">I&apos;m junior developer, interested in web development.</p>
      </div>
      </section>


    </WindowLayout>
  );
}
