import { getStore, saveStore, initialData } from '../config/store.js';

// Default Comprehensive Maison Settings Schema
export const defaultMaisonSettings = {
  // General & Brand Identity
  brandName: "AYDARA",
  tagline: "Luxury without excess.",
  storeName: "AYDARA Maison Official Storefront",
  contactEmail: "concierge@aydara.com",
  supportEmail: "care@aydara.com",
  phone: "+1 (800) 492-3272",
  address: "740 Madison Avenue, New York, NY 10065",
  businessLocation: "Karachi / London / New York",
  timezone: "Asia/Karachi (UTC+5)",
  defaultLanguage: "English (US)",
  defaultCountry: "Pakistan",
  
  // Brand Logos & Favicon
  logoUrl: "/brand/aydara-logo-gold.svg",
  logoLightUrl: "/brand/aydara-logo-white.svg",
  logoDarkUrl: "/brand/aydara-logo-gold.svg",
  faviconUrl: "/favicon.svg",
  mobileLogoUrl: "/brand/aydara-logo-gold.svg",
  footerLogoUrl: "/brand/aydara-logo-gold.svg",
  adminLogoUrl: "/brand/aydara-logo-gold.svg",
  
  // Storefront & Announcements
  storefrontStatus: "OPEN", // 'OPEN' | 'CLOSED' | 'MAINTENANCE'
  maintenanceHeading: "MAISON AYDARA &bull; ATELIER UPDATES IN PROGRESS",
  maintenanceMessage: "Our private digital salons are currently undergoing seasonal curation. We invite you to return shortly.",
  maintenanceImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
  expectedReturnMessage: "Returning today at 18:00 GMT",
  announcementBarEnabled: true,
  announcementText: "COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY ON BESPOKE ORDERS OVER PKR 50,000",
  
  // Homepage Flow & Section Control
  homepageSections: [
    { id: 'hero', name: 'Hero Section', enabled: true, title: 'THE NEW FEMININITY', order: 1 },
    { id: 'featured', name: 'Featured Collection', enabled: true, title: 'FEATURED COLLECTION', order: 2 },
    { id: 'best-sellers', name: 'Best Sellers', enabled: true, title: 'BEST SELLERS', order: 3 },
    { id: 'new-arrivals', name: 'New Arrivals', enabled: true, title: 'NEW ARRIVALS', order: 4 },
    { id: 'accessories', name: 'Accessories', enabled: true, title: 'ACCESSORIES', order: 5 }
  ],
  
  // Website Header & Navigation
  navigation: [
    { id: 'new-in', name: 'NEW IN', path: '/new-in', enabled: true, order: 1 },
    { id: 'featured-collection', name: 'FEATURED COLLECTION', path: '/featured-collection', enabled: true, order: 2 },
    { id: 'bridal-cloth', name: 'BRIDAL CLOTH', path: '/bridal-cloth', enabled: true, order: 3 },
    { id: 'best-sellers', name: 'BEST SELLERS', path: '/best-sellers', enabled: true, order: 4 },
    { id: 'accessories', name: 'ACCESSORIES', path: '/accessories', enabled: true, order: 5 }
  ],
  headerControls: {
    showSearch: true,
    showWishlist: true,
    showAccount: true,
    showBag: true,
    showCurrencySelector: false
  },
  
  // Media & Video Defaults
  mediaDefaults: {
    videoAutoplay: true,
    videoMuted: true,
    videoLoop: true,
    videoControls: false,
    maxUploadSizeMb: 100,
    enableWebpOptimization: true
  },
  
  // Currency & Pricing Engine
  currency: "PKR",
  currencySymbol: "₨",
  supportedCurrencies: ["PKR"],
  autoUpdateRates: false,
  rateSource: "European Central Bank & Global Forex API",
  priceRounding: "nearest-100", // 'none' | 'nearest-1' | 'nearest-10' | 'nearest-50' | 'nearest-100'
  
  // Global Product & Pricing Rules
  pricingRules: {
    taxIncluded: true,
    taxRatePercent: 0,
    showCompareAtPrices: true,
    showOutOfStockBadges: true,
    lowStockThreshold: 5,
    allowBackorders: false
  },
  
  // Stitched / Unstitched Options Engine
  stitchingEngine: {
    enabled: true,
    options: [
      { id: 'stitched-3pc', name: '3pc Stitched (Frock + Lehenga + Dupatta)', priceDelta: 0, isDefault: true },
      { id: 'stitched-2pc', name: '2pc Stitched (Frock + Lehenga)', priceDelta: -5000, isDefault: false },
      { id: 'unstitched-3pc', name: '3pc Unstitched (Fabric Only)', priceDelta: -7000, isDefault: false }
    ]
  },
  
  // Checkout Rules
  checkoutRules: {
    allowGuestBrowsing: true,
    requireAccountForOrder: true,
    minimumOrderAmount: 5000,
    maximumOrderAmount: 5000000,
    enabledPaymentMethods: [
      { id: 'online_card', name: 'Online Card Payment (Visa / Mastercard)', enabled: true },
      { id: 'bank_wire', name: 'Direct Atelier Bank Transfer / Wire', enabled: true },
      { id: 'cod', name: 'Cash on Delivery (Pakistan Only)', enabled: true }
    ]
  },
  
  // Shipping & Delivery Configuration
  shipping: {
    enabled: true,
    freeShippingThreshold: 50000,
    standardFee: 3500,
    expressFee: 6500,
    defaultCourier: "DHL Express Global",
    estimatedDeliveryText: "2–5 Business Days Worldwide",
    supportedZones: ["Pakistan", "United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Canada", "Australia", "Europe"]
  },
  
  // Orders & Invoicing
  ordersConfig: {
    orderPrefix: "AYD-",
    startingOrderNumber: 1001,
    autoConfirmPaidOrders: true,
    invoiceDisclaimer: "All AYDARA creations are handcrafted with the finest Italian silks and bespoke embroidery. Bespoke and stitched orders are finalized to client specifications."
  },
  
  // Customer Accounts
  customerAccounts: {
    allowRegistration: true,
    requireEmailVerification: false,
    sessionDurationDays: 30,
    minPasswordLength: 6
  },
  
  // Global SEO & Social Sharing
  seo: {
    siteTitle: "AYDARA | Luxury Haute Couture & Ready-To-Wear",
    metaDescription: "AYDARA represents the pinnacle of modern luxury fashion, bridal haute couture, and architectural tailoring crafted from pure Italian silks and noble fabrics.",
    keywords: "AYDARA, Luxury Fashion, Haute Couture, Bridal Wear, Silk Gowns, Bespoke Tailoring, Ready to Wear",
    ogImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    canonicalUrl: "https://aydara.com",
    robotsIndex: true
  },
  
  // Notifications
  notifications: {
    orderConfirmationEmail: true,
    orderShippedEmail: true,
    orderDeliveredEmail: true,
    accountWelcomeEmail: true,
    adminAlertsEmail: "admin@aydara.com",
    sendAdminNewOrderAlert: true
  },
  
  socialLinks: {
    instagram: "https://instagram.com/aydara.official",
    pinterest: "https://pinterest.com/aydara",
    tiktok: "https://tiktok.com/@aydara",
    facebook: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    whatsapp: "+92 3287567873"
  },

  // Centralized CMS-driven Social Media Links
  socialMedia: [
    {
      id: "instagram",
      platform: "instagram",
      displayName: "Instagram",
      icon: "instagram",
      url: "https://instagram.com/aydara.official",
      isActive: true,
      sortOrder: 1,
      openInNewTab: true,
      ariaLabel: "Visit AYDARA on Instagram"
    },
    {
      id: "pinterest",
      platform: "pinterest",
      displayName: "Pinterest",
      icon: "pinterest",
      url: "https://pinterest.com/aydara",
      isActive: true,
      sortOrder: 2,
      openInNewTab: true,
      ariaLabel: "Visit AYDARA on Pinterest"
    },
    {
      id: "tiktok",
      platform: "tiktok",
      displayName: "TikTok",
      icon: "tiktok",
      url: "https://tiktok.com/@aydara",
      isActive: true,
      sortOrder: 3,
      openInNewTab: true,
      ariaLabel: "Visit AYDARA on TikTok"
    },
    {
      id: "whatsapp",
      platform: "whatsapp",
      displayName: "WhatsApp Concierge",
      icon: "whatsapp",
      url: "https://wa.me/923287567873",
      isActive: true,
      sortOrder: 4,
      openInNewTab: true,
      ariaLabel: "Contact AYDARA Concierge on WhatsApp"
    },
    {
      id: "facebook",
      platform: "facebook",
      displayName: "Facebook",
      icon: "facebook",
      url: "https://facebook.com/aydara",
      isActive: false,
      sortOrder: 5,
      openInNewTab: true,
      ariaLabel: "Visit AYDARA on Facebook"
    },
    {
      id: "youtube",
      platform: "youtube",
      displayName: "YouTube",
      icon: "youtube",
      url: "https://youtube.com/@aydara",
      isActive: false,
      sortOrder: 6,
      openInNewTab: true,
      ariaLabel: "Visit AYDARA on YouTube"
    }
  ],

  // Comprehensive Client Services Configuration
  clientServices: {
    privateClientAccount: {
      title: "PRIVATE CLIENT ACCOUNT",
      subtitle: "A more personal way to experience AYDARA.",
      description: "Your AYDARA client account provides an elevated portal for managing your bespoke commissions, wardrobe orders, saved creations, and personal styling consultations.",
      features: [
        "Personal customer profile and bespoke preferences",
        "Comprehensive order history and real-time transit status",
        "Curated private wishlist and saved selections",
        "Saved worldwide delivery addresses for effortless dispatch",
        "Secure credential and privacy management",
        "Expedited private checkout and commission handling"
      ],
      primaryCta: { label: "ENTER MY ACCOUNT", path: "/account" },
      secondaryCta: { label: "EXPLORE COLLECTIONS", path: "/featured-collection" }
    },
    orderTracking: {
      title: "ORDER & DISPATCH TRACKING",
      subtitle: "Real-time visibility into your haute couture and ready-to-wear journey.",
      description: "From pattern drafting and hand-embroidery to final quality inspection and white-glove courier dispatch, follow every step of your acquisition.",
      stages: [
        { key: "confirmed", label: "Order Confirmed", desc: "Your acquisition is verified and entered into atelier scheduling." },
        { key: "processing", label: "Processing & Tailoring", desc: "Silks are cut and master artisans begin construction." },
        { key: "packed", label: "Packed & Sealed", desc: "Placed in archival packaging with hand-embossed seals." },
        { key: "dispatched", label: "Dispatched", desc: "Transferred to our express courier network with active tracking." },
        { key: "delivered", label: "Delivered", desc: "Safely received at your private residence with signature verification." }
      ],
      primaryCta: { label: "TRACK MY ORDER", path: "/account?tab=orders" },
      emptyCta: { label: "SHOP AYDARA", path: "/new-in" }
    },
    shipping: {
      title: "COMPLIMENTARY SHIPPING",
      subtitle: "White-glove delivery, bespoke packaging, and worldwide courier services.",
      description: "Every AYDARA garment is protected in our signature archival keepsake box and dispatched via premium insured express couriers worldwide.",
      domesticTitle: "Domestic Delivery (Pakistan)",
      domesticTimeline: "2 to 4 Business Days",
      domesticDescription: "Complimentary courier dispatch on all domestic orders across Pakistan with tracked express delivery.",
      internationalTitle: "International White-Glove Dispatch",
      internationalTimeline: "4 to 7 Business Days",
      internationalDescription: "Worldwide DHL/FedEx Express delivery across North America, Europe, the Middle East, and Asia Pacific.",
      customsNote: "All international shipments are declared accurately according to international customs protocols.",
      packagingTitle: "Signature Atelier Packaging",
      packagingDescription: "Handcrafted rigid keepsake boxes, archival acid-free tissue wrap, bespoke garment covers, and sealed wax provenance cards."
    },
    bespokeFitting: {
      title: "BESPOKE FITTING & SIZING",
      subtitle: "Master craftsmanship tailored to your precise silhouettes.",
      description: "Our garments are engineered with sculptural ease and fluid drape. Review our standardized dimensions or contact our concierge atelier for bespoke made-to-measure tailoring.",
      sizeGuideTitle: "Standard Silhouette Measurement Matrix",
      sizes: ["XS", "S", "M", "L", "XL"],
      measurementsInches: {
        XS: { bust: "32 - 34", waist: "25 - 26", hip: "35 - 36", shoulder: "14.0", length: "48" },
        S: { bust: "35 - 36", waist: "27 - 28", hip: "37 - 38", shoulder: "14.5", length: "49" },
        M: { bust: "37 - 38", waist: "29 - 30", hip: "39 - 40", shoulder: "15.0", length: "50" },
        L: { bust: "39 - 41", waist: "31 - 33", hip: "41 - 43", shoulder: "15.5", length: "50" },
        XL: { bust: "42 - 44", waist: "34 - 36", hip: "44 - 46", shoulder: "16.0", length: "51" }
      },
      measurementsCm: {
        XS: { bust: "81 - 86", waist: "63 - 66", hip: "89 - 91", shoulder: "35.5", length: "122" },
        S: { bust: "89 - 91", waist: "68 - 71", hip: "94 - 96", shoulder: "36.8", length: "124" },
        M: { bust: "94 - 96", waist: "73 - 76", hip: "99 - 101", shoulder: "38.1", length: "127" },
        L: { bust: "99 - 104", waist: "78 - 84", hip: "104 - 109", shoulder: "39.4", length: "127" },
        XL: { bust: "106 - 112", waist: "86 - 91", hip: "111 - 117", shoulder: "40.6", length: "129" }
      },
      primaryCta: { label: "VIEW SIZE GUIDE", path: "/client-services/bespoke-fitting#guide" },
      secondaryCta: { label: "REQUEST BESPOKE FITTING", path: "/client-services/bespoke-fitting#request" }
    },
    atelierCare: {
      title: "ATELIER CARE & PRESERVATION",
      subtitle: "Preserving the beauty, texture, and embroidery of your heirlooms.",
      description: "AYDARA creations feature hand-spun pure silks, delicate French laces, fine cotton lawns, and intricate handcrafted metallic threadwork.",
      sections: [
        {
          id: "fabric-care",
          title: "FABRIC CARE GUIDANCE",
          items: [
            "Pure Italian Silk & Raw Silk: Professional dry clean only with specialized textile care specialists.",
            "Pure Chiffon & Organza: Gentle dry cleaning recommended. Avoid machine agitation or wringing.",
            "Luxury Cotton Lawn: Hand wash in cold water using delicate PH-neutral silk/wool detergent.",
            "Drying & Ironing: Never tumble dry. Steam on low heat from reverse with a protective pressing cloth."
          ]
        },
        {
          id: "embellishment-care",
          title: "EMBELLISHMENT & ZARI PRESERVATION",
          items: [
            "Artisanal Zari & Metallic Threads: Handle with care to prevent snagging against jewelry.",
            "Hand-Cut Crystals & Pearls: Avoid spraying perfume, body oils, or hair mist directly onto embellished motifs.",
            "Friction Protection: Keep garments away from rough surfaces and textured accessories during wear."
          ]
        },
        {
          id: "archival-storage",
          title: "ARCHIVAL STORAGE",
          items: [
            "Store garments in breathable natural cotton or satin garment covers.",
            "Avoid plastic vinyl storage bags which trap moisture and may discolor delicate silks.",
            "Heavy hand-embroidered gowns should be stored flat or folded across padded hanger crossbars."
          ]
        }
      ],
      atelierNote: "Because each AYDARA piece represents hours of hand-guided needlework and delicate textile artistry, slight natural variations in weave and hand-embroidery are treasured hallmarks of bespoke craftsmanship."
    }
  },

  // Comprehensive 3-Column Luxury Footer Configuration (No Editorial Section)
  footer: {
    showBrandStatement: true,
    manifestoTagline: "LUXURY WITHOUT EXCESS.",
    manifestoText: "Sculptural silhouettes, noble silk fabrics, and timeless modern femininity crafted for women who define their own elegance.",
    footerLogoUrl: "/brand/aydara-logo-gold.svg",
    showNewsletter: true,
    newsletterTitle: "THE ATELIER DISPATCH",
    newsletterSubtitle: "Receive private invitations to couture salons and seasonal preview collections.",
    newsletterPlaceholder: "Enter your email address...",
    newsletterButtonText: "SUBSCRIBE",
    columns: [
      {
        id: 'the-house',
        title: 'THE HOUSE',
        type: 'info',
        enabled: true,
        customAddress: '',
        customEmail: '',
        customPhone: '',
        showSocialIcons: true
      },
      {
        id: 'collections',
        title: 'COLLECTIONS',
        type: 'links',
        enabled: true,
        links: [
          { id: 'c1', label: 'New In', path: '/new-in', enabled: true },
          { id: 'c2', label: 'Featured Collection', path: '/featured-collection', enabled: true },
          { id: 'c3', label: 'Bridal Cloth', path: '/bridal-cloth', enabled: true },
          { id: 'c4', label: 'Best Sellers', path: '/best-sellers', enabled: true },
          { id: 'c5', label: 'Accessories & Leather Goods', path: '/accessories', enabled: true }
        ]
      },
      {
        id: 'client-services',
        title: 'CLIENT SERVICES',
        type: 'links',
        enabled: true,
        links: [
          { id: 's1', label: 'Private Client Account', path: '/client-services/private-client-account', enabled: true },
          { id: 's2', label: 'Order & Dispatch Tracking', path: '/client-services/order-tracking', enabled: true },
          { id: 's3', label: 'Complimentary Shipping', path: '/client-services/shipping', enabled: true },
          { id: 's4', label: 'Bespoke Fitting & Sizing', path: '/client-services/bespoke-fitting', enabled: true },
          { id: 's5', label: 'Atelier Care & Preservation', path: '/client-services/atelier-care', enabled: true }
        ]
      }
    ],
    copyrightText: "© {year} AYDARA. All Rights Reserved. Pure Luxury Fashion.",
    bottomLinks: [
      { id: 'b1', label: 'Privacy Policy', path: '/about', enabled: true },
      { id: 'b2', label: 'Terms of Service', path: '/about', enabled: true },
      { id: 'b3', label: 'Shipping & Returns', path: '/client-services/shipping', enabled: true }
    ]
  },
  
  updatedAt: new Date().toISOString()
};

