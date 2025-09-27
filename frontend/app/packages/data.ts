// Mock data for tour packages
export interface TourPackage {
  id: string;
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
  description: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  highlights: string[];
  accommodation: {
    name: string;
    location: string;
    rating: number;
    image: string;
  }[];
}

// Function to get tour package by ID
export function getTourPackageById(id: string): TourPackage | undefined {
  return tourPackages.find(pkg => pkg.id === id);
}

export const tourPackages: TourPackage[] = [
  {
    id: "magical-bali-experience",
    title: "Magical Bali Experience",
    location: "4N Kuta • 2N Ubud",
    duration: "6N/7D",
    nights: 6,
    days: 7,
    price: 48500,
    totalPrice: 97000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Round Trip Flights",
      "Airport Transfers",
      "Selected Meals",
      "4 Star Hotels",
      "6 Activities"
    ],
    activities: [
      "Ubud Tour",
      "Tanah Lot Temple",
      "Water Sports Package"
    ],
    description: "Experience the magic of Bali with our carefully curated 7-day package. Explore the cultural heart of Ubud and the vibrant beaches of Kuta. Visit ancient temples, enjoy thrilling water sports, and immerse yourself in the local culture. This package offers the perfect balance of adventure, relaxation, and cultural experiences.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        description: "Arrive at Ngurah Rai International Airport. Transfer to your hotel in Kuta. Rest and relax for the day. Evening welcome dinner at a local restaurant."
      },
      {
        day: 2,
        title: "Kuta Beach & Water Sports",
        description: "After breakfast, enjoy a full day of water sports at Kuta Beach including jet skiing, parasailing, and banana boat rides. Evening at leisure to explore Kuta's vibrant nightlife."
      },
      {
        day: 3,
        title: "Uluwatu Temple & Kecak Dance",
        description: "Morning at leisure. Afternoon visit to the clifftop Uluwatu Temple. Watch the spectacular Kecak fire dance performance at sunset. Dinner at a seafood restaurant in Jimbaran Bay."
      },
      {
        day: 4,
        title: "Tanah Lot & Bedugul Tour",
        description: "Full-day tour to Tanah Lot Temple, Bedugul, and the Jatiluwih Rice Terraces. Visit the Ulun Danu Beratan Temple on Lake Bratan. Return to Kuta in the evening."
      },
      {
        day: 5,
        title: "Transfer to Ubud",
        description: "After breakfast, check out from your Kuta hotel and transfer to Ubud. En route, visit the Tegenungan Waterfall and Goa Gajah (Elephant Cave). Check in at your Ubud hotel. Evening at leisure to explore Ubud town."
      },
      {
        day: 6,
        title: "Ubud Cultural Tour",
        description: "Full-day Ubud tour including the Sacred Monkey Forest Sanctuary, Ubud Palace, and Ubud Art Market. Afternoon visit to a traditional Balinese home and participate in a cooking class. Enjoy the dinner you prepared."
      },
      {
        day: 7,
        title: "Departure",
        description: "After breakfast, check out from your hotel. Last-minute shopping in Ubud. Transfer to Ngurah Rai International Airport for your departure flight."
      }
    ],
    highlights: [
      "Experience thrilling water sports at Kuta Beach",
      "Watch the mesmerizing Kecak dance at Uluwatu Temple",
      "Visit the iconic sea temple of Tanah Lot",
      "Explore the cultural heart of Bali in Ubud",
      "Meet the playful monkeys at the Sacred Monkey Forest",
      "Learn to cook traditional Balinese cuisine"
    ],
    accommodation: [
      {
        name: "Kuta Paradiso Hotel",
        location: "Kuta",
        rating: 4,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Alaya Resort Ubud",
        location: "Ubud",
        rating: 4,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "best-of-pattaya-bangkok",
    title: "Best of Pattaya & Bangkok Getaway",
    location: "3N Pattaya • 2N Bangkok",
    duration: "5N/6D",
    nights: 5,
    days: 6,
    price: 56730,
    totalPrice: 113460,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Round Trip Flights",
      "Airport Transfers",
      "Selected Meals",
      "4 Star Hotels",
      "5 Activities"
    ],
    activities: [
      "City Tour",
      "Coral Island",
      "Chao Phraya Dinner Cruise"
    ],
    description: "Discover the vibrant cities of Thailand with our 6-day Pattaya and Bangkok package. Enjoy the beautiful beaches of Pattaya and the bustling city life of Bangkok. Experience the perfect blend of relaxation, adventure, and cultural exploration in these two amazing destinations.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangkok & Transfer to Pattaya",
        description: "Arrive at Suvarnabhumi Airport, Bangkok. Meet and greet by our representative. Transfer to Pattaya (approximately 2 hours). Check in at your hotel. Evening at leisure to explore Pattaya's Walking Street."
      },
      {
        day: 2,
        title: "Coral Island Tour",
        description: "After breakfast, transfer to the pier for a speedboat ride to Coral Island (Koh Larn). Enjoy various beach activities and water sports (at additional cost). Return to Pattaya in the afternoon. Evening free for leisure."
      },
      {
        day: 3,
        title: "Pattaya City Tour",
        description: "Full-day Pattaya city tour including the Sanctuary of Truth, Nong Nooch Tropical Garden, and Pattaya Viewpoint. Evening Alcazar Cabaret Show (optional, at additional cost)."
      },
      {
        day: 4,
        title: "Transfer to Bangkok",
        description: "After breakfast, check out from your Pattaya hotel and transfer to Bangkok. Check in at your Bangkok hotel. Afternoon at leisure to explore the local markets. Evening Chao Phraya Dinner Cruise with entertainment."
      },
      {
        day: 5,
        title: "Bangkok City Tour",
        description: "Full-day Bangkok city tour including the Grand Palace, Wat Phra Kaew (Temple of the Emerald Buddha), Wat Pho (Temple of the Reclining Buddha), and Wat Arun (Temple of Dawn). Evening at leisure for shopping at MBK Center or Siam Paragon."
      },
      {
        day: 6,
        title: "Departure",
        description: "After breakfast, check out from your hotel. Last-minute shopping (if time permits). Transfer to Suvarnabhumi Airport for your departure flight."
      }
    ],
    highlights: [
      "Relax on the beautiful Coral Island beaches",
      "Marvel at the intricate architecture of the Sanctuary of Truth",
      "Enjoy a romantic dinner cruise on the Chao Phraya River",
      "Explore Bangkok's magnificent Grand Palace and temples",
      "Experience the vibrant nightlife of Pattaya's Walking Street",
      "Shop till you drop at Bangkok's famous shopping malls"
    ],
    accommodation: [
      {
        name: "Pattaya Sea View Hotel",
        location: "Pattaya",
        rating: 4,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Amara Bangkok Hotel",
        location: "Bangkok",
        rating: 4,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "european-dream-paris-switzerland",
    title: "European Dream: Paris & Switzerland",
    location: "3N Paris • 3N Zurich",
    duration: "6N/7D",
    nights: 6,
    days: 7,
    price: 89990,
    totalPrice: 179980,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Round Trip Flights",
      "Airport Transfers",
      "Daily Breakfast",
      "4 Star Hotels",
      "7 Activities"
    ],
    activities: [
      "Eiffel Tower Visit",
      "Mt. Titlis Excursion",
      "Seine River Cruise"
    ],
    description: "Experience the romance of Paris and the natural beauty of Switzerland in this 7-day European adventure. Visit iconic landmarks, enjoy breathtaking mountain views, and immerse yourself in the rich culture and history of these two stunning destinations.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paris",
        description: "Arrive at Charles de Gaulle Airport, Paris. Transfer to your hotel. Rest and relax. Evening orientation tour of Paris including the illuminated Eiffel Tower (viewed from outside)."
      },
      {
        day: 2,
        title: "Paris City Tour",
        description: "Full-day Paris city tour including the Eiffel Tower (2nd level), Arc de Triomphe, Champs-Élysées, and Place de la Concorde. Afternoon visit to the Louvre Museum. Evening Seine River cruise with dinner."
      },
      {
        day: 3,
        title: "Disneyland Paris",
        description: "Full-day excursion to Disneyland Paris. Enjoy the various attractions, shows, and parades at the theme park. Return to Paris in the evening."
      },
      {
        day: 4,
        title: "Paris to Zurich",
        description: "After breakfast, check out from your Paris hotel. Transfer to the airport for your flight to Zurich. Arrive in Zurich and transfer to your hotel. Evening at leisure to explore Zurich's Old Town."
      },
      {
        day: 5,
        title: "Mt. Titlis Excursion",
        description: "Full-day excursion to Mt. Titlis. Enjoy a cable car ride to the summit, visit the Ice Cave, and experience the Cliff Walk. Return to Zurich in the evening."
      },
      {
        day: 6,
        title: "Lucerne & Interlaken Tour",
        description: "Full-day tour to Lucerne and Interlaken. Visit the Lion Monument and Chapel Bridge in Lucerne. Free time in Interlaken to enjoy the views of the Jungfrau. Return to Zurich in the evening."
      },
      {
        day: 7,
        title: "Departure",
        description: "After breakfast, check out from your hotel. Transfer to Zurich Airport for your departure flight."
      }
    ],
    highlights: [
      "Ascend the iconic Eiffel Tower for panoramic views of Paris",
      "Explore the world-famous Louvre Museum and see the Mona Lisa",
      "Enjoy a magical day at Disneyland Paris",
      "Experience the thrill of the Mt. Titlis rotating cable car",
      "Walk across Europe's highest suspension bridge at Mt. Titlis",
      "Visit the picturesque towns of Lucerne and Interlaken"
    ],
    accommodation: [
      {
        name: "Hotel Mercure Paris Centre Eiffel Tower",
        location: "Paris",
        rating: 4,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Hotel Glockenhof Zürich",
        location: "Zurich",
        rating: 4,
        image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];