import DesktopLayout from '@/components/DesktopLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DesktopLayout>{children}</DesktopLayout>;
}
