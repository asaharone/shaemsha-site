const base = import.meta.env.BASE_URL;

export interface Preset {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  examplePhotos: string[];
}

// Using afterImage as placeholder for examplePhotos (3 copies each).
// User will replace with real example photos later.
function examplesFor(id: string): string[] {
  const afterPath = `${base}images/presets/${id.replace('-', '_')}_after.jpg`;
  return [afterPath, afterPath, afterPath];
}

export const presets: Preset[] = [
  {
    id: 'nude',
    name: 'NUDE',
    beforeImage: `${base}images/presets/nude_before.jpg`,
    afterImage: `${base}images/presets/nude_after.jpg`,
    description: 'For photos where you want a softer, cleaner, and more visually striking look, while gently preserving the natural color tone. Works especially well for selfies, portraits, and naturally lit photos.',
    examplePhotos: examplesFor('nude'),
  },
  {
    id: 'dreamy-mood',
    name: 'DREAMY MOOD',
    beforeImage: `${base}images/presets/dreamy_mood_before.jpg`,
    afterImage: `${base}images/presets/dreamy_mood_after.jpg`,
    description: 'For photos with a romantic, hazy, slightly dusty-rose mood. Softens the image and creates a more dreamy, warm atmosphere.',
    examplePhotos: examplesFor('dreamy-mood'),
  },
  {
    id: 'golden-hour',
    name: 'GOLDEN HOUR',
    beforeImage: `${base}images/presets/golden_hour_before.jpg`,
    afterImage: `${base}images/presets/golden_hour_after.jpg`,
    description: 'For photos you want to give rich golden warmth, a vacation-light feel, and a touch of Morocco. Looks especially beautiful during golden hour, giving the image a beige-golden palette.',
    examplePhotos: examplesFor('golden-hour'),
  },
  {
    id: 'fashion',
    name: 'FASHION',
    beforeImage: `${base}images/presets/fashion_before.jpg`,
    afterImage: `${base}images/presets/fashion_after.jpg`,
    description: 'Ideal for photos where you want to make the subject stand out more. Perfect for flash, studio, street, and outdoor shots, giving the image a glossier fashion feel while keeping a sun-kissed skin glow.',
    examplePhotos: examplesFor('fashion'),
  },
  {
    id: 'art-noir',
    name: 'ART NOIR',
    beforeImage: `${base}images/presets/art_noir_before.jpg`,
    afterImage: `${base}images/presets/art_noir_after.jpg`,
    description: 'For photos that need more artistry, depth, and a stylized mood. Makes the image more graphic and expressive while keeping a vintage cinematic character.',
    examplePhotos: examplesFor('art-noir'),
  },
  {
    id: 'film-haze',
    name: 'FILM HAZE',
    beforeImage: `${base}images/presets/film_haze_before.jpg`,
    afterImage: `${base}images/presets/film_haze_after.jpg`,
    description: 'For photos with a film-like haze, soft glow, and vintage mood. Ideal for bright outdoor shots when you want to add more atmosphere and a 35 mm feel.',
    examplePhotos: examplesFor('film-haze'),
  },
  {
    id: 'honey',
    name: 'HONEY',
    beforeImage: `${base}images/presets/honey_before.jpg`,
    afterImage: `${base}images/presets/honey_after.jpg`,
    description: 'For photos you want to give a warm old money mood. Makes the image feel calmer and more visually enveloping.',
    examplePhotos: examplesFor('honey'),
  },
];

// Display order for the Usage Examples section (different from preset strip order)
export const usageExamplesOrder = [
  'nude', 'fashion', 'dreamy-mood', 'honey',
  'golden-hour', 'film-haze', 'art-noir',
];

export const pricing = {
  usd: { amount: '$15.90', currency: 'USD' },
  uah: { amount: '690₴', currency: 'UAH' },
};

// Replace with real URLs after creating accounts
export const checkoutUrls = {
  usd: 'https://shaemsha.lemonsqueezy.com/checkout/buy/7554b2dc-08cf-4587-a99d-c8188aefb70f',
  uah: 'WORKER_URL/api/create-invoice',
};

export const pageContent = {
  intro: {
    quote: 'Photo is Reality. Preset is Mood.',
    quoteUa: 'Фото фіксує реальність, а пресет додає їй емоції, настрій та атмосферу.',
    vimeoId: '703936443',
  },
  howItWorks: {
    label: 'HOW IT WORKS',
    text: 'Tap a preset, watch your photo transform instantly in Lightroom Mobile.',
    gif: `${base}images/demos/how-it-works.gif`,
  },
  howToInstall: {
    label: 'HOW TO INSTALL',
    text: "Import the .dng files once — they'll stay in your Lightroom presets forever.",
    gif: `${base}images/demos/how-to-install.gif`,
  },
  usageExamples: {
    label: 'USAGE EXAMPLES',
    title: 'Where each preset works best',
  },
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
