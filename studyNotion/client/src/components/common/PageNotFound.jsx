import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6 max-w-lg">
        {/* 404 Number */}
        <h1 className="text-6xl sm:text-7xl font-bold text-yellow-400">404</h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold">Page Not Found</h2>

        {/* Description */}
        <p className="text-richBlack-300 text-sm sm:text-base">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate(-1)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black"
        >
          Go Back Home
        </Button>
      </div>
    </section>
  );
};

export default PageNotFound;
