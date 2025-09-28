import Image from 'next/image';
import Link from 'next/link';

// Helper function to format numbers consistently for SSR
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface TourCardProps {
  id?: string; // Add optional id for linking to package details
  title: string;
  location: string;
  duration: string;
  nights: number;
  days: number;
  price: number;
  totalPrice: number;
  image: string;
  inclusions: string[];
  activities: string[];
  link?: string;
}

const TourCard = ({
  id,
  title,
  location,
  duration,
  price,
  totalPrice,
  image,
  inclusions,
  activities,
  link
}: TourCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Title and Duration */}
        <div className="mb-3">
          <h3 className="text-lg md:text-xl font-bold line-clamp-2 text-black">{title}</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm md:text-base text-gray-700">{location}</p>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{duration}</span>
          </div>
        </div>
        
        {/* Inclusions */}
        <div className="mb-3">
          <ul className="text-gray-600 text-sm">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start mb-1">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-1.5 mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Activities */}
        <div className="mb-4">
          <ul className="text-blue-600 text-sm">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {activity}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price Section */}
        <div className="border-t pt-3 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">This price is lower than the average price in November</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">₹{formatPrice(price)}</span>
                <span className="text-sm text-gray-600 ml-1">/Person</span>
              </div>
              <p className="text-xs text-gray-500">Total Price ₹{formatPrice(totalPrice)}</p>
            </div>
            <Link 
              href={id ? `/packages/${id}` : (link || '/packages')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;