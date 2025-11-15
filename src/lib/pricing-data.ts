
import { Check, Bot, Zap, Database, Cog, Shield, Globe, Palette, UserCog, Briefcase, LayoutTemplate, Smartphone, Cloud, Star, Clock } from 'lucide-react';

export const pricingData = {
  'reel-editing': {
    title: 'Video Editing Packages',
    key: 'reel-editing',
    description: 'Choose your edit style — crafted to match your vibe.',
    tiers: [
      {
        name: "Candy Style Edit",
        price: "₹1400",
        description: "Soft, dreamy, and vibrant edits perfect for a sweet aesthetic.",
        features: [
          "Soft pastel color grading",
          "Dreamy transitions & beat sync",
          "Up to 30s (1080p export)",
          "1 free revision",
        ],
        delivery: "1-2 days depends on the complexity",
        addOns: [
          "4k Export @ ₹200",
          "Extra 10 sec @ ₹150",
          "Express Delivery +₹300",
          "Custom thumbnail @ ₹150",
        ],
        popular: false,
        color: "pink",
        buttonText: 'Select Plan',
      },
      {
        name: "Slo-Mo / Velocity Edit",
        price: "₹1700",
        description: "Smooth, dynamic speed ramps and slow-motion effects.",
        features: [
          "Smooth slow motion (Twixtor-style)",
          "Beat-perfect velocity transitions",
          "Up to 30s (1080p export)",
          "1–2 revisions",
        ],
        delivery: "1-2 days depends on the complexity",
        addOns: [
            "4k Export @ ₹200",
            "Extra 10 sec @ ₹200",
            "Express Delivery +₹400",
            "Custom thumbnail @ ₹150",
        ],
        popular: true,
        color: "purple",
        buttonText: 'Select Plan',
      },
      {
        name: "Glitch & Sync Edit",
        price: "₹2500",
        description: "High-energy, rhythmic edits with glitch effects and perfect sync.",
        features: [
          "Advanced beat sync effects",
          "Glitch overlays & motion text",
          "Up to 30s (1080p export)",
          "2 revisions",
        ],
        delivery: "2-3 days",
        addOns: [
          "4k Export @ ₹200",
          "Extra 10 sec @ ₹200",
          "Express Delivery +₹500",
          "Custom thumbnail @ ₹150",
        ],
        popular: false,
        color: "green",
        buttonText: 'Select Plan',
      },
      {
        name: "Trendy Reel Edit",
        price: "₹1800",
        description: "Capitalize on the latest trends with catchy audio and captions.",
        features: [
          "Trend audio & captions",
          "Modern transitions",
          "Up to 30s (1080p export)",
          "1 revision",
        ],
        delivery: "2 Days",
        addOns: [
          "4k Export @ ₹200",
          "Extra 10 sec @ ₹100",
          "Express Delivery +₹300",
          "Custom thumbnail @ ₹150",
        ],
        popular: false,
        color: "yellow",
        buttonText: 'Select Plan',
      },
    ]
  },
  'ai-chatbot': {
    title: 'AI Chatbot Packages',
    key: 'ai-chatbot',
    description: 'Automate your customer interactions with intelligent, custom-built chatbots.',
    tiers: [
      {
        name: 'FAQ / SUPPORT BOT',
        price: '₹8,000 total',
        description: "Perfect for stores, salons, institutes & customer support.",
        features: [
          'Handles unlimited FAQs',
          'WhatsApp / Telegram deployment',
          'Basic customization',
          'Works 24/7',
          '1 revision'
        ],
        delivery: '2–4 days',
        addOns: [
            'Website widget integration @ ₹1,000',
            'Multi-language support @ ₹600',
            'Custom branding @ ₹500',
            'Extra platform (Telegram/WhatsApp) @ ₹800'
        ],
        buttonText: 'Select Plan',
        color: "blue",
      },
      {
        name: 'BOOKING BOT',
        price: '₹15,000 total',
        popular: true,
        description: "Automate appointments, orders & confirmations.",
        features: [
          'Booking & order system via chat',
          'Google Sheet / Airtable integration',
          'Owner notifications',
          'Supports WhatsApp, Website, Messenger',
          '2 revisions'
        ],
        delivery: '4–7 days',
        addOns: [
            'Payment integration @ ₹2,000',
            'Custom admin dashboard @ ₹5,000',
            'Multi-step forms @ ₹1,200',
            'AI assistant for replies @ ₹2,500'
        ],
        buttonText: 'Select Plan',
        color: "purple",
      },
      {
        name: 'GPT-POWERED BOT',
        price: '₹25,000+ total',
        description: "Human-like AI chatbot for advanced businesses.",
        features: [
            'Human-like replies',
            'Smart AI workflows',
            'Advanced custom training',
            'Deployed on Website/WhatsApp/Telegram',
            '3 revisions'
        ],
        delivery: '7–14 days',
        addOns: [
            'Fine-tuning / custom training @ ₹3,000–₹8,000',
            'CRM integration @ ₹4,000+',
            'Multi-agent AI system @ ₹10,000+',
            'Voice bot conversion @ ₹6,500'
        ],
        buttonText: 'Select Plan',
        color: "green",
      },
    ],
  },
  'web-development': {
    title: 'Web Development Packages',
    key: 'web-development',
    description: 'Flexible pricing for Next.js web development, designed to scale with your needs.',
    tiers: [
      {
        name: 'Basic Web Development',
        description: "Simple websites perfect for small businesses & individuals.",
        price: "₹18,000 total",
        features: [
          "1–3 Pages",
          "Next.js Framework",
          "Basic CMS Integration",
          "Mobile Responsive Design",
          "1 Revision",
        ],
        delivery: "5–7 Days",
        addOns: [
          "Extra page @ ₹1,000",
          "Admin dashboard @ ₹3,500",
          "Logo design @ ₹800",
          "Speed optimization @ ₹600",
        ],
        buttonText: 'Select Plan',
        color: 'blue'
      },
      {
        name: 'Intermediate Web Development',
        description: "Best for growing startups that want professional features.",
        price: "₹35,000 total",
        popular: true,
        features: [
          "Up to 6 Pages",
          "Advanced CMS",
          "API Integrations",
          "Hosting Setup",
          "2 Revisions",
        ],
        delivery: "10–14 Days",
        addOns: [
            "Extra page @ ₹1,000",
            "AI chatbot integration @ ₹4,000",
            "Blog system @ ₹2,000",
            "Custom admin panel @ ₹5,000",
        ],
        buttonText: 'Select Plan',
        color: 'purple'
      },
      {
        name: 'Enterprise Web Development',
        description: "High-performance, secure, large-scale business websites.",
        price: "₹55,000+ total",
        features: [
            "10+ Pages",
            "High Performance Optimization",
            "Advanced Security Setup",
            "AI Feature Integration",
            "Full Admin Panel",
            "3 Revisions",
        ],
        delivery: "3–6 Weeks",
        addOns: [
            "Custom API development @ ₹4,000–₹10,000",
            "Multi-language support @ ₹3,000",
            "CRM integration @ ₹6,500+",
            "Branding package @ ₹7,000",
        ],
        buttonText: 'Select Plan',
        color: 'green'
      },
    ]
  },
};
