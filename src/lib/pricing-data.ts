
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
        name: 'FAQ/Support Bot',
        price: '₹8,000',
        description: "Instantly answer common questions and provide 24/7 support.",
        features: [
          'Handles unlimited FAQs',
          'WhatsApp/Telegram Integration',
          'Deployed on chosen platform',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹2,000/month'],
        buttonText: 'Select Plan',
        color: "blue",
      },
      {
        name: 'Booking Bot',
        price: '₹15,000',
        popular: true,
        description: "Automate appointment and order taking via chat.",
        features: [
          'Order/Booking via Chat',
          'Google Sheet/Airtable Integration',
          'Owner Notifications',
          'Supports WhatsApp, Website, Messenger',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹3,500/month'],
        buttonText: 'Select Plan',
        color: "purple",
      },
      {
        name: 'GPT-Powered Bot',
        price: '₹25,000',
        description: "Engage users with incredibly smart, human-like conversations.",
        features: [
          'Smart, Human-like Replies',
          'Uses OpenAI Credits (*not included*)',
          'Advanced Customization',
          'Deployed on Website/WhatsApp/Telegram',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹5,000/month'],
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
        description: "Perfect for Small Businesses & Personal Sites",
        price: '₹1,800/mo',
        features: [
          '1-3 Page Website',
          'Next.js Framework',
          'Basic CMS Integration',
          '1 Month Free Support',
        ],
        details: ["For 12 months. Maintenance included. Contact for details."],
        buttonText: 'Start Small',
        color: 'blue'
      },
      {
        name: 'Intermediate Web Development',
        description: "Best for Growing Startups",
        price: '₹3,500/mo',
        popular: true,
        features: [
          'Up to 6 Page Website',
          'Next.js Framework',
          'Advanced CMS',
          'Simple API Integrations',
          '1 Month Free Support',
        ],
        details: ["For 12 months. Maintenance included. Contact for details."],
        buttonText: 'Grow Your Business',
        color: 'purple'
      },
      {
        name: 'Enterprise Web Development',
        description: "Custom Solutions for Enterprises",
        price: '₹9,500/mo',
        features: [
          '10+ Page Application',
          'Performance Optimization',
          'Advanced Security Setup',
          'AI Feature Integration',
          '1 Month Free Support',
        ],
        details: ["For 12 months. Maintenance included. Contact for details."],
        buttonText: 'Build Enterprise Solutions',
        color: 'green'
      },
    ]
  },
};
