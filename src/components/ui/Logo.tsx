import { Utensils } from 'lucide-react';

interface LogoProps {
  size?: number;
  light?: boolean;
}

const Logo = ({ size = 24, light = false }: LogoProps) => {
  const textColor = light ? 'text-white' : 'text-secondary-500';
  const accentColor = 'text-primary-500';

  return (
    <div className="relative">
      <div className={`rounded-circle p-1 border-2 ${accentColor} border-primary-500`}>
        <Utensils size={size} className={accentColor} />
      </div>
    </div>
  );
};

export default Logo;