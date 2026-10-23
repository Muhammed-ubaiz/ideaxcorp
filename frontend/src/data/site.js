// Default website content, taken from the live ideaxcorp.com site.
// It is shown whenever Firestore is not configured or a collection is still empty,
// and it is what the admin "Import website content" action seeds into Firestore.

export const settings = {
  companyName: 'Ideaxcorp',
  tagline: 'Web and Digital Solutions Agency in Kerala & UAE.',
  heroEyebrow: 'Web & digital solutions agency · Kerala & UAE',
  heroTitle: 'We create\nwhat’s next.',
  heroSubtitle: 'Creative strategy, powerful digital experiences and intelligent technology that move brands forward.',
  introText:
    'We help businesses launch faster, grow stronger, and stand out online with strategic branding, high-converting websites, and performance-driven digital marketing.',
  email: 'ideaxcorp@gmail.com',
  phone: '+971 56 744 8005',
  whatsapp: '971567448005',
  whatsappMessage: 'Hello Ideaxcorp, I would like to know more about your services.',
  responseTime: 'We reply within 24 hours.',
  workingHours: 'Monday to Friday · 9:00 AM – 6:00 PM',
  markets: ['UAE', 'Qatar', 'KSA', 'Oman', 'Kerala'],
  offices: [
    {
      label: 'Head office · UAE',
      address: 'Deira, Dubai, United Arab Emirates',
      hours: 'Monday to Friday · 9:00 AM – 6:00 PM',
    },
    {
      label: 'Branch · India',
      address: 'Zulu Tower, Second Floor, Vadanappally, Thrissur 680614, Kerala',
      hours: 'Monday to Friday · 9:00 AM – 6:00 PM',
    },
  ],
  socials: {
    instagram: 'https://www.instagram.com/ideaxcorp/',
    facebook: 'https://www.facebook.com/profile.php?id=61586700151631',
    linkedin: 'https://www.linkedin.com/company/111438403/',
    youtube: '',
  },
  showreelUrl: 'https://www.youtube.com/watch?v=vqXLGX0szIQ',
  portfolioDriveUrl: 'https://drive.google.com/drive/folders/19CSkoXjawKWcrfJNFnpIH1HOwN5DCJot?usp=sharing',
  trustLine: 'Trusted by 20+ marketers, brands and entrepreneurs',
  aboutStory: [
    'Ideaxcorp started as a digital marketing and e-commerce agency in the UAE. Over time, we expanded our presence to Qatar, KSA, Oman and Kerala by growing into a complete digital marketing and e-commerce solutions company. What began with focused marketing services has grown into a structured system that supports brands at every stage.',
    'We provide everything a brand needs to grow. If you are starting from scratch or repositioning an established business, we work closely with brands to build strong, measurable foundations.',
    'We look forward to working with you and building something meaningful together.',
  ].join('\n\n'),
  vision:
    'Our vision is to become a trusted future focused, data-driven agency that helps businesses grow through smart strategies and modern technology.',
  mission:
    'Our mission is to help businesses grow with practical digital solutions that match their needs. We focus on building strong online foundations through websites, SEO, e-commerce, and marketing, while continuously improving results using data and smart tools.',
  founderName: 'Jaseel Jalal',
  founderRole: 'CEO & Founder',
  founderImage: '/images/founder-jaseel.webp',
  founderNote: [
    'I am proud to introduce Ideaxcorp, a Data-Focused Digital Marketing Agency built on clarity, strategy, and measurable growth.',
    'From the beginning, our vision was simple, marketing should be guided by insight and real data, not guesswork. In a space filled with noise and competition, we believe real progress comes from understanding data and using it to make better decisions.',
    'Here at Ideaxcorp, we study real market behavior, refine what works, and build strategies that produce consistent results. Our focus is on helping brands grow with structure, precision, and long-term direction.',
    'Thank you for being part of our story. We look forward to helping your brand grow with confidence and clarity.',
  ].join('\n\n'),
  privacyUpdated: '2026-10-15',
}

