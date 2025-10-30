import Image from 'next/image';

interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
  onClick: () => void;
}

const DesktopIcon = ({ id, title, icon, onClick }: DesktopIconProps) => {
  return (
    <div key={id} className="cursor-pointer" onClick={onClick}>
      <div className="flex flex-col items-center justify-center w-20">
        <Image src={icon} alt={title} width={48} height={48} />
        <span className="text-xs text-center leading-tight drop-shadow-[1px_1px_0_black] text-white">
          {title}
        </span>
      </div>
    </div>
  );
};

export default DesktopIcon;
