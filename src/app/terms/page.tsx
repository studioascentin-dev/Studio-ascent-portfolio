
import { type Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Read the Terms and Conditions for using the Studio Ascent website and services.',
};

const LegalPageLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-background text-foreground">
        <Header />
        <main className="pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-8 text-center">{title}</h1>
                <div className="prose prose-invert prose-lg mx-auto text-muted-foreground prose-headings:text-foreground prose-headings:font-headline prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground">
                    {children}
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>1. Introduction</h2>
        <p>
            Welcome to Studio Ascent ("we," "our," "us"). These Terms and Conditions ("Terms") govern your use of our website located at [Your Website URL] (the "Site") and the services and products we provide. By accessing or using our Site, you agree to be bound by these Terms.
        </p>

        <h2>2. Services and Products</h2>
        <p>
            We provide creative and technical services including, but not limited to, Web Development, AI Chatbot creation, Video Editing, and Photo Editing ("Services"). We also sell digital products such as software plugins and templates ("Products") through our online store.
        </p>
        
        <h2>3. Use of the Site</h2>
        <p>
            You agree to use the Site for lawful purposes only. You must not use the Site in any way that is fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
            All content on this Site, including text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is our property or the property of our suppliers and protected by copyright and other intellectual property laws. Unless otherwise stated, the digital Products sold on this site are for personal and commercial use by the purchaser only and may not be redistributed, resold, or shared.
        </p>
        
        <h2>5. Digital Products (Store)</h2>
        <p>
            When you purchase a Product from our store, you are granted a non-exclusive, worldwide, perpetual license to use that Product for personal and commercial projects. You are not permitted to resell, redistribute, or repackage the Product. All sales of digital Products are final. Please refer to our <a href="/refund-policy">Refund Policy</a> for more details.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
            To the fullest extent permitted by applicable law, Studio Ascent shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services.
        </p>

        <h2>7. Governing Law</h2>
        <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
        </p>

        <h2>9. Contact Us</h2>
        <p>
            If you have any questions about these Terms, please contact us through the <a href="/#contact">contact form</a> on our homepage.
        </p>
    </LegalPageLayout>
  );
}
