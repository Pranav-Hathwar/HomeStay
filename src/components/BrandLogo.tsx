import logoSrc from '../assets/mungaru-logo.png';

type BrandLogoProps = {
  className?: string;
  alt?: string;
};

export default function BrandLogo({
  className = 'h-14 w-auto',
  alt = 'Mungaru Home Stay logo',
}: BrandLogoProps) {
  return <img src={logoSrc} alt={alt} className={className} />;
}
