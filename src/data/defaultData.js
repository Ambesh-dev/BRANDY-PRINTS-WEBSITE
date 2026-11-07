export const DEFAULT_SITE_SETTINGS = {
  brandName: "Brandy Prints",
  tagline: "Handcrafted Luxury Collector Kits & Elite Creator Merch",
  logoType: "text", // 'text' or 'image'
  logoText: "BRANDY PRINTS",
  logoImage: "",
  announcementActive: true,
  announcementText: "⚡ New Drop Live: AI Bunny Collector's Kits Now Shipping Worldwide! Custom channel orders open.",
  heroTitle: "Turn Your Brand & Channel Into An Elite Collector's Kit",
  heroSubtitle: "Handcrafted luxury unboxing kits for YouTubers, developers, ethical hackers, and visionary communities. Heavyweight matte boxes, die-cut vinyl stickers, VIP passes, custom stationery, and collector cards built to stun.",
  heroBadge: "Official Merch & Collector Kit Studio",
  youtubeChannelName: "Brandy Prints Studio",
  youtubeChannelUrl: "https://www.youtube.com",
  youtubeSubscribers: "50K+ Creators & Fans",
  youtubeVideoId: "dQw4w9WgXcQ", // embed video id
  whatsappNumber: "+919876543210",
  whatsappPrefillMessage: "Hi Brandy Prints! I checked out your website and I am interested in your Collector Kits.",
  contactEmail: "orders@brandyprints.com",
  instagramUrl: "https://instagram.com/brandyprints",
  currencySymbol: "₹",
  freeShippingThreshold: 999,
  adminPin: "2026"
};

