import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTAButton = ({ children, linkto, active = false }) => {
  return (
    <Button
      asChild
      className={` transition-all duration-200 hover:scale-95 border-b ${
        active
          ? 'bg-yellow-400 text-black hover:bg-yellow-300'
          : 'bg-richBlack-800 text-white hover:bg-richBlack-700'
      }`}
    >
      <Link to={linkto}>{children}</Link>
    </Button>
  );
};

export default CTAButton;