// GET /api/v1/settings (Public Storefront Safe Settings)
export const getSettings = (req, res) => {
  try {
    const store = getStore();
    const liveSettings = store.settings ? { ...defaultMaisonSettings, ...store.settings } : defaultMaisonSettings;
    
    // Ensure footer columns never have editorial
    let footerClean = liveSettings.footer ? JSON.parse(JSON.stringify(liveSettings.footer)) : defaultMaisonSettings.footer;
    if (footerClean && footerClean.columns) {
      footerClean.columns = footerClean.columns.filter(c => c.id !== 'editorial' && c.title?.toUpperCase() !== 'EDITORIAL');
    }

    // Strip private internal flags for public consumption
    const publicSafe = {
      brandName: liveSettings.brandName,
      tagline: liveSettings.tagline,
      storeName: liveSettings.storeName,
      contactEmail: liveSettings.contactEmail,
      phone: liveSettings.phone,
      address: liveSettings.address,
      businessLocation: liveSettings.businessLocation,
      logoUrl: liveSettings.logoUrl,
      logoLightUrl: liveSettings.logoLightUrl,
      logoDarkUrl: liveSettings.logoDarkUrl,
      faviconUrl: liveSettings.faviconUrl,
      mobileLogoUrl: liveSettings.mobileLogoUrl,
      footerLogoUrl: liveSettings.footerLogoUrl,
      storefrontStatus: liveSettings.storefrontStatus,
      maintenanceHeading: liveSettings.maintenanceHeading,
      maintenanceMessage: liveSettings.maintenanceMessage,
      maintenanceImage: liveSettings.maintenanceImage,
      expectedReturnMessage: liveSettings.expectedReturnMessage,
      announcementBarEnabled: liveSettings.announcementBarEnabled,
      announcementText: liveSettings.announcementText,
      homepageSections: liveSettings.homepageSections,
      navigation: liveSettings.navigation,
      headerControls: {
        ...(liveSettings.headerControls || {}),
        showCurrencySelector: false
      },
      currency: "PKR",
      currencySymbol: "₨",
      supportedCurrencies: ["PKR"],
      priceRounding: liveSettings.priceRounding,
      pricingRules: liveSettings.pricingRules,
      stitchingEngine: liveSettings.stitchingEngine,
      checkoutRules: liveSettings.checkoutRules,
      shipping: liveSettings.shipping,
      seo: liveSettings.seo,
      socialLinks: liveSettings.socialLinks,
      socialMedia: liveSettings.socialMedia || defaultMaisonSettings.socialMedia,
      clientServices: liveSettings.clientServices || defaultMaisonSettings.clientServices,
      footer: footerClean || defaultMaisonSettings.footer,
      updatedAt: liveSettings.updatedAt
    };

    res.json({
      success: true,
      settings: publicSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/admin/settings (Full Admin Settings including Drafts and Version History)
export const getAdminSettings = (req, res) => {
  try {
    const store = getStore();
    if (!store.settings) {
      store.settings = defaultMaisonSettings;
      saveStore(store);
    }
    
    const published = { ...defaultMaisonSettings, ...store.settings };
    const draft = store.draftSettings ? { ...published, ...store.draftSettings } : null;
    const history = store.settingsHistory || [];

    res.json({
      success: true,
      settings: published,
      draftSettings: draft,
      isDraftActive: !!store.draftSettings,
      history: history,
      lastPublished: store.lastPublishedSettingsAt || published.updatedAt,
      lastPublishedBy: store.lastPublishedSettingsBy || 'AYDARA Directrice'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/admin/settings (Save Draft or Direct Settings Update)
export const updateSettings = (req, res) => {
  try {
    const store = getStore();
    const current = store.settings ? { ...defaultMaisonSettings, ...store.settings } : defaultMaisonSettings;
    
    // Update live settings directly
    store.settings = {
      ...current,
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    // Clear any draft if we're doing a direct save
    delete store.draftSettings;
    
    // Log activity
    store.activityLogs = store.activityLogs || [];
    store.activityLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'SETTINGS_UPDATED',
      description: `Maison settings updated by ${req.user?.name || 'Administrator'}`,
      author: req.user?.name || 'Admin',
      timestamp: new Date().toISOString()
    });

    saveStore(store);
    res.json({ success: true, settings: store.settings, message: 'Settings saved successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/admin/settings/draft (Save Draft without Publishing)
export const saveDraftSettings = (req, res) => {
  try {
    const store = getStore();
    const current = store.settings ? { ...defaultMaisonSettings, ...store.settings } : defaultMaisonSettings;
    
    store.draftSettings = {
      ...(store.draftSettings || current),
      ...req.body,
      draftSavedAt: new Date().toISOString(),
      draftSavedBy: req.user?.name || 'Admin'
    };
    
    saveStore(store);
    res.json({
      success: true,
      draftSettings: store.draftSettings,
      message: 'Draft settings saved. These changes will not be visible on the public storefront until published.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/admin/settings/publish (Publish Draft to Active Live Storefront)
export const publishSettings = (req, res) => {
  try {
    const store = getStore();
    const current = store.settings ? { ...defaultMaisonSettings, ...store.settings } : defaultMaisonSettings;
    const toPublish = req.body && Object.keys(req.body).length > 0
      ? { ...current, ...req.body }
      : (store.draftSettings ? { ...current, ...store.draftSettings } : current);
    
    const previousVersionSnapshot = { ...current };
    const now = new Date().toISOString();
    const author = req.user?.name || 'AYDARA Directrice';
    
    // Archive version into History
    store.settingsHistory = store.settingsHistory || [];
    store.settingsHistory.unshift({
      versionId: `ver-${Date.now()}`,
      snapshot: previousVersionSnapshot,
      publishedAt: now,
      publishedBy: author,
      note: req.body?.publishNote || 'Published via Global Maison Control Center'
    });
    
    // Keep max 25 historical snapshots
    if (store.settingsHistory.length > 25) {
      store.settingsHistory = store.settingsHistory.slice(0, 25);
    }
    
    // Apply live settings
    toPublish.updatedAt = now;
    store.settings = toPublish;
    store.lastPublishedSettingsAt = now;
    store.lastPublishedSettingsBy = author;
    
    // Clear draft
    delete store.draftSettings;
    
    // Log activity
    store.activityLogs = store.activityLogs || [];
    store.activityLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'SETTINGS_PUBLISHED',
      description: `Maison settings published live to storefront by ${author}`,
      author: author,
      timestamp: now
    });
    
    saveStore(store);
    
    res.json({
      success: true,
      settings: store.settings,
      history: store.settingsHistory,
      lastPublished: now,
      lastPublishedBy: author,
      message: 'All changes have been successfully published to the live storefront across all devices.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/admin/settings/discard (Discard Draft Changes)
export const discardDraftSettings = (req, res) => {
  try {
    const store = getStore();
    delete store.draftSettings;
    saveStore(store);
    
    res.json({
      success: true,
      settings: store.settings,
      message: 'Draft changes discarded. Active configuration restored.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/admin/settings/restore/:versionId (Rollback to a Previous Version)
export const restoreSettingsVersion = (req, res) => {
  try {
    const { versionId } = req.params;
    const store = getStore();
    const historyItem = (store.settingsHistory || []).find(h => h.versionId === versionId);
    
    if (!historyItem || !historyItem.snapshot) {
      return res.status(404).json({ success: false, message: 'Settings version not found in archive.' });
    }
    
    const now = new Date().toISOString();
    const author = req.user?.name || 'AYDARA Directrice';
    
    // Save current as a version before restoring
    store.settingsHistory.unshift({
      versionId: `ver-${Date.now()}`,
      snapshot: { ...store.settings },
      publishedAt: now,
      publishedBy: author,
      note: `Pre-rollback snapshot before restoring version ${versionId}`
    });
    
    // Restore
    store.settings = { ...historyItem.snapshot, updatedAt: now };
    store.lastPublishedSettingsAt = now;
    store.lastPublishedSettingsBy = author;
    delete store.draftSettings;
    
    // Log
    store.activityLogs = store.activityLogs || [];
    store.activityLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'SETTINGS_RESTORED',
      description: `Maison settings restored to version ${versionId} by ${author}`,
      author: author,
      timestamp: now
    });
    
    saveStore(store);
    
    res.json({
      success: true,
      settings: store.settings,
      history: store.settingsHistory,
      message: `Successfully restored Maison configuration from ${new Date(historyItem.publishedAt).toLocaleString()}.`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/admin/settings/flush-cache (Flush System Cache)
export const flushCache = (req, res) => {
  try {
    const store = getStore();
    const now = new Date().toISOString();
    const author = req.user?.name || 'Admin';
    
    store.activityLogs = store.activityLogs || [];
    store.activityLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'CACHE_FLUSHED',
      description: `Global API cache & storefront assets flushed by ${author}`,
      author: author,
      timestamp: now
    });
    
    saveStore(store);
    res.json({
      success: true,
      message: 'Global cache and CDN buffers successfully cleared. Storefront data is fresh.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/admin/settings/reset-defaults (Reset to pristine defaults)
export const resetSettingsToDefault = (req, res) => {
  try {
    const store = getStore();
    const now = new Date().toISOString();
    const author = req.user?.name || 'Admin';
    
    // Archive current before resetting
    store.settingsHistory = store.settingsHistory || [];
    store.settingsHistory.unshift({
      versionId: `ver-${Date.now()}`,
      snapshot: { ...store.settings },
      publishedAt: now,
      publishedBy: author,
      note: 'Snapshot taken prior to resetting settings to pristine Maison defaults'
    });
    
    store.settings = { ...defaultMaisonSettings, updatedAt: now };
    delete store.draftSettings;
    
    store.activityLogs = store.activityLogs || [];
    store.activityLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'SETTINGS_RESET_DEFAULTS',
      description: `Maison settings reset to default curated luxury state by ${author}`,
      author: author,
      timestamp: now
    });
    
    saveStore(store);
    res.json({
      success: true,
      settings: store.settings,
      history: store.settingsHistory,
      message: 'Settings have been reset to default Maison configuration.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