export const services = [
  {
    slug: 'creative-branding',
    title: 'Creative Branding',
    tagline: 'Create identity',
    image: '/images/services/branding.webp',
    shortDescription:
      'A strong brand makes your business memorable and trustworthy. We help you build a clear and consistent brand identity that connects with your audience.',
    intro:
      'A strong brand builds trust among the audience before a single conversation happens. Whether you are starting from zero or refreshing an existing identity, we create branding that is not just visually appealing but strategically aligned with your business goals.',
    buildLead: 'If you are launching a new venture, we help you create a complete brand identity from the ground up. This includes:',
    buildItems: [
      'Brand discovery and research',
      'Naming support if required',
      'Brand positioning strategy',
      'Target audience analysis',
      'Visual direction and mood boards',
      'Logo concepts and variations',
      'Typography and color palette selection',
      'Brand voice and tone definition',
    ],
    buildNote: 'We do not just design a logo. We design the foundation of how your business will be perceived.',
    rebuildLead:
      'If your current brand no longer represents who you are or where you are heading, we help you refresh and modernize without losing your identity. Our rebranding process includes:',
    rebuildItems: [
      'Brand audit and competitor analysis',
      'Logo redesign or refinement',
      'Visual identity modernization',
      'Messaging and tone refresh',
      'Consistency across all brand touchpoints',
    ],
    rebuildNote: 'The goal is not change for the sake of change. The goal is relevance, clarity, and stronger recognition.',
    offerings: [
      { title: 'Logo Design', description: 'A primary logo, secondary variations, and a custom icon or symbol for versatile branding — plus favicon versions so your brand looks consistent across websites and digital platforms.' },
      { title: 'Visual Identity System', description: 'A defined color palette, typography system, and consistent design patterns and graphic elements that reflect your brand personality, with image style guidelines to keep every visual cohesive.' },
      { title: 'Brand Guidelines', description: 'A complete rulebook covering logo usage, color codes, fonts, spacing and layout standards, along with clear do’s and don’ts to ensure proper brand representation everywhere.' },
      { title: 'Marketing and Business Collaterals', description: 'Business cards, letterheads, email signatures, social media profile kits, brochures, and flyers that keep every business communication consistent and professional.' },
      { title: 'Digital Branding Assets', description: 'Website visual direction, social media templates, presentation decks, and an ad creatives framework for a consistent, impactful presence across digital platforms.' },
    ],
    order: 1,
    published: true,
  },
  {
    slug: 'web-development',
    title: 'Website Development & UI/UX',
    tagline: 'Built for growth',
    image: '/images/services/website.webp',
    shortDescription:
      'Your website is often the first impression of your brand. We create websites that are clean, fast, and built to convert visitors into customers.',
    intro:
      'Your website is often the first place people truly interact with your brand. Before they call, before they visit, before they decide, they visit your website. Our website development service is focused on creating fast, functional, and visually engaging websites that represent your business with clarity and credibility.',
    buildLead: 'If you are starting fresh, we help you create a complete online presence from the ground up. This includes:',
    buildItems: [
      'Business and industry research',
      'Domain and hosting guidance',
      'Website structure planning',
      'UI and layout design',
      'Responsive development for mobile and desktop',
      'Basic SEO setup',
      'Speed and performance optimization',
      'Contact forms and lead capture setup',
    ],
    buildNote: 'We do not just build pages. We build a platform that introduces your business to the digital audience the right way.',
    rebuildLead:
      'If your current website feels outdated, slow, or unresponsive, we redesign and optimize it without losing your brand identity. Our revamp process includes:',
    rebuildItems: [
      'Website audit and performance analysis',
      'UI and UX improvements',
      'Design modernization',
      'Content restructuring',
      'Mobile responsiveness fixes',
      'Speed and security optimization',
    ],
    rebuildNote: 'The goal is not just a new look. The goal is better usability, higher credibility, and improved conversions.',
    offerings: [
      { title: 'WordPress Development', description: 'Custom website design, template-based development, static and dynamic websites, landing pages, portfolio and corporate websites — fully editable and optimized out of the box.' },
      { title: 'Ecommerce Development', description: 'Online store setup, product page design, payment gateway integration, cart and checkout systems, and inventory management basics.' },
      { title: 'User Experience', description: 'Clean navigation structure, mobile-friendly layouts, accessibility considerations, and interactive elements and animations.' },
      { title: 'Performance & Security', description: 'Website speed optimization, SSL and security setup, backup configurations, and spam and malware protection basics.' },
      { title: 'Integrations & Features', description: 'Contact and inquiry forms, chat integrations, and social media integration.' },
    ],
    order: 2,
    published: true,
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    tagline: 'Social advertising',
    image: '/images/services/smm.webp',
    shortDescription:
      'Social media is where your audience spends time daily. We help your brand stay active, relevant, and engaging.',
    intro:
      'Social media management is about building trust, starting conversations, and turning followers into paying customers. We help your business stay active, visible, and consistent across the right platforms with a clear strategy and measurable goals.',
    offerings: [
      { title: 'Strategy & Planning', description: 'We start with understanding your business, competitors, and target audience, then create a content strategy aligned with your goals — brand awareness, engagement, or lead generation.' },
      { title: 'Content Creation', description: 'Single and carousel post designs, engaging reel concepts and short video ideas, and captions with strong calls-to-action — every piece tailored to your brand voice.' },
      { title: 'Content Calendar', description: 'We plan your posts in advance to maintain consistency and clarity. No random posting — everything is structured.' },
      { title: 'Platform Management', description: 'Instagram, Facebook, LinkedIn and other platforms based on your business needs. We handle posting, scheduling, and basic page optimization.' },
      { title: 'Hashtag & Keyword Research', description: 'Using the right hashtags and keywords to improve reach and visibility.' },
      { title: 'Community Engagement', description: 'Replying to comments and messages (optional plan) to keep your audience connected and active.' },
      { title: 'Performance Monitoring', description: 'Monthly reports covering reach and impressions, engagement rate, follower growth, and content performance insights.' },
      { title: 'Optimize Strategies', description: 'We continuously analyze performance data and refine content, timing, and campaigns to improve reach, engagement, and conversions.' },
    ],
    order: 3,
    published: true,
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    tagline: 'Paid ads',
    image: '/images/services/performance.webp',
    shortDescription:
      'Paid ads help you reach potential customers quickly and effectively. We create performance-focused campaigns that generate measurable results.',
    intro:
      'Performance marketing focuses on campaigns where every action is tracked and linked to a business goal. Budgets are allocated based on performance data, and improvements are made through consistent testing and analysis.',
    offerings: [
      { title: 'Paid Media Advertising', description: 'Campaigns across Meta, Google, TikTok, LinkedIn, and YouTube, structured around goals like sales, leads, calls, or app installs with proper conversion tracking. Budgets, bidding, targeting, and creatives are adjusted regularly to improve cost per result.' },
      { title: 'Search Engine Marketing', description: 'Google campaigns with focused keywords, structured ad groups, and optimized bidding to capture high-intent traffic — measured through clicks, conversions, and cost per acquisition.' },
      { title: 'E-Commerce Sales Campaigns', description: 'Structured ad funnels with product catalog ads, dynamic retargeting, shopping campaigns, and abandoned cart recovery — tracked through purchase value, ROAS, and cost per acquisition.' },
      { title: 'Influencer Performance Campaigns', description: 'Creator campaigns tracked through unique links, coupon codes, or conversion tracking, measured by leads, sales, or sign-ups rather than impressions alone.' },
      { title: 'Email and WhatsApp Retargeting', description: 'Automated sequences that recover abandoned carts, remind prospects, or promote relevant offers — tracked through open rates, click-through rates, and conversions.' },
      { title: 'Sales Funnel Optimization', description: 'Every stage from ad interaction to landing page, form submission, and checkout is tracked and analyzed, and drop-offs are addressed to improve overall conversion efficiency.' },
    ],
    order: 4,
    published: true,
  },
  {
    slug: 'search-engine-optimization',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Get found when customers search',
    image: '/images/services/seo.webp',
    shortDescription:
      'If your customers are searching on Google, your business should appear in front of them. Our SEO strategies focus on improving visibility and attracting the right traffic.',
    intro:
      'When customers search for your services, your website or Google Business Profile should appear where they can see it. If your competitors rank higher, they get the enquiries.',
    offerings: [
      { title: 'Keyword Research', description: 'We research how your customers search online and identify the keywords that bring relevant visitors, focusing on search intent, competition, and opportunities that can realistically generate enquiries.' },
      { title: 'On-Page SEO', description: 'We optimize your pages so search engines can clearly understand and rank your content — page structure, content quality, and essential SEO elements across your website.' },
      { title: 'Technical SEO', description: 'We improve the technical foundation so search engines can crawl and index your site efficiently, including performance improvements, mobile optimisation, and fixing issues that affect rankings.' },
      { title: 'Local SEO', description: 'We optimize your business presence so nearby customers find your services more easily in location-based searches and map results.' },
    ],
    highlightsTitle: 'Advanced search optimization',
    highlightsIntro:
      'Search is changing with AI-powered results and voice-based queries. We optimise your website so your business remains visible across modern search platforms.',
    highlights: [
      { title: 'AEO — Answer Engine Optimization', description: 'We structure your content so search engines can present your business as direct answers to user queries, improving visibility in featured results and voice searches.' },
      { title: 'GEO — Generative Engine Optimization', description: 'We optimize your content so AI-driven search platforms can understand and reference your business, improving your chances of appearing in AI-generated responses.' },
    ],
    order: 5,
    published: true,
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile Optimization (GBP)',
    tagline: 'Local visibility',
    image: '/images/services/gmb.webp',
    shortDescription:
      'Boost your local visibility and attract more customers through optimized Google Business Profile management. Convert Google searches into paying customers.',
    intro:
      'Boost your local visibility and attract more customers through optimized Google Business Profile management. We help you convert Google searches into paying customers.',
    order: 6,
    published: true,
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-commerce & Marketplace Solutions',
    tagline: 'Build, market & scale',
    image: '/images/services/ecommerce.webp',
    shortDescription:
      'We create and optimize your eCommerce and marketplace accounts to ensure a strong, professional brand presence — from complete store setup to strategic product listings that maximize visibility, conversions, and sales.',
    intro:
      'From high-converting eCommerce website development to complete marketplace management, we build, optimize, and streamline your entire online selling ecosystem — turning visitors into loyal customers.',
    offerings: [
      { title: 'E-commerce Website Development', description: 'Ecommerce websites that are easy to manage and simple for customers to use, structured for clear product browsing, fast checkout, and stable performance across devices.' },
      { title: 'Marketplace Account Creation & Verification', description: 'We set up and verify your seller accounts on major marketplaces so you can start selling without delays or technical issues.' },
      { title: 'Store Setup and Brand Profile Optimization', description: 'We organize your store and brand profiles to present your products clearly and build customer trust from the first visit.' },
      { title: 'Product Listing, Advertising & Fulfillment', description: 'Accurate, structured product listings, managed marketplace ads, and organized fulfillment so orders are processed smoothly.' },
      { title: 'Competitor Analysis & Audience Research', description: 'We review competing sellers and customer behavior to identify practical opportunities to improve product visibility and sales.' },
      { title: 'Payment & Shipping Configuration', description: 'Payment methods and shipping settings configured for reliable transactions and clear delivery options.' },
    ],
    challenges: [
      { title: 'Low ecommerce sales', description: 'We optimize the entire customer journey to improve conversions when traffic exists but sales don’t.' },
      { title: 'High cart abandonment', description: 'Improve checkout experience, page speed, trust signals, and retargeting to reduce abandoned carts.' },
      { title: 'Poor product visibility', description: 'Our SEO specialists optimize product pages, categories, and technical elements to improve rankings.' },
      { title: 'Ineffective paid advertising', description: 'Performance-driven campaigns focused on maximizing ROAS and lowering customer acquisition costs.' },
      { title: 'Weak marketplace performance', description: 'Improve visibility and conversion performance across Amazon, Noon, and other major marketplaces.' },
      { title: 'Low conversion rates', description: 'Improve landing pages, product pages, checkout flow, and mobile experience through CRO strategies.' },
    ],
    platforms: ['Shopify', 'WooCommerce', 'Magento', 'Amazon', 'Noon', 'Custom platforms'],
    process: [
      { title: 'Audit', description: 'Analyze your store, SEO, conversions, and marketing effectiveness.' },
      { title: 'Strategy', description: 'Create a tailored ecommerce growth strategy based on findings.' },
      { title: 'Development', description: 'Build and optimize your store for performance and conversions.' },
      { title: 'Launch', description: 'Implement SEO and performance marketing campaigns.' },
      { title: 'Scale', description: 'Monitor, optimize, and continuously improve results.' },
    ],
    highlightsTitle: 'Why choose Ideaxcorp',
    highlightsIntro:
      'We combine ecommerce development, SEO, marketing, and conversion optimization under one team to create integrated growth strategies.',
    highlights: [
      { title: 'Ecommerce-focused strategy', description: 'Strategies tailored specifically for ecommerce businesses and online sales growth.' },
      { title: 'Regional market understanding', description: 'Deep expertise in Kerala, Dubai, and GCC market behavior and customer expectations.' },
      { title: 'Full-funnel support', description: 'From store development to marketing and optimization, we support every stage of growth.' },
      { title: 'Performance-driven approach', description: 'Campaigns focused on revenue growth, conversion improvement, and measurable ROI.' },
    ],
    order: 7,
    published: true,
  },
]

