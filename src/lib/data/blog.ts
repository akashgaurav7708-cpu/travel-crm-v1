export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-kashmir",
    title: "Best Time to Visit Kashmir: A Seasonal Guide",
    excerpt: "Whether you love snow or blooming tulips, Kashmir has something for every season. Discover the best time for your trip.",
    content: "Kashmir, often referred to as 'Paradise on Earth,' is a destination that transforms beautifully with every season. Each month brings a unique charm to the valley, making it a year-round destination for travelers.\n\n### Spring (March to May)\nSpring is when the valley wakes up from its winter slumber. The famous Tulip Garden in Srinagar usually blooms in April, creating a riot of colors. This is the best time for garden enthusiasts and those who enjoy mild weather.\n\n### Summer (June to August)\nSummer is the peak tourist season. While the rest of India swelters in heat, Kashmir remains pleasant. It's the perfect time for trekking in Gurez or visiting the high-altitude meadows of Gulmarg and Sonamarg.\n\n### Autumn (September to November)\nAutumn, or 'Harud,' is the season of the Chinar trees. The leaves turn into shades of gold and orange, creating a magical atmosphere. This is also the time for saffron harvesting in Pampore.\n\n### Winter (December to February)\nFor snow lovers, winter is the time to be in Kashmir. Gulmarg becomes a world-class skiing destination. Experience the 'Chilla-i-Kalan' (the 40-day harshest winter period) with a warm cup of Kahwa by the fireplace.",
    image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=1200",
    author: "Bilu G",
    date: "May 15, 2024",
    category: "Travel Guide",
    readTime: "5 min read"
  },
  {
    slug: "offbeat-places-in-kashmir",
    title: "10 Offbeat Places in Kashmir You Must Visit",
    excerpt: "Go beyond Srinagar and Gulmarg. Explore the hidden gems like Gurez, Bangus, and Lolab Valley.",
    content: "While the traditional circuit of Srinagar-Gulmarg-Pahalgam is beautiful, the real soul of Kashmir lies in its remote valleys. These offbeat locations offer tranquility and raw natural beauty that is hard to find elsewhere.\n\n1. **Gurez Valley**: A land of the Shina people, Gurez is a breathtaking valley located near the LOC.\n2. **Bangus Valley**: A hidden paradise in Kupwara, perfect for nature lovers.\n3. **Lolab Valley**: Known for its fruit orchards and hospitable people.\n4. **Yusmarg**: A quiet meadow perfect for long walks and pony rides.",
    image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=1200",
    author: "Local Expert",
    date: "June 02, 2024",
    category: "Adventure",
    readTime: "8 min read"
  }
];
