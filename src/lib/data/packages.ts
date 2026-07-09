export interface Package {
  id: number;
  slug: string;
  name: string;
  price: string;
  duration: string;
  image: string;
  images: string[];
  rating: number;
  tags: string[];
  description: string;
  shortDescription: string;
  destinations: string[];
  bestSeason: string;
  hotelCategory: string;
  meals: string;
  transportation: string;
  inclusions: string[];
  exclusions: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  itinerary: {
    day: number;
    title: string;
    desc: string;
  }[];
}

export const packages: Package[] = [
  {
    id: 1,
    slug: "4-nights-5-days-kashmir",
    name: "4 Nights 5 Days Kashmir",
    price: "13,999",
    duration: "4N/5D",
    image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    tags: ["Family", "Budget"],
    description: "Discover the highlights of the Kashmir Valley in this compact yet comprehensive 5-day tour. Perfect for families looking for a quick getaway to paradise.",
    shortDescription: "Experience Srinagar, Gulmarg & Pahalgam in this popular budget-friendly package.",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
    bestSeason: "April to October",
    hotelCategory: "3 Star / Deluxe Houseboat",
    meals: "Breakfast & Dinner",
    transportation: "Private Sedan / SUV",
    inclusions: ["4 Nights Accommodation", "Daily Breakfast & Dinner", "Airport Transfers", "Private Car", "Shikara Ride"],
    exclusions: ["Airfare", "Personal Expenses", "Entry tickets to monuments", "Lunch", "Pony rides"],
    faqs: [
      { question: "Is this package suitable for families?", answer: "Yes, this is one of our most popular family packages covering the safest and most beautiful parts of Kashmir." },
      { question: "Can we add one more day to this?", answer: "Absolutely! We can customize the itinerary and add more days as per your preference." }
    ],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Arrival at Srinagar Airport. Transfer to Houseboat. Evening Shikara ride on Dal Lake." },
      { day: 2, title: "Srinagar to Gulmarg", desc: "Day trip to Gulmarg. Enjoy Gondola ride and snow activities. Return to Srinagar." },
      { day: 3, title: "Srinagar to Pahalgam", desc: "Drive to Pahalgam. Visit Saffron fields and Avantipura ruins. Overnight in Pahalgam." },
      { day: 4, title: "Pahalgam to Srinagar", desc: "Explore Aru and Betaab Valley. Drive back to Srinagar for overnight stay." },
      { day: 5, title: "Departure", desc: "Transfer to Srinagar Airport for your onward journey." }
    ]
  },
  {
    id: 2,
    slug: "5-nights-6-days-kashmir",
    name: "5 Nights 6 Days Kashmir",
    price: "16,999",
    duration: "5N/6D",
    image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 5.0,
    tags: ["Luxury", "Honeymoon"],
    description: "A luxurious 6-day escape to the most romantic spots in Kashmir. Features premium stays and personalized experiences.",
    shortDescription: "Our signature luxury retreat featuring the best of Srinagar, Sonamarg and Gulmarg.",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
    bestSeason: "Year Round",
    hotelCategory: "4 Star / Premium Houseboat",
    meals: "Breakfast & Dinner",
    transportation: "Private SUV (Innova/Xylo)",
    inclusions: ["5 Nights Premium Accommodation", "All Meals Included", "Luxury Private Car", "Gondola Tickets", "Private Shikara"],
    exclusions: ["Personal Expenses", "Tips", "Insurance"],
    faqs: [
      { question: "What hotels are included?", answer: "We use 4-star premium properties and super deluxe houseboats for this package." }
    ],
    itinerary: [
      { day: 1, title: "Srinagar Arrival", desc: "Warm welcome at airport. Check-in to Luxury Houseboat. High tea and Shikara ride." },
      { day: 2, title: "Sonamarg Excursion", desc: "Full day trip to the Meadow of Gold. Visit Thajiwas Glacier." },
      { day: 3, title: "Gulmarg Stay", desc: "Transfer to Gulmarg. Check-in to a luxury resort. Afternoon Gondola ride." },
      { day: 4, title: "Pahalgam Transfer", desc: "Scenic drive to Pahalgam. Evening at leisure by the Lidder River." },
      { day: 5, title: "Pahalgam Sightseeing", desc: "Visit the famous valleys of Pahalgam. Return to Srinagar." },
      { day: 6, title: "Departure", desc: "Final morning in Srinagar. Shopping and airport transfer." }
    ]
  },
  {
    id: 3,
    slug: "6-nights-7-days-kashmir",
    name: "6 Nights 7 Days Kashmir",
    price: "19,999",
    duration: "6N/7D",
    image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    tags: ["Adventure", "Group Tour"],
    description: "An extensive tour covering the best of Kashmir plus offbeat gems like Doodhpathri. Ideal for adventure seekers and groups.",
    shortDescription: "A comprehensive 7-day journey covering all major valleys and the hidden Doodhpathri.",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Doodhpathri"],
    bestSeason: "May to September",
    hotelCategory: "3 Star Deluxe",
    meals: "Breakfast & Dinner",
    transportation: "Tempo Traveller / Private SUV",
    inclusions: ["6 Nights Accommodation", "Breakfast & Dinner", "Group Transportation", "Local Guides", "Entry Permits"],
    exclusions: ["Lunches", "Pony rides", "Gondola tickets"],
    faqs: [
      { question: "Is Doodhpathri far from Srinagar?", answer: "It's about 2-3 hours drive from Srinagar and offers a very peaceful experience." }
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Meet and greet at Srinagar Airport. Transfer to hotel." },
      { day: 2, title: "Sonamarg", desc: "Day trip to Sonamarg. Optional pony ride to glacier." },
      { day: 3, title: "Gulmarg", desc: "Transfer to Gulmarg. Full day of skiing or Gondola rides." },
      { day: 4, title: "Pahalgam", desc: "Drive to Pahalgam via Saffron fields." },
      { day: 5, title: "Pahalgam Local", desc: "Visit Aru, Betaab and Chandanwari valleys." },
      { day: 6, title: "Doodhpathri", desc: "Excursion to the Meadow of Milk. Return to Srinagar." },
      { day: 7, title: "Departure", desc: "Transfer to Airport." }
    ]
  },
  {
    id: 4,
    slug: "honeymoon-special-package",
    name: "Honeymoon Special Package",
    price: "18,999",
    duration: "5N/6D",
    image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    tags: ["Honeymoon", "Luxury"],
    description: "Celebrate your love in the lap of Himalayas. Specially curated for couples with romantic dinners and petal decorations.",
    shortDescription: "Romantic stays, candle-light dinners, and flower decorations for a perfect honeymoon.",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
    bestSeason: "Year Round",
    hotelCategory: "4 Star / Premium Houseboat",
    meals: "Breakfast & Dinner",
    transportation: "Private Luxury Sedan",
    inclusions: ["Candle light dinner", "Cake", "Flower decoration", "Premium stays", "Private transfers"],
    exclusions: ["Airfare", "Personal items"],
    faqs: [
      { question: "Can we have a private candle light dinner?", answer: "Yes, we arrange private dinners by the lake or river depending on the weather." }
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Airport transfer. Evening Shikara ride with flowers." },
      { day: 2, title: "Srinagar Local", desc: "Visit Mughal Gardens. Evening walk by the lake." },
      { day: 3, title: "Gulmarg", desc: "Romantic day in the snows of Gulmarg." },
      { day: 4, title: "Pahalgam", desc: "Riverside stays and walks in Pahalgam." },
      { day: 5, title: "Return to Srinagar", desc: "Shopping and leisure time." },
      { day: 6, title: "Departure", desc: "End of a romantic journey." }
    ]
  },
  {
    id: 5,
    slug: "luxury-kashmir-experience",
    name: "Luxury Kashmir Experience",
    price: "34,999",
    duration: "7N/8D",
    image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 5.0,
    tags: ["Luxury", "Family"],
    description: "The ultimate Kashmir experience featuring stay in 5-star hotels and the most iconic houseboats. Unmatched comfort and style.",
    shortDescription: "Ultra-luxury tour with 5-star accommodations (Taj/Khyber) and premium services.",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Yusmarg"],
    bestSeason: "April to October",
    hotelCategory: "5 Star Hotels",
    meals: "All Meals Included",
    transportation: "Toyota Innova Crysta",
    inclusions: ["5-Star Hotels", "All meals", "Innova Crysta travel", "Professional Photographer", "Butler service"],
    exclusions: ["Personal expenses"],
    faqs: [
      { question: "Are Taj and Khyber guaranteed?", answer: "Subject to availability at the time of booking. We use the best 5-star properties." }
    ],
    itinerary: [
      { day: 1, title: "Grand Arrival", desc: "VIP airport pickup. Stay at The Taj Dal View or similar." },
      { day: 2, title: "Sonamarg in Style", desc: "Luxury day trip to Sonamarg." },
      { day: 3, title: "Gulmarg Luxury", desc: "Stay at The Khyber Resort. Gondola Phase 2 tickets included." },
      { day: 4, title: "Gulmarg Day 2", desc: "Leisure and spa at the resort." },
      { day: 5, title: "Pahalgam", desc: "Stay at Pine N Peak. Private riverside dinner." },
      { day: 6, title: "Yusmarg Excursion", desc: "Private trip to the hidden Yusmarg." },
      { day: 7, title: "Srinagar Heritage", desc: "Old city walk and specialized shopping tour." },
      { day: 8, title: "Departure", desc: "Transfer to Airport." }
    ]
  },
  {
    id: 6,
    slug: "gurez-valley-expedition",
    name: "Gurez Valley Expedition",
    price: "17,999",
    duration: "4N/5D",
    image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.7,
    tags: ["Offbeat", "Adventure"],
    description: "Explore the remote and breathtaking Gurez Valley. A journey into the land of the Shina people and the Kishanganga River.",
    shortDescription: "A rugged adventure to the remote Gurez valley and the Razdan Pass.",
    destinations: ["Srinagar", "Bandipora", "Razdan Pass", "Dawar", "Tulail"],
    bestSeason: "June to September",
    hotelCategory: "Standard / Guesthouse",
    meals: "Breakfast & Dinner",
    transportation: "Private 4x4 (Scorpio/Pajero)",
    inclusions: ["All Permits", "Homestays/Hotels", "Local Guide", "4x4 Vehicle", "Meals"],
    exclusions: ["Personal Gear", "Tips"],
    faqs: [
      { question: "Is Gurez safe for families?", answer: "Yes, Gurez is extremely safe and the people are very hospitable." }
    ],
    itinerary: [
      { day: 1, title: "Srinagar Arrival", desc: "Arrive in Srinagar. Briefing about the trip." },
      { day: 2, title: "Srinagar to Gurez", desc: "Long drive via Razdan Pass. Check-in at Dawar." },
      { day: 3, title: "Tulail Valley", desc: "Explore the upper reaches of Gurez. Visit local villages." },
      { day: 4, title: "Gurez to Srinagar", desc: "Drive back to Srinagar. Shopping in evening." },
      { day: 5, title: "Departure", desc: "Airport transfer." }
    ]
  }
];
