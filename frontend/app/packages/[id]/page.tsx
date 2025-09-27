import PackageDetailClient from "./PackageDetailClient";
import { api } from "../../../lib/api";
import Link from "next/link";

// Interface for package data from backend
interface Package {
  _id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: string;
  location: string;
  description: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  totalPrice: number;
  currency: string;
  mainImage: string;
  gallery: string[];
  activities: string[];
  highlights: string[];
  inclusions: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  // Policy and Terms data
  packageDetails: {
    dateChangePolicy: string;
    cancellationPolicy: string;
    refundPolicy: string;
    bookingPolicy: string;
  };
  detailedTermsAndConditions: {
    general: string[];
    booking: string[];
    cancellation: string[];
    refund: string[];
    travel: string[];
    health: string[];
    insurance: string[];
    liability: string[];
  };
  termsAndConditions: string[];
}

export default async function PackageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const response = await fetch(api.packages.getById(id), {
      cache: 'no-store' // Ensure fresh data on each request
    });
    
    if (!response.ok) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h1>
            <p className="text-gray-600 mb-6">The package you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link 
              href="/packages" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
            >
              Back to Packages
            </Link>
          </div>
        </div>
      );
    }
    
    const packageData: Package = await response.json();
    
    return <PackageDetailClient packageData={packageData} />;
  } catch (error) {
    console.error('Error fetching package:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading package</h1>
          <p className="text-gray-600 mb-6">There was an error loading the package details. Please try again later.</p>
          <Link 
            href="/packages" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }
}