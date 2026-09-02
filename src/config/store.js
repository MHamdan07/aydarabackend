import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../data/store.json');

// Ensure data folder exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initial Curated Luxury Data for AYDARA
export const initialData = {
  settings: {
    brandName: "AYDARA",
    tagline: "Luxury without excess.",
    logoUrl: "/brand/aydara-logo-gold.svg",
    logoWhiteUrl: "/brand/aydara-logo-white.svg",
    faviconUrl: "/favicon.svg",
    currency: "PKR",
    currencySymbol: "₨",
    exchangeRates: { PKR: 1.0 },
    supportedCurrencies: ["PKR"],
    contactEmail: "concierge@aydara.com",
    phone: "+1 (800) 492-3272",
    address: "740 Madison Avenue, New York, NY 10065",
    socialLinks: {
      instagram: "https://instagram.com/aydara.official",
      pinterest: "https://pinterest.com/aydara",
      tiktok: "https://tiktok.com/@aydara"
    },
    shipping: {
      freeShippingThreshold: 300,
      standardFee: 25,
      expressFee: 45
    },
    updatedAt: new Date().toISOString()
  },
  homepage: {
    hero: {
      heading: "THE NEW FEMININITY",
      subtitle: "Fall / Winter 2026",
      description: "Elegance, Reimagined. Discover the sculpted silhouettes and noble silk fabrics of the season.",
      primaryCtaText: "DISCOVER COLLECTION",
      primaryCtaLink: "/featured-collection",
      secondaryCtaText: "EXPLORE LOOKBOOK",
      secondaryCtaLink: "/lookbook",
      desktopImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
      mobileImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
      updatedAt: new Date().toISOString()
    },
    purpleRoom: {
      heading: "THE PURPLE ROOM",
      subtitle: "Signature Evening Edit",
      description: "An exclusive edit of pieces designed to make an entrance. Rich velvets, liquid silks, and architectural drapery.",
      ctaText: "ENTER THE PURPLE ROOM",
      ctaLink: "/featured-collection",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
      productIds: ["prod-1", "prod-3", "prod-7", "prod-9"],
      updatedAt: new Date().toISOString()
    },
    editorialStory: {
      title: "THE ART OF BEING HER",
      statement: "Fashion is not simply what you wear. It is how you enter the room.",
      paragraph1: "AYDARA was founded on the conviction that true luxury requires no excess. Every piece is an exercise in sculptural precision, noble craftsmanship, and timeless feminine poise.",
      paragraph2: "Crafted in limited ateliers using Italian silk crepes, French lace, and bespoke architectural tailoring.",
      ctaText: "OUR STORY",
      ctaLink: "/about",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
      updatedAt: new Date().toISOString()
    },
    updatedAt: new Date().toISOString()
  },
  categories: [
    {
      id: "cat-1",
      slug: "new-in",
      name: "NEW IN",
      description: "The latest seasonal arrivals sculpted with modern poise.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
      order: 1,
      isActive: true
    },
    {
      id: "cat-2",
      slug: "featured-collection",
      name: "FEATURED COLLECTION",
      description: "Iconic evening wear, tailored blazers, and statement couture.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
      order: 2,
      isActive: true
    },
    {
      id: "cat-3",
      slug: "bridal-cloth",
      name: "BRIDAL CLOTH",
      description: "Ethereal bridal silhouettes, ivory silk gowns, and modern wedding tailoring.",
      image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1000&auto=format&fit=crop",
      order: 3,
      isActive: true
    },
    {
      id: "cat-4",
      slug: "best-sellers",
      name: "BEST SELLERS",
      description: "The quintessential pieces that define the house of AYDARA.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      order: 4,
      isActive: true
    },
    {
      id: "cat-5",
      slug: "bags",
      name: "BAGS",
      description: "Sculpted Italian leather handbags, minaudières, and gold-chain totes.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
      order: 5,
      isActive: true
    },
    {
      id: "cat-6",
      slug: "accessories",
      name: "ACCESSORIES",
      description: "Fine jewelry accents, silk scarves, and handcrafted leather belts.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      order: 6,
      isActive: true
    }
  ],
  products: [
    {
      id: "prod-1",
      name: "The Luna Silk Draped Gown",
      slug: "luna-silk-draped-gown",
      category: "new-in",
      categoryName: "NEW IN",
      price: 1850,
      salePrice: null,
      description: "Cut from ultra-heavy 40mm Italian mulberry silk satin. Features a bias-cut fluid silhouette with an architectural asymmetric neckline, low draped back, and a subtle train. Hand-finished rolled hems.",
      details: [
        "100% Mulberry Silk (Italian Mill)",
        "Asymmetrical draped neckline",
        "Concealed side zipper closure",
        "Dry clean only by luxury specialist",
        "Made in Milan, Italy"
      ],
      sizes: ["34 FR / 2 US", "36 FR / 4 US", "38 FR / 6 US", "40 FR / 8 US", "42 FR / 10 US"],
      colors: [
        { name: "Midnight Noir", hex: "#111111" },
        { name: "Royal Aubergine", hex: "#24112F" },
        { name: "Champagne Ivory", hex: "#F5F0E6" }
      ],
      stock: 18,
      variants: [
        { color: "Midnight Noir", size: "36 FR / 4 US", stock: 4 },
        { color: "Midnight Noir", size: "38 FR / 6 US", stock: 6 },
        { color: "Royal Aubergine", size: "36 FR / 4 US", stock: 3 },
        { color: "Royal Aubergine", size: "38 FR / 6 US", stock: 5 }
      ],
      images: [
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: true,
      status: "published",
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-2",
      name: "Sculpted Hourglass Wool Blazer",
      slug: "sculpted-hourglass-wool-blazer",
      category: "featured-collection",
      categoryName: "FEATURED COLLECTION",
      price: 1450,
      salePrice: null,
      description: "A masterclass in tailored architecture. Woven from pristine virgin wool with a cinched waistline, accentuated shoulders, and bespoke gold-engraved AYDARA button closures.",
      details: [
        "100% Virgin Wool, Cupro lining",
        "Structured peak lapel",
        "Single-breasted signature button",
        "Dry clean only",
        "Tailored in Paris"
      ],
      sizes: ["34 FR / 2 US", "36 FR / 4 US", "38 FR / 6 US", "40 FR / 8 US"],
      colors: [
        { name: "Onyx Black", hex: "#111111" },
        { name: "Chalk White", hex: "#FBFBFA" }
      ],
      stock: 14,
      variants: [
        { color: "Onyx Black", size: "36 FR / 4 US", stock: 5 },
        { color: "Onyx Black", size: "38 FR / 6 US", stock: 4 }
      ],
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: true,
      status: "published",
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-3",
      name: "The Aurelia Bridal Silk Column",
      slug: "aurelia-bridal-silk-column",
      category: "bridal-cloth",
      categoryName: "BRIDAL CLOTH",
      price: 3200,
      salePrice: null,
      description: "Timeless bridal elegance. Crafted from pure off-white silk crepe with an empire neckline, column drape, and detachable royal chiffon cape.",
      details: [
        "100% Silk Crepe de Chine",
        "Floor-length with removable cape",
        "Hand-sewn inner bustier support",
        "Bespoke bridal preservation boxing included",
        "Handcrafted in Lyon, France"
      ],
      sizes: ["34 FR / 2 US", "36 FR / 4 US", "38 FR / 6 US", "40 FR / 8 US", "42 FR / 10 US"],
      colors: [
        { name: "Alabaster Ivory", hex: "#FDFBF7" },
        { name: "Warm Pearl", hex: "#F5EFE6" }
      ],
      stock: 8,
      variants: [
        { color: "Alabaster Ivory", size: "36 FR / 4 US", stock: 3 },
        { color: "Alabaster Ivory", size: "38 FR / 6 US", stock: 3 }
      ],
      images: [
        "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: false,
      isBestSeller: true,
      isFeatured: true,
      status: "published",
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-4",
      name: "The Monogram Box Calfskin Clutch",
      slug: "monogram-box-calfskin-clutch",
      category: "bags",
      categoryName: "BAGS",
      price: 1250,
      salePrice: null,
      description: "Structured box silhouette crafted from box calf leather. Accented with the solid 24k gold-plated AYDARA monogram clasp and convertible snake chain.",
      details: [
        "100% Full-Grain Calfskin",
        "Lambskin leather lining",
        "Custom 24K gold-plated AY clasp",
        "Internal card slots and mirror",
        "Made in Florence, Italy"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Deep Purple / Aubergine", hex: "#24112F" },
        { name: "Black Noir", hex: "#111111" },
        { name: "Saddle Tan", hex: "#8B5A2B" }
      ],
      stock: 22,
      variants: [
        { color: "Deep Purple / Aubergine", size: "One Size", stock: 8 },
        { color: "Black Noir", size: "One Size", stock: 10 }
      ],
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: true,
      status: "published",
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-5",
      name: "The Noire Sculpted Velvet Slip",
      slug: "noire-sculpted-velvet-slip",
      category: "featured-collection",
      categoryName: "FEATURED COLLECTION",
      price: 1100,
      salePrice: null,
      description: "Plush silk-blend velvet with delicate micro-straps, cowl neckline, and a daring side slit. Designed to move with effortless sensuality.",
      details: [
        "82% Rayon, 18% Silk Velvet",
        "Side slit with interior silk binding",
        "Adjustable cross-back straps",
        "Dry clean only"
      ],
      sizes: ["34 FR / 2 US", "36 FR / 4 US", "38 FR / 6 US", "40 FR / 8 US"],
      colors: [
        { name: "Midnight Black", hex: "#111111" },
        { name: "Violet Royale", hex: "#24112F" }
      ],
      stock: 15,
      variants: [
        { color: "Midnight Black", size: "36 FR / 4 US", stock: 6 }
      ],
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: true,
      status: "published",
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-6",
      name: "Sculpted Gold AY Cuff",
      slug: "sculpted-gold-ay-cuff",
      category: "accessories",
      categoryName: "ACCESSORIES",
      price: 680,
      salePrice: null,
      description: "Bespoke architectural cuff cast in brass and dipped in 24-karat champagne gold vermeil. Features the signature geometric AY contour.",
      details: [
        "24K Champagne Gold Vermeil on Solid Brass",
        "Hand-polished mirror finish",
        "Laser-engraved AYDARA hallmark",
        "Signature velvet dust bag and box"
      ],
      sizes: ["Small (15cm)", "Medium (17cm)"],
      colors: [
        { name: "Champagne Gold", hex: "#C8A96B" },
        { name: "Platinum Silver", hex: "#E5E5E5" }
      ],
      stock: 25,
      variants: [
        { color: "Champagne Gold", size: "Small (15cm)", stock: 12 },
        { color: "Champagne Gold", size: "Medium (17cm)", stock: 10 }
      ],
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: false,
      status: "published",
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-7",
      name: "The Seraphina Tiered Chiffon Gown",
      slug: "seraphina-tiered-chiffon-gown",
      category: "bridal-cloth",
      categoryName: "BRIDAL CLOTH",
      price: 2890,
      salePrice: null,
      description: "A vision of ethereal romance. Cascading tiers of pleated silk chiffon, boned corset bodice, and delicate hand-gathered waist detailing.",
      details: [
        "100% Silk Chiffon",
        "Internal corset with flexible boning",
        "Semi-sheer skirt with tonal silk lining",
        "Made in Paris"
      ],
      sizes: ["34 FR / 2 US", "36 FR / 4 US", "38 FR / 6 US", "40 FR / 8 US"],
      colors: [
        { name: "Pure Ivory", hex: "#FFFFF8" }
      ],
      stock: 6,
      variants: [
        { color: "Pure Ivory", size: "36 FR / 4 US", stock: 3 },
        { color: "Pure Ivory", size: "38 FR / 6 US", stock: 2 }
      ],
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: false,
      isBestSeller: true,
      isFeatured: true,
      status: "published",
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-8",
      name: "The Vendôme Tote in Smooth Nappa",
      slug: "vendome-tote-in-smooth-nappa",
      category: "bags",
      categoryName: "BAGS",
      price: 1980,
      salePrice: null,
      description: "Spacious yet sculptural luxury day bag in supple Italian nappa leather. Features hand-painted edge finishes, magnetic bridge closure, and interior zippered pouch.",
      details: [
        "100% Italian Nappa Leather",
        "Suede microfibre lining",
        "Gold-plated hardware",
        "Dimensions: 38cm x 28cm x 15cm"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Ebony Noir", hex: "#111111" },
        { name: "Cream Biscotto", hex: "#EADCC9" }
      ],
      stock: 12,
      variants: [
        { color: "Ebony Noir", size: "One Size", stock: 7 },
        { color: "Cream Biscotto", size: "One Size", stock: 5 }
      ],
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
      ],
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: false,
      status: "published",
      createdAt: new Date().toISOString()
    }
  ],
  lookbooks: [
    {
      id: "look-1",
      number: "LOOK 01",
      title: "MIDNIGHT SILK",
      description: "A study in nocturnal allure. Fluid bias draping meets high-voltage confidence.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      productId: "prod-1",
      productSlug: "luna-silk-draped-gown",
      order: 1,
      isPublished: true
    },
    {
      id: "look-2",
      number: "LOOK 02",
      title: "THE POWER SILHOUETTE",
      description: "Architectural shoulders and pristine tailoring crafted from bespoke virgin wool.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      productId: "prod-2",
      productSlug: "sculpted-hourglass-wool-blazer",
      order: 2,
      isPublished: true
    },
    {
      id: "look-3",
      number: "LOOK 03",
      title: "ETHEREAL MODERNITY",
      description: "The new code of bridal serenity. Weightless silk crepe and clean sculptural contours.",
      image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1200&auto=format&fit=crop",
      productId: "prod-3",
      productSlug: "aurelia-bridal-silk-column",
      order: 3,
      isPublished: true
    },
    {
      id: "look-4",
      number: "LOOK 04",
      title: "GOLD ACCENTUATION",
      description: "Fine jewelry accents engineered to catch natural candlelight.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      productId: "prod-6",
      productSlug: "sculpted-gold-ay-cuff",
      order: 4,
      isPublished: true
    }
  ],
  orders: [],
  users: [
    {
      id: "admin-owner",
      name: "M Hamdan",
      email: "entermh07@gmail.com",
      role: "admin",
      createdAt: new Date().toISOString()
    }
  ]
};

// Store access helper
export const getStore = () => {
  try {
    let current;
    if (!fs.existsSync(DATA_FILE)) {
      current = { ...initialData };
      fs.writeFileSync(DATA_FILE, JSON.stringify(current, null, 2), 'utf8');
      return current;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    current = JSON.parse(raw);

    let needsSave = false;

    // Ensure admin user exists
    if (!current.users || !Array.isArray(current.users)) {
      current.users = [];
    }
    
    // Remove any demo accounts
    current.users = current.users.filter(u => u.email !== 'admin@aydara.com' && u.email !== 'client@aydara.com');

    // Ensure entermh07@gmail.com is set as Admin
    const ownerIndex = current.users.findIndex(u => u.email && u.email.toLowerCase() === 'entermh07@gmail.com');
    if (ownerIndex >= 0) {
      current.users[ownerIndex].role = 'admin';
    } else {
      current.users.push({
        id: 'admin-owner',
        name: 'M Hamdan',
        email: 'entermh07@gmail.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      });
    }
    needsSave = true;

    if (!current.orders) current.orders = [];
    if (!current.activityLogs) current.activityLogs = [];
    if (!current.settings) current.settings = { ...initialData.settings };
    if (!current.homepage) current.homepage = { ...initialData.homepage };

    if (needsSave) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(current, null, 2), 'utf8');
    }

    return current;
  } catch (err) {
    console.error('[AYDARA Store] Read error:', err);
    return initialData;
  }
};

export const saveStore = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('[AYDARA Store] Write error:', err);
    return false;
  }
};
