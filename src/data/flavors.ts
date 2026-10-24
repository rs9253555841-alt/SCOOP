import { Flavor, Review, StoreLocation, FaqItem } from '../types';
import {
  DEFAULT_HERO_CONE_PNG,
  DEFAULT_TOPPING_1_PNG,
  DEFAULT_TOPPING_2_PNG,
  DEFAULT_TOPPING_3_PNG,
  DEFAULT_TOPPING_4_PNG
} from '../assets/heroAssets';

/**
 * =========================================================================
 * SCOOP MASTER DATA STORE
 * All flavors, INR prices, reviews, store locations, and FAQs are managed here.
 * You can replace any image URL below with your own custom image path or asset.
 * =========================================================================
 */

/**
 * -------------------------------------------------------------------------
 * HERO SECTION ASSET SLOTS (Transparent PNGs)
 * -------------------------------------------------------------------------
 * Replace these placeholder URLs with your own transparent PNG image paths
 * (e.g., '/images/my_cone.png' or imported PNG assets).
 */

// HERO CONE PNG (Five Colorful Ice Cream Cones bouquet, transparent PNG, overlaps SCOOP heading)
export const HERO_CONE_PNG: string = '/src/assets/images/five_colorful_icecream_cones_transparent.png';

// HERO FLOATING TOPPINGS (Edge-cropped transparent PNGs placed around hero borders)
// Topping 1: Top-Left Raspberry (partly cut off by edge, blurred for depth)
export const HERO_TOPPING_1_PNG: string = '/src/assets/images/floating_raspberry_transparent.png';

// Topping 2: Mid-Left Raspberry (sharp, placed near left viewport edge)
export const HERO_TOPPING_2_PNG: string = '/src/assets/images/floating_raspberry_transparent.png';

// Topping 3: Top-Right Raspberry (sharp, placed near right viewport edge)
export const HERO_TOPPING_3_PNG: string = '/src/assets/images/floating_raspberry_transparent.png';

// Topping 4: Bottom-Right Raspberry (partly cut off by edge, blurred for depth)
export const HERO_TOPPING_4_PNG: string = '/src/assets/images/floating_raspberry_transparent.png';

// Legacy Hero Plate Trio (for About page reference)
export const HERO_IMAGE = '/src/assets/images/hero_icecream_trio_1792213349603.jpg';