export const portfolio = [
  {
    slug: 'diarys-brand-identity',
    title: 'Diary’s Tours & Travels',
    category: 'Logo & Branding',
    description: 'Brand identity for a domestic and international tours company — logo, stationery, signage and digital applications.',
    image: '/images/portfolio/diarys-brand-identity.webp',
    gallery: [],
    tags: ['Brand identity', 'Stationery', 'Signage'],
    url: '',
    featured: true,
    order: 1,
    published: true,
  },
  {
    slug: 'idealpack-store',
    title: 'Idealpack Store',
    category: 'Website Design',
    description: 'E-commerce website for packaging solutions with a modern product catalogue, responsive design and smooth browsing.',
    image: '/images/portfolio/idealpack-store.webp',
    gallery: [],
    tags: ['E-commerce', 'Web store', 'UI/UX'],
    url: 'https://idealpackstore.com/',
    featured: true,
    order: 2,
    published: true,
  },
  {
    slug: 'social-media-creatives',
    title: 'Social media creatives',
    category: 'Graphic Designing',
    description: 'Post and carousel designs created for client social media campaigns across travel, food, retail and events.',
    image: '/images/portfolio/social-media-1.webp',
    gallery: ['/images/portfolio/social-media-2.webp'],
    tags: ['Social media', 'Post design', 'Carousels'],
    url: '',
    featured: true,
    order: 3,
    published: true,
  },
  {
    slug: 'kyokushin-karate-uae',
    title: 'Kyokushin Karate UAE',
    category: 'Website Design',
    description: 'A modern martial arts website with class schedules, training information and an engaging responsive user experience.',
    image: '/images/portfolio/kyokushin-karate-uae.webp',
    gallery: [],
    tags: ['Web design', 'Responsive', 'Development'],
    url: 'https://kyokushinkarateuae.com/',
    featured: false,
    order: 4,
    published: true,
  },
  {
    slug: 'diarys-tourism',
    title: 'Diary’s Tourism',
    category: 'Website Design',
    description: 'Travel and tourism website featuring destination-focused sections, responsive layouts and an engaging browsing experience.',
    image: '/images/portfolio/diarys-tourism.webp',
    gallery: [],
    tags: ['Travel website', 'Responsive', 'UI/UX'],
    url: 'https://diarystourism.com/',
    featured: false,
    order: 5,
    published: true,
  },
]

