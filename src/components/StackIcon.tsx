import Image, { StaticImageData } from 'next/image';

interface StackIconProps {
  src: StaticImageData;
  alt: string;
  size?: number;
  props?: React.ComponentProps<typeof Image>;
}

const StackIcon = ({ src, alt, size = 48, ...props }: StackIconProps) => {
  return <Image src={src} alt={alt} width={size} height={size} {...props} />;
};

export default StackIcon;
