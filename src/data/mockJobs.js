export const MOCK_JOBS = [
  {
    id: 'job-1',
    title: 'Junior Web Developer (React / Frontend)',
    company: 'TechFlow Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
    category: 'IT & Software',
    location: 'Budapest, District 11 (Hybrid)',
    hourlyRateHuf: 3450,
    hourlyRateEur: 8.8,
    schedule: 'Flexible (20-30 hrs/wk)',
    shifts: ['Flexible', 'Morning', 'Afternoon'],
    isRemote: true,
    isUnder18: false,
    isEnglishFriendly: true,
    featured: true,
    urgent: true,
    postedAt: 'Just now',
    applicantsCount: 14,
    description: 'Join our agile frontend team building client dashboards in React and Tailwind. Ideal for university computer science students seeking real industry project experience with mentorship.',
    requirements: [
      'Active student status (full-time or evening student)',
      'Basic knowledge of JavaScript / React and CSS',
      'Good written & spoken English',
      'Min. 20 hours/week commitment with flexible scheduling around exams'
    ],
    benefits: [
      'Mentorship by senior developers',
      'Home office support & flexible exam leave',
      'Modern laptop provided',
      'Free coffee, snacks, and rooftop lounge'
    ]
  },
  {
    id: 'job-2',
    title: 'English Customer Support Specialist',
    company: 'GlobalConnect Services',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=faces',
    category: 'Customer Support',
    location: 'Budapest, District 9 (100% Remote)',
    hourlyRateHuf: 2850,
    hourlyRateEur: 7.3,
    schedule: 'Part-time (15-25 hrs/wk)',
    shifts: ['Afternoon', 'Evening', 'Weekend'],
    isRemote: true,
    isUnder18: false,
    isEnglishFriendly: true,
    featured: true,
    urgent: false,
    postedAt: '2 hours ago',
    applicantsCount: 29,
    description: 'Assist international clients via live chat and email ticketing. Perfect for bilingual or international university students who speak fluent English.',
    requirements: [
      'Active student status in Hungary',
      'Fluent C1 English (no Hungarian required)',
      'Reliable home internet connection & headset',
      'Friendly, patient communication style'
    ],
    benefits: [
      'Fully remote - work from your dorm or home',
      'Paid onboarding and communication training',
      'Performance bonus up to +15% hourly'
    ]
  },
  {
    id: 'job-3',
    title: 'Specialty Coffee Barista & Cashier',
    company: 'Artisan Brews Cafe',
    companyLogo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100&h=100&fit=crop&crop=faces',
    category: 'Hospitality & Food',
    location: 'Budapest, District 5 (Downtown)',
    hourlyRateHuf: 2400,
    hourlyRateEur: 6.1,
    schedule: 'Weekend & Morning Shifts',
    shifts: ['Morning', 'Weekend'],
    isRemote: false,
    isUnder18: true,
    isEnglishFriendly: true,
    featured: false,
    urgent: true,
    postedAt: '1 day ago',
    applicantsCount: 8,
    description: 'Love craft coffee? Join our welcoming cafe team near university campuses. We provide full professional barista training from day one.',
    requirements: [
      'Age 16+ (eligible for high school and university students)',
      'Cheerful attitude and enthusiasm for hospitality',
      'Available at least 2 weekend shifts per month'
    ],
    benefits: [
      'Complimentary specialty coffee during shifts',
      'Tips distributed weekly (average +400 HUF/hr extra)',
      'Friendly student-led team'
    ]
  },
  {
    id: 'job-4',
    title: 'Retail Brand Assistant & Merchandiser',
    company: 'Zara & Inditex Group',
    companyLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=faces',
    category: 'Retail & Sales',
    location: 'Debrecen, Fórum Mall',
    hourlyRateHuf: 2250,
    hourlyRateEur: 5.8,
    schedule: 'Flexible shifts (16-30 hrs/wk)',
    shifts: ['Morning', 'Afternoon', 'Weekend'],
    isRemote: false,
    isUnder18: true,
    isEnglishFriendly: false,
    featured: false,
    urgent: false,
    postedAt: '2 days ago',
    applicantsCount: 42,
    description: 'Assist with customer care, fitting rooms, stock organization, and store presentation in high-street fashion retail.',
    requirements: [
      'Student ID required (high school or higher education)',
      'Active, energetic personality',
      'Hungarian conversational skills'
    ],
    benefits: [
      'Up to 25% staff discount in all group fashion stores',
      'Flexible weekly schedule tailored to lecture timetables',
      'Holiday and weekend pay premiums (+50% on Sundays)'
    ]
  },
  {
    id: 'job-5',
    title: 'Logistics Order Picker & Scanner',
    company: 'EuroLog Distribution Hub',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&crop=faces',
    category: 'Warehouse & Logistics',
    location: 'Győr (Free shuttle from station)',
    hourlyRateHuf: 2700,
    hourlyRateEur: 6.9,
    schedule: 'Flexible shifts, Day & Night',
    shifts: ['Morning', 'Afternoon', 'Night'],
    isRemote: false,
    isUnder18: false,
    isEnglishFriendly: true,
    featured: false,
    urgent: true,
    postedAt: '3 days ago',
    applicantsCount: 19,
    description: 'Handle e-commerce order preparation with barcode scanners in an automated, climate-controlled warehouse.',
    requirements: [
      'Valid student card',
      'Good physical fitness & precision',
      'Night shifts only available for 18+ students'
    ],
    benefits: [
      'Free company shuttle bus provided',
      '+30% night shift allowance (up to 3,510 HUF/hr)',
      'Subsidized hot cafeteria lunch'
    ]
  },
  {
    id: 'job-6',
    title: 'Bicycle / Scooter Food Delivery Courier',
    company: 'Wolt / Foodora Partner Fleet',
    companyLogo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=100&h=100&fit=crop&crop=faces',
    category: 'Delivery & Courier',
    location: 'Szeged (City Center)',
    hourlyRateHuf: 3100,
    hourlyRateEur: 7.9,
    schedule: '100% You decide your hours',
    shifts: ['Flexible', 'Morning', 'Afternoon', 'Evening', 'Weekend'],
    isRemote: false,
    isUnder18: true,
    isEnglishFriendly: true,
    featured: true,
    urgent: true,
    postedAt: 'Today',
    applicantsCount: 65,
    description: 'Complete food and grocery deliveries on your own schedule. Log on whenever you have spare time between classes.',
    requirements: [
      'Your own bicycle, e-bike, or scooter',
      'Smartphone with GPS (iOS or Android)',
      'Student legal status'
    ],
    benefits: [
      'Highest schedule freedom — work 2 hours or 30 hours',
      '100% of customer tips belong to you',
      'Weekly payment directly to your bank account'
    ]
  },
  {
    id: 'job-7',
    title: 'Data Entry & Administrative Assistant',
    company: 'Apex Legal & Financial Advisory',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=faces',
    category: 'Admin & Office',
    location: 'Budapest, District 13',
    hourlyRateHuf: 2500,
    hourlyRateEur: 6.4,
    schedule: '20 hrs/week (Mon-Thu)',
    shifts: ['Morning', 'Afternoon'],
    isRemote: true,
    isUnder18: false,
    isEnglishFriendly: false,
    featured: false,
    urgent: false,
    postedAt: '4 days ago',
    applicantsCount: 31,
    description: 'Digitize contracts, verify invoicing details, manage archive registers, and assist reception during peak hours.',
    requirements: [
      'Proficiency in MS Excel and Google Sheets',
      'Detail-oriented and trustworthy',
      'Active student status'
    ],
    benefits: [
      'Corporate environment experience for your CV',
      'Possibility of long-term graduate career placement',
      '2 days home office per week'
    ]
  },
  {
    id: 'job-8',
    title: 'Social Media & TikTok Content Creator',
    company: 'Pulse Digital Agency',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=faces',
    category: 'Marketing & Creative',
    location: 'Budapest, District 7 (Creative Studio)',
    hourlyRateHuf: 3200,
    hourlyRateEur: 8.2,
    schedule: 'Flexible / Project-based (15 hrs/wk)',
    shifts: ['Flexible', 'Afternoon'],
    isRemote: true,
    isUnder18: true,
    isEnglishFriendly: true,
    featured: true,
    urgent: false,
    postedAt: '5 days ago',
    applicantsCount: 52,
    description: 'Shoot trendy short-form videos for lifestyle and student brands, edit reels in CapCut/Premiere, and brainstorm creative campaigns.',
    requirements: [
      'Strong eye for trends on TikTok & Instagram',
      'Confidence in front of or behind the camera',
      'Portfolio or personal profile demonstrating video editing'
    ],
    benefits: [
      'Studio equipment, lighting, and cameras available',
      'Flexible shoot times around your university classes',
      'Viral performance bonuses'
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles', count: 48 },
  { id: 'IT & Software', name: 'IT & Software', icon: 'Code', count: 12 },
  { id: 'Admin & Office', name: 'Admin & Office', icon: 'Briefcase', count: 9 },
  { id: 'Retail & Sales', name: 'Retail & Sales', icon: 'ShoppingBag', count: 11 },
  { id: 'Hospitality & Food', name: 'Hospitality & Cafe', icon: 'Coffee', count: 8 },
  { id: 'Warehouse & Logistics', name: 'Warehouse & Logistics', icon: 'Box', count: 6 },
  { id: 'Delivery & Courier', name: 'Delivery & Courier', icon: 'Bike', count: 7 },
  { id: 'Customer Support', name: 'Customer Support', icon: 'Headphones', count: 5 },
  { id: 'Marketing & Creative', name: 'Marketing & Creative', icon: 'Flame', count: 4 },
];

export const CITIES = [
  'All Cities',
  'Budapest',
  'Debrecen',
  'Szeged',
  'Győr',
  'Pécs',
  'Miskolc',
  'Remote'
];
