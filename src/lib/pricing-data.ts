
import { Check, Bot, Zap, Database, Cog, Shield, Globe, Palette, UserCog } from 'lucide-react';

export const pricingData = {
  'video-editing': {
    title: 'Video Editing',
    key: 'video-editing',
    tiers: [
      {
        name: 'Basic Video Editing',
        price: '₹2,000',
        features: [
          'Simple Cuts & Transitions',
          'Up to 5 Mins (1080p export)',
          'Royalty-Free Music',
          'Max File Size: 5GB',
        ],
        details: ['2 Revisions included', 'Delivery: 2-3 Days'],
        addOns: [
          'Extra minute @ ₹500/min',
          'Express delivery +₹1,000',
          'Extra per GB @ ₹100',
        ],
        buttonText: 'Select Plan',
      },
      {
        name: 'Intermediate Video Editing',
        price: '₹5,000',
        popular: true,
        features: [
          'Color Grading & Sound Design',
          'Up to 10 Mins (1080p export)',
          'Basic Motion Graphics',
          'Max File Size: 10GB-20GB',
        ],
        details: ['3 Revisions included', 'Delivery: 4-5 Days'],
        addOns: [
          'Extra minute @ ₹700/min',
          'Express delivery +₹1,500',
          'Extra per GB @ ₹100',
        ],
        buttonText: 'Select Plan',
      },
      {
        name: 'Pro Video Editing',
        price: '₹10,000',
        features: [
          'Advanced Effects & VFX',
          'Up to 20 Mins (1080p/4K export)',
          'Custom Animations',
          'Max File Size: 50GB-80GB',
        ],
        details: ['Unlimited Revisions', 'Delivery: 7-10 Days'],
        addOns: [
          'Extra minute @ ₹1,000/min',
          'Express delivery +₹2,000',
          'Extra per GB @ ₹100',
        ],
        buttonText: 'Select Plan',
      },
    ],
  },
  'ai-chatbot': {
    title: 'AI Chatbot',
    key: 'ai-chatbot',
    tiers: [
      {
        name: 'FAQ/Support Bot',
        price: '₹8,000',
        features: [
          'Handles FAQs',
          'WhatsApp/Telegram Integration',
          'Deployed on chosen platform',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹2,000/month'],
        buttonText: 'Select Plan',
      },
      {
        name: 'Booking Bot',
        price: '₹15,000',
        popular: true,
        features: [
          'Order/Booking via Chat',
          'Google Sheet/Airtable Integration',
          'Owner Notifications',
          'Supports WhatsApp, Website, Messenger',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹3,500/month'],
        buttonText: 'Select Plan',
      },
      {
        name: 'GPT-Powered Bot',
        price: '₹25,000',
        features: [
          'Smart, Human-like Replies',
          'Uses OpenAI Credits (*not included in price*)',
          'Advanced Customization (intents, flows)',
          'Deployed on Website/WhatsApp/Telegram',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹5,000/month'],
        buttonText: 'Select Plan',
      },
    ],
  },
  'web-development': {
    title: 'Web Development',
    key: 'web-development',
    description: 'Flexible pricing for Next.js web development, designed to scale with your needs.',
    tiers: [
        {
            name: 'Basic Web Development',
            description: "Perfect for Small Businesses & Personal Sites",
            price: '₹20,000',
            priceSubtitle: 'Starting at',
            features: [
                { icon: Check, text: '1-3 Page Website' },
                { icon: Zap, text: 'Next.js Framework' },
                { icon: Database, text: 'Basic CMS Integration' },
                { icon: Check, text: '1 Month Support' },
            ],
            buttonText: 'Start Small',
            size: 'small',
        },
        {
            name: 'Intermediate Web Development',
            description: "Best for Growing Startups",
            price: '₹75,000',
            priceSubtitle: 'Starting at',
            popular: true,
            features: [
                { icon: Check, text: 'Up to 6 Page Website' },
                { icon: Zap, text: 'Next.js Framework' },
                { icon: Database, text: 'Advanced CMS' },
                { icon: Cog, text: 'Simple API Integrations' },
                { icon: Check, text: '2 Months Support' },
            ],
            buttonText: 'Grow Your Business',
            size: 'medium',
        },
        {
            name: 'Enterprise Web Development',
            description: "Custom Solutions for Enterprises",
            price: '₹1,50,000+',
            priceSubtitle: 'Starting at',
            priceSubDescription: 'Custom Pricing Available',
            features: [
                { icon: Check, text: '10+ Page Application' },
                { icon: Zap, text: 'Performance Optimization' },
                { icon: Shield, text: 'Advanced Security Setup' },
                { icon: Bot, text: 'AI Feature Integration' },
                { icon: Globe, text: 'Multi-language Support' },
                { icon: Palette, text: 'UI/UX Premium Design' },
                { icon: UserCog, text: 'Custom Admin Dashboard' },
                { icon: Cog, text: 'Custom Integrations' },
                { icon: Check, text: '3+ Months Support' },
            ],
            buttonText: 'Build Enterprise Solutions',
            size: 'large',
        },
    ]
  },
};
