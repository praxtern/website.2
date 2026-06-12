export const itineraryData = [
  {
    city: 'OSAKA',
    chapter: 'CHAPTER ONE',
    description:
      'The industrial heart. A labyrinth of concrete, culinary mastery, and underground culture. We begin where the raw energy of Japan is most palpable.',
    layout: 'text-left' as const,
    days: [
      {
        day: '01',
        title: 'THE DESCENT.',
        morning: 'Dotonbori street food walk.',
        afternoon: 'Osaka Castle exploration.',
        evening: 'Namba izakaya crawl.',
        note: 'Food rec: Ichiran Ramen Dotonbori',
      },
      {
        day: '02',
        title: 'IMPERIAL & UNDERGROUND.',
        morning: 'Kuromon Market culinary tour.',
        afternoon: 'Shinsekai retro district diving.',
        evening: 'Osaka Bay sunset viewing.',
        note: 'Food rec: Kushikatsu Daruma',
      },
      {
        day: '03',
        title: 'MODERN PULSE.',
        morning: 'Sumiyoshi Taisha shrine visit.',
        afternoon: 'Free shopping in Shinsaibashi.',
        evening: 'Departure to Kyoto.',
        note: 'Transport: Shinkansen 15 min',
      },
    ],
  },
  {
    city: 'KYOTO',
    chapter: 'CHAPTER TWO',
    description:
      'The eternal capital. Where time slows and tradition dictates form. We strip away the tourist veneer to access the profound stillness beneath.',
    layout: 'text-right' as const,
    days: [
      {
        day: '04',
        title: 'TRANQUILITY.',
        morning: 'Fushimi Inari sunrise hike avoiding crowds.',
        afternoon: 'Nishiki Market exploration.',
        evening: "Gion evening walk with cultural reflections.",
        note: 'Food rec: Tofu kaiseki dinner',
      },
      {
        day: '05',
        title: 'SHADOWS & LIGHT.',
        morning: 'Arashiyama bamboo grove wanderings.',
        afternoon: 'Tenryu-ji garden contemplation.',
        evening: "Philosopher's Path scenic stroll.",
        note: 'Food rec: Matcha everything at Nakamura Tokichi',
      },
      {
        day: '06',
        title: 'THE ARTISANS.',
        morning: 'Kinkaku-ji Golden Pavilion viewing.',
        afternoon: 'Free exploration of hidden temples.',
        evening: 'Shinkansen to Tokyo.',
        note: 'Transport: Nozomi 2h15m',
      },
    ],
  },
  {
    city: 'TOKYO',
    chapter: 'CHAPTER THREE',
    description:
      'The apex of modernity. A sprawling, complex machine of culture, high fashion, and culinary innovation. The grand finale.',
    layout: 'text-left' as const,
    days: [
      {
        day: '07',
        title: 'NEON METROPOLIS.',
        morning: 'Shibuya crossing & Harajuku culture immersion.',
        afternoon: 'Meiji Shrine peaceful retreat.',
        evening: 'Shibuya Scramble rooftop dinner.',
        note: 'Food rec: Ichiran Shibuya',
      },
      {
        day: '08',
        title: 'CONTEMPORARY VISIONS.',
        morning: 'Tsukiji Outer Market premium breakfast.',
        afternoon: 'teamLab Planets VIP access.',
        evening: 'Shinjuku Golden Gai nightlife immersion.',
        note: 'Food rec: Sushi Dai',
      },
      {
        day: '09',
        title: 'SUBCULTURE IMMERSION.',
        morning: 'Asakusa Senso-ji morning rituals.',
        afternoon: 'Akihabara tech and retro gaming deep-dive.',
        evening: 'Tokyo Skytree sunset observation.',
        note: 'Food rec: Tempura Daikokuya',
      },
      {
        day: '10',
        title: 'THE FAREWELL.',
        morning: 'Last morning Yanaka old town exploration.',
        afternoon: 'Luxury airport transfer.',
        evening: '',
        note: 'Food rec: Airport ramen at Fuunji',
      },
    ],
  },
]