export const testimonials = [
  {
    name: 'Ashif Rahman',
    company: 'Diarys Tours & Travels',
    quote: 'I approached IdeaxCorp with the requirement to handle my company’s social media platforms and develop a website, and I’m very happy with the results. They understood exactly what I needed and delivered everything professionally and on time. Highly recommended.',
    image: '/images/testimonial-ashif.webp',
    order: 1,
    published: true,
  },
  {
    name: 'Najeeb Abdul Kader',
    company: 'Geepack',
    quote: 'I discovered IdeaxCorp on Google and reached out for local SEO services. The team has been consistent with their work and keeps me updated regularly. I’ve seen good results so far and I’m satisfied with their service.',
    image: '/images/testimonial-najeeb.webp',
    order: 2,
    published: true,
  },
  {
    name: 'Haris Vaniyantavida',
    company: 'Idealpack',
    quote: 'I approached IdeaxCorp for e-commerce services, and we’ve been working together for over 3 years now. I’ve been consistently satisfied with their work. They now handle my entire digital marketing and e-commerce operations.',
    image: '/images/testimonial-haris.webp',
    order: 3,
    published: true,
  },
]

export const faqs = [
  {
    question: 'How much do digital marketing services cost?',
    answer: 'The cost of digital marketing depends on the type of services you choose and the size of your business. Every business has different goals, target audiences, and levels of competition, so the pricing can vary. We offer customized plans designed around your business needs and objectives to ensure you get the most effective strategy for your budget.',
    featured: true,
    order: 1,
    published: true,
  },
  {
    question: 'How long does SEO take to show results?',
    answer: 'SEO usually takes up to 6 months to start showing noticeable results. However, the timeline depends on competition, website quality, and the strategy implemented.',
    featured: true,
    order: 2,
    published: true,
  },
  {
    question: 'How long does it take to build an ecommerce website?',
    answer: 'Most ecommerce websites take between 2 to 6 weeks depending on the complexity, number of products, design requirements, and integrations needed such as payment gateways and shipping systems.',
    featured: false,
    order: 3,
    published: true,
  },
  {
    question: 'What platforms do you use to build ecommerce websites?',
    answer: 'We build ecommerce stores using popular and reliable platforms such as Shopify, WooCommerce, Magento and custom ecommerce solutions. The choice of platform depends on your business size, product range, and scalability requirements.',
    featured: false,
    order: 4,
    published: true,
  },
  {
    question: 'What digital marketing services do you offer?',
    answer: 'We provide a complete range of digital marketing services including search engine optimization (SEO), social media marketing, Google Ads and Meta Ads advertising, website development, ecommerce store development, content marketing and marketing automation.',
    featured: true,
    order: 5,
    published: true,
  },
  {
    question: 'Do I need a website for digital marketing?',
    answer: 'A website is highly recommended because it acts as the main hub of your online presence. It allows customers to learn about your business, view your services, and take action such as making a purchase or submitting an inquiry.',
    featured: true,
    order: 6,
    published: true,
  },
  {
    question: 'Do you offer ongoing support after launching a website or store?',
    answer: 'Yes. We provide ongoing maintenance, updates, marketing support, and optimization services to ensure your website or ecommerce store continues to perform and grow.',
    featured: false,
    order: 7,
    published: true,
  },
  {
    question: 'Can you help grow an existing ecommerce store?',
    answer: 'Yes. If you already have an ecommerce store, we can help improve its performance and increase sales through SEO to bring more organic traffic and paid ads to attract targeted customers. We also optimize product pages, improve website performance, and analyze customer behavior to increase conversions and overall store sales.',
    featured: false,
    order: 8,
    published: true,
  },
  {
    question: 'How can I get started with your digital marketing services?',
    answer: 'Getting started is simple. Contact us through our website or request a consultation. We will understand your business goals and recommend a strategy tailored to your needs.',
    featured: true,
    order: 9,
    published: true,
  },
]