export const FLAVORS: Flavor[] = [
  {
    id: 'strawberry-bliss',
    name: 'Strawberry Bliss',
    tagline: 'Juicy strawberry scoops topped with a swirl of sweet delight',
    category: 'Fruity',
    color: '#FF6F86',
    waveColor: '#F25A74',
    textColor: '#FFFFFF',
    signature: true,
    // IMAGE SLOT 2: Strawberry Cone Image
    image: '/src/assets/images/strawberry_bliss_cone_1792213349235.jpg',
    images: {
      cup: '/src/assets/images/straw_cup_1792385953487.jpg',
      cone: '/src/assets/images/straw_cone_1792385952024.jpg',
      tub: '/src/assets/images/straw_tub_1792385953886.jpg'
    },
    description: 'Juicy strawberry scoops topped with a swirl of sweet delight and fresh berry pieces.',
    fullDescription: 'Made with sun-ripened organic strawberries straight from hill station orchards, slow-churned with velvety sweet dairy cream. Every mouthful reveals natural strawberry speckles and refreshing floral sweetness.',
    ingredients: [
      'Fresh Grass-Fed Dairy Cream',
      'Organic Hand-Picked Strawberries',
      'Pure Cane Sugar',
      'Pasture-Raised Egg Yolks',
      'Natural Strawberry Essence',
      'Touch of Lemon Zest'
    ],
    ingredientsText: 'Milk (62%), Strawberry (18%), Cane Sugar (12%), Cream, Milk Solids, Stabilizers (E410, E412), Natural Flavour, Natural Colour (Beetroot Extract).',
    containsText: 'Contains: Milk.',
    basePrice: 149, // Price in INR
    nutrition: {
      servingSize: '1 Scoop (90g)',
      calories: '240 kcal',
      fat: '12g',
      saturatedFat: '7.5g',
      sugar: '21g',
      carbs: '28g',
      protein: '4.2g',
      sodium: '55mg'
    }
  },
  {
    id: 'pistachio-delight',
    name: 'Pistachio Delight',
    tagline: 'Creamy pistachio magic with a sprinkle of nutty crunch',
    category: 'Nutty',
    color: '#A8C145',
    waveColor: '#98B032',
    textColor: '#FFFFFF',
    signature: true,
    // IMAGE SLOT 3: Pistachio Cone Image
    image: '/src/assets/images/pistachio_delight_cone_1792213349862.jpg',
    images: {
      cup: '/src/assets/images/pist_cup_1792385953629.jpg',
      cone: '/src/assets/images/pist_cone_1792385953915.jpg',
      tub: '/src/assets/images/pist_tub_1792385955182.jpg'
    },
    description: 'Creamy pistachio magic with a sprinkle of nutty crunch and roasted kernel pieces.',
    fullDescription: 'A Mediterranean confectionery classic. Hand-selected pistachios gently roasted in small pans and stone-ground into an emerald silk paste, carefully folded into thick sweet custard with cracked toasted nuts throughout.',
    ingredients: [
      'Fresh Whole Farm Cream',
      'Roasted Pistachio Paste',
      'Cracked Toasted Pistachios',
      'Pure Cane Sugar',
      'Organic Milk',
      'Pinch of Fine Sea Salt'
    ],
    ingredientsText: 'Milk (58%), Pistachio (17%), Cane Sugar (13%), Cream, Milk Solids, Stabilizers (E410, E412), Natural Flavour, Natural Colour (Chlorophyll).',
    containsText: 'Contains: Milk, Tree Nuts (Pistachio).',
    basePrice: 169, // Price in INR
    nutrition: {
      servingSize: '1 Scoop (90g)',
      calories: '275 kcal',
      fat: '16g',
      saturatedFat: '8.0g',
      sugar: '19g',
      carbs: '25g',
      protein: '5.8g',
      sodium: '65mg'
    }
  },
  {
    id: 'caramel-indulgence',
    name: 'Caramel Indulgence',
    tagline: 'Smooth caramel ice cream dripping with golden temptation',
    category: 'Creamy',
    color: '#FF9F24',
    waveColor: '#F58F0B',
    textColor: '#FFFFFF',
    signature: true,
    // IMAGE SLOT 4: Caramel Cone Image
    image: '/src/assets/images/caramel_indulgence_cone_1792213350618.jpg',
    images: {
      cup: '/src/assets/images/caram_cup_1792385955894.jpg',
      cone: '/src/assets/images/caram_cone_1792385956705.jpg',
      tub: '/src/assets/images/caram_tub_1792385957575.jpg'
    },
    description: 'Smooth caramel ice cream dripping with golden temptation and molten brown butter ribbons.',
    fullDescription: 'Simmered in artisanal copper kettles with real brown butter and fleur de sel crystals. We swirl molten golden ribbons through rich dairy cream for an irresistible balance of decadent sweet and savory notes.',
    ingredients: [
      'Heavy Double Cream',
      'Kettle-Cooked Salted Caramel Ribbon',
      'Cultured Brown Butter',
      'Fleur de Sel Sea Salt',
      'Pure Cane Sugar',
      'Bourbon Vanilla'
    ],
    ingredientsText: 'Milk (57%), Cane Sugar (14%), Cream, Butterscotch Praline (8%) (Sugar, Cashew Nuts, Butter), Milk Solids, Stabilizers (E410, E412), Natural Flavour, Natural Colour (Caramel).',
    containsText: 'Contains: Milk, Tree Nuts (Cashew Nuts).',
    basePrice: 159, // Price in INR
    nutrition: {
      servingSize: '1 Scoop (90g)',
      calories: '290 kcal',
      fat: '17g',
      saturatedFat: '10.5g',
      sugar: '26g',
      carbs: '32g',
      protein: '4.0g',
      sodium: '110mg'
    }
  },
  {
    id: 'mango-sunshine',
    name: 'Mango Sunshine',
    tagline: 'Tropical Alphonso sunshine in every juicy scoop',
    category: 'Fruity',
    color: '#FFC93C',
    waveColor: '#F0B71F',
    textColor: '#FFFFFF',
    signature: false,
    // IMAGE SLOT 5: Mango Cone Image
    image: '/src/assets/images/mango_sunshine_cone_1792213350628.jpg',
    images: {
      cup: '/src/assets/images/mango_cup_1792385958457.jpg',
      cone: '/src/assets/images/mango_cone_1792385958127.jpg',
      tub: '/src/assets/images/mango_tub_1792385958835.jpg'
    },
    description: 'Pure tropical Alphonso mango pulp churned into a vibrant, sun-drenched refreshing sorbet.',
    fullDescription: 'Golden ripe Ratnagiri Alphonso mangoes, revered as the king of tropical fruits, blended fresh at peak ripeness with a touch of key lime juice and smooth cream. Refreshing, vibrant, and pure summer joy.',
    ingredients: [
      'Pure Alphonso Mango Puree',
      'Farm Fresh Dairy Cream',
      'Organic Cane Sugar',
      'Cold-Pressed Key Lime Juice',
      'Sea Salt'
    ],
    ingredientsText: 'Milk (55%), Mango Pulp (22%), Cane Sugar (13%), Cream, Milk Solids, Stabilizers (E410, E412), Natural Flavour, Natural Colour (Turmeric Extract).',
    containsText: 'Contains: Milk.',
    basePrice: 149, // Price in INR
    nutrition: {
      servingSize: '1 Scoop (90g)',
      calories: '220 kcal',
      fat: '9g',
      saturatedFat: '5.2g',
      sugar: '24g',
      carbs: '31g',
      protein: '3.1g',
      sodium: '45mg'
    }
  },
  {
    id: 'choco-fudge',
    name: 'Choco Fudge',
    tagline: 'Deep 72% Belgian dark cocoa & dense gooey fudge ribbons',
    category: 'Creamy',
    color: '#8B4A2B',
    waveColor: '#763A1F',
    textColor: '#FFFFFF',
    signature: false,
    // IMAGE SLOT 6: Choco Fudge Cone Image
    image: '/src/assets/images/choco_fudge_cone_1792213351153.jpg',
    images: {
      cup: '/src/assets/images/choco_cup_1792385958743.jpg',
      cone: '/src/assets/images/choco_cone_1792385960055.jpg',
      tub: '/src/assets/images/choco_tub_1792385960466.jpg'
    },
    description: 'Deep 72% dark Belgian cocoa with thick ribbons of gooey handcrafted brownie fudge.',
    fullDescription: 'Created for true dark chocolate lovers. We melt single-origin Belgian cocoa liquor into fresh cream, layered with dense ribbons of chewy house-made fudge brownie crumbles.',
    ingredients: [
      'Belgian 72% Cocoa Mass',
      'Fresh Sweet Cream & Whole Milk',
      'House Brownie Fudge Ribbon',
      'Pure Cane Sugar',
      'Madagascar Vanilla Extract',
      'Dark Cocoa Shavings'
    ],
    ingredientsText: 'Milk (58%), Cane Sugar (14%), Cocoa Solids (10%), Cream, Milk Solids, Dark Chocolate Chips (4%), Stabilizers (E410, E412), Emulsifier (E471), Natural Flavour.',
    containsText: 'Contains: Milk.',
    basePrice: 169, // Price in INR
    nutrition: {
      servingSize: '1 Scoop (90g)',
      calories: '310 kcal',
      fat: '19g',
      saturatedFat: '11.8g',
      sugar: '25g',
      carbs: '33g',
      protein: '5.2g',
      sodium: '70mg'
    }
  },
  {
    id: 'vanilla-dream',
    name: 'Vanilla Dream',
    tagline: 'Madagascar bourbon vanilla beans with pure ivory cream',
    category: 'Creamy',
    color: '#F6E3B4',
    waveColor: '#EAD49A',
    textColor: '#7A2500', // User constraint: "Vanilla Dream #F6E3B4 (wave #EAD49A, use brown text on this one)"
    signature: false,
    // IMAGE SLOT 7: Vanilla Cone Image
    image: '/src/assets/images/vanilla_dream_cone_1792213351104.jpg',
    images: {
      cup: '/src/assets/images/vanil_cup_1792385961606.jpg',
      cone: '/src/assets/images/vanil_cone_1792385960350.jpg',
      tub: '/src/assets/images/vanil_tub_1792385961528.jpg'
    },
    description: 'Artisanal Madagascar bourbon vanilla bean with delicate creamy ivory notes.',
    fullDescription: 'Pure elegance. Whole Madagascar Bourbon vanilla beans are split by hand and cold-steeped for 24 hours into warm grass-fed milk, infusing millions of aromatic black seeds into every silky batch.',
    ingredients: [
      'Fresh Double Cream',
      'Pasture Whole Milk',
      'Hand-Split Madagascar Bourbon Vanilla Pods',
      'Pasture-Raised Egg Yolks',
      'Organic Cane Sugar'
    ],
    ingredientsText: 'Milk (66%), Cane Sugar (15%), Cream (10%), Milk Solids, Vanilla Extract (1.5%), Stabilizers (E410, E412), Emulsifier (E471), Natural Flavour.',
    containsText: 'Contains: Milk.',
    basePrice: 139, // Price in INR
    nutrition: {
      servingSize: '1 Scoop (90g)',
      calories: '235 kcal',
      fat: '13g',
      saturatedFat: '8.2g',
      sugar: '18g',
      carbs: '24g',
      protein: '4.5g',
      sodium: '50mg'
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Ananya Sharma',
    location: 'Bandra, Mumbai',
    flavor: 'Strawberry Bliss',
    rating: 5,
    comment: 'The strawberry flavor tastes like real strawberries fresh from the patch, not artificial syrup. You can see and taste the real berries. Pure bliss in every bite!',
    avatarText: 'AS'
  },
  {
    id: 'rev-2',
    name: 'Rohan Mehra',
    location: 'Indiranagar, Bengaluru',
    flavor: 'Pistachio Delight',
    rating: 5,
    comment: 'Authentic roasted nut flavor that rivals the best gelaterias in Italy. The crunch of real chopped pistachios makes the texture completely addicting.',
    avatarText: 'RM'
  },
  {
    id: 'rev-3',
    name: 'Pooja Iyer',
    location: 'Connaught Place, New Delhi',
    flavor: 'Caramel Indulgence',
    rating: 5,
    comment: 'The salted caramel ribbon is thick, buttery, and just the right touch of savory sea salt. My whole family cannot stop ordering tubs for weekend movie nights!',
    avatarText: 'PI'
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-1',
    name: 'Downtown Scoop Haven',
    address: 'Shop 14, Heritage Lane, Colaba',
    city: 'Mumbai, MH 400005',
    hours: 'Mon – Sun: 11:00 AM – 11:00 PM',
    phone: '+91 98200 55501',
    featured: 'Features patio seating & live waffle-cone baking station'
  },
  {
    id: 'store-2',
    name: 'Koramangala Scoop Bar',
    address: '82, 100 Feet Road, 4th Block',
    city: 'Bengaluru, KA 560034',
    hours: 'Mon – Sun: 12:00 PM – 12:00 AM',
    phone: '+91 98800 55502',
    featured: 'Outdoor garden seating & freshly churned sundae bar'
  },
  {
    id: 'store-3',
    name: 'Khan Market Boutique',
    address: '45-A Middle Lane, Khan Market',
    city: 'New Delhi, DL 110003',
    hours: 'Mon – Sun: 11:00 AM – 10:30 PM',
    phone: '+91 98100 55503',
    featured: 'Tasting flights & take-home thermal packed tubs'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Are your ice creams made with real dairy and natural ingredients?',
    answer: 'Yes, 100%! We source all of our cream and milk from local, pasture-raised family dairy cows. We never use artificial flavors, high-fructose corn syrup, synthetic preservatives, or artificial dyes.'
  },
  {
    id: 'faq-2',
    question: 'How do you keep ice cream frozen during home delivery?',
    answer: 'We pack your delivery in custom insulated thermal bags packed with food-grade dry ice packs. Your scoops arrive frozen, firm, and ready to enjoy immediately.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer nut-free and gluten-free options?',
    answer: 'Our Strawberry Bliss, Vanilla Dream, and Mango Sunshine are naturally gluten-free when ordered in cups. However, please note that we handle nuts (such as roasted pistachios) in our kitchen, so traces may be present.'
  },
  {
    id: 'faq-4',
    question: 'What is the difference between Cup, Cone, and Tub sizes?',
    answer: 'A Cup comes with 2 generous scoops (approx. 180g). A Cone includes 2 scoops atop a freshly hand-rolled waffle cone. A Tub is a family pint container containing 4 full scoops (approx. 475ml), ideal for freezing and sharing.'
  },
  {
    id: 'faq-5',
    question: 'Can I place bulk orders for catering, parties, or weddings?',
    answer: 'Yes! We cater birthday parties, corporate events, and weddings with our mobile Scoop cart or pre-packed party tubs. Call our team at +91 8570917740 or order directly online.'
  }
];