export const DEFAULT_PRODUCTS = [
  {
    id: "prod-cyber-bunny-01",
    title: "AI Bunny Collector's Kit (Cyber Hacker Edition)",
    subtitle: "The Flagship Dark Neon Collector Box for Tech Enthusiasts",
    price: 1999,
    originalPrice: 2499,
    category: "Collector Kits",
    badge: "Bestseller Drop",
    image: "/images/kit-cyber-bunny.jpg",
    gallery: [
      "/images/kit-cyber-bunny.jpg",
      "/images/kit-girl-edition.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 64,
    edition: "Limited Cyber Run #001",
    themeColor: "cyan",
    description: "The definitive Cyber Edition Collector's Kit tailored for ethical hackers, AI developers, coders, and cyberpunk fans. Encased in a custom matte-finish rigid box featuring circuit graphics, premium cyber bunny mascot art, and filled with exclusive collectible desk goods.",
    itemsIncluded: [
      "1x Custom Rigid Magnetic Collector Box (Cyber Hacker Art)",
      "1x AI Bunny Gold Holographic Collector Card (Numbered)",
      "1x Die-Cut Vinyl Sticker Pack (12x Waterproof & UV-coated)",
      "1x Handwritten Tech Community Welcome Letter",
      "1x Dark Cyber Stamped Envelope with Wax-Seal Style Print",
      "3x Full-Color Cyber Sunset Art Card Prints (400 GSM)",
      "1x Collectible Stamp Sticker Sheet (9x micro stamps)",
      "4x VIP Access Passes & Ethical Hacking Tickets with Scannable QR",
      "2x Hacker To-Do List & Code Notes Tear-off Pads (100 Pages Total)",
      "1x Round Cyber Mascot Coaster & Custom Index Tabs"
    ],
    specs: {
      "Box Dimensions": "28 x 20 x 5.5 cm",
      "Box Material": "1200 GSM Hardboard with Velvet Soft-Touch Laminate",
      "Sticker Quality": "Waterproof Heavy Vinyl with Holographic Sheen",
      "Paper Stock": "350-400 GSM Art Board & 100 GSM Cream Paper",
      "Origin": "Designed & Handcrafted by Brandy Prints"
    }
  },
  {
    id: "prod-girl-tech-02",
    title: "AI Bunny Collector's Kit (Girl Tech Edition)",
    subtitle: "Pastel Cyberpunk & Neon Magenta Aesthetic Collector Box",
    price: 1999,
    originalPrice: 2499,
    category: "Collector Kits",
    badge: "Trending Drop",
    image: "/images/kit-girl-edition.jpg",
    gallery: [
      "/images/kit-girl-edition.jpg",
      "/images/kit-cyber-bunny.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
    edition: "Limited Magenta Run #002",
    themeColor: "pink",
    description: "The mesmerizing Girl Tech Edition Collector's Kit in vibrant neon magenta, purple, and kawaii cyberpunk styling. Created for female coders, anime lovers, digital artists, and creative tech learners wanting an aesthetic desk and unboxing experience.",
    itemsIncluded: [
      "1x Custom Neon Magenta Heavyweight Collector Box",
      "1x AI Bunny Girl Edition Foil Collector Card",
      "1x Kawaii Cyber Die-Cut Sticker Sheet (14x Gloss Stickers)",
      "1x Personalized Letter to Tech Friends with Pink Envelope",
      "3x Aesthetic Cityscape & Anime Art Card Prints",
      "1x Retro Style Pastel Stamp Sticker Set",
      "4x Masterclass & Community VIP Event Pass Tickets with QR Codes",
      "2x Pastel Grid & To-Do List Desk Pads (50 sheets each)",
      "1x Magenta Mascot Desk Coaster & Index Page Markers",
      "1x Collector's Checklist & Manifest Card"
    ],
    specs: {
      "Box Dimensions": "28 x 20 x 5.5 cm",
      "Box Material": "1200 GSM Hardboard with Soft-Touch Matte Coating",
      "Sticker Quality": "Waterproof High-Gloss Vinyl (Die-Cut)",
      "Paper Stock": "350-400 GSM Fine Art Board",
      "Origin": "Designed & Handcrafted by Brandy Prints"
    }
  },
  {
    id: "prod-custom-creator-03",
    title: "Custom YouTube & Creator Merch Kit (Bespoke Production)",
    subtitle: "Turn Your Mascot, Logo & Brand Into A Complete Unboxing Experience",
    price: 3499,
    originalPrice: 4299,
    category: "Custom Channel Merch",
    badge: "For Creators & YouTubers",
    image: "/images/kit-cyber-bunny.jpg",
    gallery: [
      "/images/kit-cyber-bunny.jpg",
      "/images/kit-girl-edition.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 38,
    edition: "Custom Made to Order",
    themeColor: "purple",
    description: "Are you a YouTuber, streamer, developer, or digital creator? Brandy Prints turns your channel branding into a high-end collector kit just like our AI Bunny kits. We handle 3D box engineering, die-cut sticker stamping, custom ticket passes, letters, and complete assembly.",
    itemsIncluded: [
      "Custom Branded Rigid Box with your Channel Logo & Art",
      "Die-Cut Stickers tailored with your channel emotes & mascots",
      "Custom Ticket Passes linking directly to your YouTube / Discord QRs",
      "Personalized Thank-You Letters for your top supporters or members",
      "Custom Printed Desk Pads & Planner Sheets",
      "Collector Card with custom numbering (e.g. #001 / 100)",
      "Dedicated 1-on-1 Designer Consultation before production",
      "Sample Prototype Approval with 4K video preview"
    ],
    specs: {
      "Minimum Order": "Starts from just 10 kits (Sample single unit available)",
      "Turnaround Time": "7-12 business days",
      "Customization": "100% full custom print inside & out",
      "Packaging": "Bubble wrapped & shipping-ready for your fans"
    }
  },
  {
    id: "prod-cyber-stickers-04",
    title: "AI Bunny Cyber Sticker Sheet (Pack of 14 Vinyl Stickers)",
    subtitle: "Waterproof, Scratch-Resistant & Holographic Vinyl",
    price: 349,
    originalPrice: 499,
    category: "Sticker Packs",
    badge: "Hot Accessory",
    image: "/images/kit-cyber-bunny.jpg",
    gallery: ["/images/kit-cyber-bunny.jpg"],
    inStock: true,
    rating: 4.8,
    reviewsCount: 112,
    edition: "Cyber Stickers v1",
    themeColor: "cyan",
    description: "Ultra-thick, UV-coated die-cut vinyl stickers built to endure on laptops, iPad covers, mechanical keyboards, water bottles, and PC cases. Includes bunny mascot badges, hacker terminals, and tech slogans.",
    itemsIncluded: [
      "14x Unique Die-Cut Vinyl Stickers",
      "High-Tack Adhesive (leaves zero residue upon removal)",
      "Waterproof, Weatherproof & Heat-Resistant UV Coating"
    ],
    specs: {
      "Material": "3M Vinyl with UV Gloss Shield",
      "Quantity": "14 stickers per sheet",
      "Average Size": "5cm to 8cm each"
    }
  },
  {
    id: "prod-vip-passes-05",
    title: "Creator VIP Ticket Passes & Access Badges (Set of 6)",
    subtitle: "Heavyweight Gold-Foil Ticket Cards with Scannable QR Codes",
    price: 449,
    originalPrice: 599,
    category: "VIP Passes & Cards",
    badge: "Collector Favorite",
    image: "/images/kit-cyber-bunny.jpg",
    gallery: ["/images/kit-cyber-bunny.jpg"],
    inStock: true,
    rating: 4.9,
    reviewsCount: 43,
    edition: "Access Pass Series",
    themeColor: "cyan",
    description: "Authentic event-style admission passes and collectible tickets inspired by developer conferences, gaming arenas, and exclusive masterclasses. Scannable QR codes link to secret community perks.",
    itemsIncluded: [
      "1x AI Bunny Access Pass (All Modules)",
      "1x Ethical Hacking Workshop VIP Ticket",
      "1x AI Tools Masterclass Special Pass",
      "1x Community Lifetime Member Ticket",
      "2x Golden Holographic Admit-One Ticket Cards"
    ],
    specs: {
      "Paper Stock": "400 GSM Art Board with Die-Cut Perforated Edges",
      "Finish": "Matte Texture with Metallic Stamped Accents"
    }
  },
  {
    id: "prod-notepads-06",
    title: "Terminal Cyber Grid & To-Do List Notepad Duo",
    subtitle: "50-Sheet Tear-Off Desk Pads for Daily Sprints & Coding Notes",
    price: 299,
    originalPrice: 399,
    category: "Stationery & Notepads",
    badge: "Desk Essential",
    image: "/images/kit-cyber-bunny.jpg",
    gallery: ["/images/kit-cyber-bunny.jpg"],
    inStock: true,
    rating: 4.7,
    reviewsCount: 36,
    edition: "Productivity Drop",
    themeColor: "cyan",
    description: "Designed for desk setups that demand high productivity and aesthetic flair. Features an ethical hacking terminal to-do checklist and an AI Bunny isometric dot-grid notes pad.",
    itemsIncluded: [
      "1x 'To-Do List' Code Sprint Notepad (50 Sheets)",
      "1x 'Terminal Notes' Dot Grid Notepad (50 Sheets)"
    ],
    specs: {
      "Paper": "100 GSM Smooth Ivory Cream Paper (No Ink Bleed)",
      "Binding": "Clean Glue-Top Tear-off with Hardboard Backing",
      "Dimensions": "15 x 8 cm"
    }
  }
];

export const CATEGORIES = [
  "All",
  "Collector Kits",
  "Custom Channel Merch",
  "Sticker Packs",
  "VIP Passes & Cards",
  "Stationery & Notepads"
];

export const DEFAULT_INQUIRIES = [
  {
    id: "inq-101",
    customerName: "Aman Sharma",
    channelName: "TechCoder Hindi (120K Subs)",
    email: "aman@techcoder.in",
    whatsapp: "+91 9811223344",
    kitStyle: "Cyber / Tech Edition",
    estimatedQuantity: "50 Kits",
    notes: "Want custom collector box for my channel milestone and top members. Loved the AI Bunny kit unboxing!",
    date: "2026-11-06",
    status: "New"
  },
  {
    id: "inq-102",
    customerName: "Priya Nair",
    channelName: "DesignWithPriya (45K Subs)",
    email: "priya@designwithpriya.com",
    whatsapp: "+91 9722334455",
    kitStyle: "Pink / Aesthetic Kawaii",
    estimatedQuantity: "25 Kits",
    notes: "Looking to make aesthetic merch boxes for our UX cohort graduation with stickers and gold tickets.",
    date: "2026-11-05",
    status: "In Discussion"
  }
];

export const TESTIMONIALS = [
  {
    name: "Vikram R.",
    role: "Ethical Hacking YouTuber (85K Subs)",
    comment: "The AI Bunny Cyber Kit quality is insane! The rigid box, the holographic foil cards, and the scannable QR ticket passes look like something Apple or Razer would make. My audience went crazy during the unboxing!",
    rating: 5,
    tag: "Verified Creator"
  },
  {
    name: "Sneha Kapoor",
    role: "Full-Stack Dev & Tech Creator",
    comment: "Ordered the Girl Tech Edition. The magenta tones and soft-touch box are beyond gorgeous. Everything from the envelopes to the vinyl stickers feels ultra luxury. Brandy Prints is the real deal.",
    rating: 5,
    tag: "Verified Buyer"
  },
  {
    name: "Rahul Verma",
    role: "Founder, ByteClan Community",
    comment: "We partnered with Brandy Prints for 100 custom creator kits for our hackathon winners. The turnaround time and packaging quality blew everyone away. 10/10 recommended!",
    rating: 5,
    tag: "Custom Order Client"
  }
];
