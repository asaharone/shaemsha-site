const base = import.meta.env.BASE_URL;

export interface Preset {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
}

export const presets: Preset[] = [
  {
    id: 'nude',
    name: 'NUDE',
    beforeImage: `${base}images/presets/nude_before.jpg`,
    afterImage: `${base}images/presets/nude_after.jpg`,
  },
  {
    id: 'dreamy-mood',
    name: 'DREAMY MOOD',
    beforeImage: `${base}images/presets/dreamy_mood_before.jpg`,
    afterImage: `${base}images/presets/dreamy_mood_after.jpg`,
  },
  {
    id: 'golden-hour',
    name: 'GOLDEN HOUR',
    beforeImage: `${base}images/presets/golden_hour_before.jpg`,
    afterImage: `${base}images/presets/golden_hour_after.jpg`,
  },
  {
    id: 'fashion',
    name: 'FASHION',
    beforeImage: `${base}images/presets/fashion_before.jpg`,
    afterImage: `${base}images/presets/fashion_after.jpg`,
  },
  {
    id: 'art-noir',
    name: 'ART NOIR',
    beforeImage: `${base}images/presets/art_noir_before.jpg`,
    afterImage: `${base}images/presets/art_noir_after.jpg`,
  },
  {
    id: 'film-haze',
    name: 'FILM HAZE 35mm',
    beforeImage: `${base}images/presets/film_haze_before.jpg`,
    afterImage: `${base}images/presets/film_haze_after.jpg`,
  },
  {
    id: 'honey',
    name: 'HONEY',
    beforeImage: `${base}images/presets/honey_before.jpg`,
    afterImage: `${base}images/presets/honey_after.jpg`,
  },
];

export const pricing = {
  usd: { amount: '$15.90', currency: 'USD' },
  uah: { amount: '690₴', currency: 'UAH' },
};

// Replace with real URLs after creating accounts
export const checkoutUrls = {
  usd: 'https://shaemsha.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
  uah: 'WORKER_URL/api/create-invoice',
};

export const faqItems = [
  {
    q: 'Do these work on iPhone?',
    a: 'Yes! Import the .dng files into Lightroom Mobile on your iPhone and use them on any photo. Works with the free version of Lightroom.',
  },
  {
    q: 'Can I use on Android?',
    a: 'Absolutely. Lightroom Mobile is available on both iOS and Android. Import the .dng files the same way.',
  },
  {
    q: 'How many photos can I edit?',
    a: 'Unlimited. Once imported, presets are yours forever — use them on as many photos as you want.',
  },
  {
    q: 'Do I need the paid version of Lightroom?',
    a: 'No. The free version of Lightroom Mobile works perfectly with .dng presets. For desktop (.xmp), you need Lightroom Classic or Lightroom CC.',
  },
  {
    q: 'Can I get a refund?',
    a: "Due to the digital nature of the product, refunds are not available. But if you have any issues, reach out — I'll help.",
  },
  {
    q: 'Will I receive updates?',
    a: "Yes — all future updates to this pack are free. You'll receive them via email.",
  },
];