export const team = [
  { name: 'Jaseel Jalal', role: 'CEO & Founder', image: '/images/founder-jaseel.webp', order: 1, published: true },
  { name: 'Shemi Iqbal', role: 'Co-Founder & Chief Technical Officer (CTO)', image: '', order: 2, published: true },
  { name: 'Hasif Hamza', role: 'Chief Operations Officer (COO)', image: '', order: 3, published: true },
  { name: 'Zamin Avinash', role: 'Digital Marketing Head', image: '', order: 4, published: true },
  { name: 'Anas Majeed', role: 'Creative Director', image: '', order: 5, published: true },
]

// Real client names drawn from testimonials and the portfolio.
export const clients = ['Diary’s Tours & Travels', 'Idealpack', 'Geepack', 'Kyokushin Karate UAE', 'Diary’s Tourism']

export const privacyPolicy = `
<p>This Privacy Policy explains how Ideaxcorp (“we”, “us”) collects, uses and protects personal information when you visit ideaxcorp.com or contact us.</p>
<h2>Information we collect</h2>
<p>We only collect the information you choose to send us through the contact form, email, phone or WhatsApp. Through the contact form this is your full name, phone number, email address, the subject you select and your message.</p>
<p>We do not use advertising or tracking cookies on this website. Our hosting provider may keep standard technical logs (such as IP address and browser type) to keep the service secure and reliable.</p>
<h2>How we use your information</h2>
<ul><li>To reply to your enquiry and discuss the services you are interested in.</li><li>To prepare proposals, quotes and agreements you request.</li><li>To keep a record of our communication with you.</li></ul>
<p>We do not sell or rent your personal information, and we do not use it for unrelated marketing without your consent.</p>
<h2>Where your information is stored</h2>
<p>Contact form submissions are stored in Google Firebase (Cloud Firestore), operated by Google LLC. Access is restricted to authorised Ideaxcorp staff.</p>
<h2>Third-party services</h2>
<p>Some features connect you to third-party services that have their own privacy policies: WhatsApp (when you choose to message us), YouTube (the showreel loads only after you press play, using YouTube’s privacy-enhanced mode), and links to our social media profiles and client websites.</p>
<h2>How long we keep it</h2>
<p>We keep enquiry information for as long as needed to respond and to manage any resulting business relationship, after which it is deleted.</p>
<h2>Your choices and rights</h2>
<p>You can ask us to access, correct or delete the personal information we hold about you at any time by emailing <a href="mailto:ideaxcorp@gmail.com">ideaxcorp@gmail.com</a>.</p>
<h2>Changes to this policy</h2>
<p>We may update this policy from time to time. The date at the top of this page shows when it was last changed.</p>
<h2>Contact</h2>
<p>Ideaxcorp — Deira, Dubai, United Arab Emirates, and Zulu Tower, Second Floor, Vadanappally, Thrissur, Kerala.<br>Email: <a href="mailto:ideaxcorp@gmail.com">ideaxcorp@gmail.com</a> · Phone: <a href="tel:+971567448005">+971 56 744 8005</a></p>
`.trim()
