const base = import.meta.env.BASE_URL;

export interface Preset {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  descriptionUa?: string;
  examplePhotos: string[];
  exampleBeforePhotos: string[];
}

const ex = `${base}images/presets/examples/`;

export const presets: Preset[] = [
  {
    id: 'dreamy-mood',
    name: 'DREAMY MOOD',
    beforeImage: `${base}images/presets/dreamy_mood_before.jpg`,
    afterImage: `${base}images/presets/dreamy_mood_after.jpg`,
    description: 'For tender, soft-light moments — adds a hazy dusty-rose glow and dreamy warm mood.',
    descriptionUa: 'Для ніжних кадрів у м\'якому світлі — серпанковий dusty-rose відтінок і теплий dreamy настрій.',
    examplePhotos: [`${ex}dreamymood_after_1.jpg`, `${ex}dreamymood_after_2.jpg`, `${ex}dreamymood_after_3.jpg`],
    exampleBeforePhotos: [`${ex}dreamymood_before_1.jpg`, `${ex}dreamymood_before_2.jpg`, `${ex}dreamymood_before_3.jpg`],
  },
  {
    id: 'nude',
    name: 'NUDE',
    beforeImage: `${base}images/presets/nude_before.jpg`,
    afterImage: `${base}images/presets/nude_after.jpg`,
    description: 'For selfies and daylight portraits — softens skin and cleans up tones while keeping them natural.',
    descriptionUa: 'Для селфі та портретів при денному світлі — м\'якша шкіра й чисті природні тони.',
    examplePhotos: [`${ex}nude_after_1.jpg`, `${ex}nude_after_2.jpg`, `${ex}nude_after_3.jpg`],
    exampleBeforePhotos: [`${ex}nude_before_1.jpg`, `${ex}nude_before_2.jpg`, `${ex}nude_before_3.jpg`],
  },
  {
    id: 'golden-hour',
    name: 'GOLDEN HOUR',
    beforeImage: `${base}images/presets/golden_hour_before.jpg`,
    afterImage: `${base}images/presets/golden_hour_after.jpg`,
    description: 'For travel and golden-hour shots — rich beige-gold palette with a warm Moroccan vacation feel.',
    descriptionUa: 'Для travel-зйомки та golden hour — насичена бежево-золота палітра і тепле курортне відчуття Марокко.',
    examplePhotos: [`${ex}goldenhour_after_1.jpg`, `${ex}goldenhour_after_2.jpg`, `${ex}goldenhour_after_3.jpg`],
    exampleBeforePhotos: [`${ex}goldenhour_before_1.jpg`, `${ex}goldenhour_before_2.jpg`, `${ex}goldenhour_before_3.jpg`],
  },
  {
    id: 'fashion',
    name: 'FASHION',
    beforeImage: `${base}images/presets/fashion_before.jpg`,
    afterImage: `${base}images/presets/fashion_after.jpg`,
    description: 'For flash, studio, and street shots — glossy fashion look that makes you stand out, with a sun-kissed glow.',
    descriptionUa: 'Для flash, студії та street-зйомки — глянцевий fashion-вигляд із sun-kissed шкірою, що виділяє в кадрі.',
    examplePhotos: [`${ex}fashion_after_1.jpg`, `${ex}fashion_after_2.jpg`, `${ex}fashion_after_3.jpg`],
    exampleBeforePhotos: [`${ex}fashion_before_1.jpg`, `${ex}fashion_before_2.jpg`, `${ex}fashion_before_3.jpg`],
  },
  {
    id: 'art-noir',
    name: 'ART NOIR',
    beforeImage: `${base}images/presets/art_noir_before.jpg`,
    afterImage: `${base}images/presets/art_noir_after.jpg`,
    description: 'For statement and artistic shots — adds depth, drama, and a graphic vintage-cinematic look.',
    descriptionUa: 'Для артистичних кадрів зі змістом — глибина, драма та графічний vintage кіно-вигляд.',
    examplePhotos: [`${ex}artnoir_after_1.jpg`, `${ex}artnoir_after_2.jpg`, `${ex}artnoir_after_1.jpg`],
    exampleBeforePhotos: [`${ex}artnoir_before_1.jpg`, `${ex}artnoir_before_2.jpg`, `${ex}artnoir_before_1.jpg`],
  },
  {
    id: 'film-haze',
    name: 'FILM HAZE',
    beforeImage: `${base}images/presets/film_haze_before.jpg`,
    afterImage: `${base}images/presets/film_haze_after.jpg`,
    description: 'For bright outdoor shots — adds 35mm film haze, soft glow, and a vintage mood.',
    descriptionUa: 'Для яскравих outdoor-кадрів — плівковий 35мм серпанок, м\'яке сяйво й vintage настрій.',
    examplePhotos: [`${ex}filmhaze_after_1.jpg`, `${ex}filmhaze_after_2.jpg`, `${ex}filmhaze_after_3.jpg`],
    exampleBeforePhotos: [`${ex}filmhaze_before_1.jpg`, `${ex}filmhaze_before_2.jpg`, `${ex}filmhaze_before_3.jpg`],
  },
  {
    id: 'honey',
    name: 'HONEY',
    beforeImage: `${base}images/presets/honey_before.jpg`,
    afterImage: `${base}images/presets/honey_after.jpg`,
    description: 'For indoor and interior shots — warm old-money mood, calm and enveloping.',
    descriptionUa: 'Для інтер\'єрних і домашніх кадрів — теплий old-money настрій, спокійний і огортаючий.',
    examplePhotos: [`${ex}honey_after_1.jpg`, `${ex}honey_after_2.jpg`, `${ex}honey_after_3.jpg`],
    exampleBeforePhotos: [`${ex}honey_before_1.jpg`, `${ex}honey_before_2.jpg`, `${ex}honey_before_3.jpg`],
  },
];

// Display order for the Usage Examples section (different from preset strip order)
export const usageExamplesOrder = [
  'nude', 'fashion', 'dreamy-mood', 'honey',
  'golden-hour', 'film-haze', 'art-noir',
];

export const pricing = {
  eur: { amount: '€15.90', currency: 'EUR' },
  uah: { amount: '690₴', currency: 'UAH' },
};

// Replace with real URLs after creating accounts
export const checkoutUrls = {
  eur: 'https://shaemsha.lemonsqueezy.com/checkout/buy/7554b2dc-08cf-4587-a99d-c8188aefb70f',
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
