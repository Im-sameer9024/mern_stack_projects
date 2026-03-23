import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { FaStar } from 'react-icons/fa';

const ReviewSlider = ({ ReviewData }) => {
  return (
    <Carousel opts={{ align: 'start' }} className="w-full max-w-6xl mx-auto">
      <CarouselContent>
        {ReviewData.map((item) => (
          <CarouselItem key={item.id} className="basis-full md:basis-1/2 lg:basis-1/3">
            <div className="p-6 bg-richBlack-800 rounded-xl shadow-md hover:shadow-lg transition-all h-full">
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-sm text-richBlack-200 mb-3">{item.email}</p>

              <p className="text-sm text-richBlack-100 mb-4 leading-relaxed">{item.review}</p>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < item.rating ? 'text-yellow-400' : 'text-richBlack-400'}
                  />
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Styled Controls */}
      <CarouselPrevious className="bg-richBlack-800 hover:cursor-pointer border-richBlack-600 text-white hover:bg-richBlack-700" />
      <CarouselNext className="bg-richBlack-800 border-richBlack-600 hover:cursor-pointer text-white hover:bg-richBlack-700" />
    </Carousel>
  );
};

export default ReviewSlider;
