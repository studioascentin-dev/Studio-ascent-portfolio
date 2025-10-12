
import { type Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for Studio Ascent.',
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

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2>1. Introduction</h2>
        <p>
            Studio Ascent ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our website, services, and products.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
            We collect information that you provide directly to us when you fill out our contact or support forms. This information may include:
        </p>
        <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Service of interest (for contact form)</li>
            <li>Payment ID and Product Name (for support form)</li>
            <li>Your message</li>
        </ul>
        <p>We do not collect any personal information automatically, other than standard server logs which may include your IP address.</p>

        <h2>3. How We Use Your Information</h2>
        <p>
            We use the information we collect for the following purposes:
        </p>
        <ul>
            <li>To respond to your inquiries, comments, and questions submitted through our contact and support forms.</li>
            <li>To provide you with customer support, such as sending you a download link for a purchased product if you did not receive it.</li>
            <li>To communicate with you about our services and products, if relevant to your inquiry.</li>
        </ul>
        
        <h2>4. Information Sharing and Disclosure</h2>
        <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Your information is used solely for the purpose of communicating with you.
        </p>
        <p>
            We use Resend (Resend Inc.) to send email notifications from our contact and support forms. When you submit a form, your provided information (name, email, message, etc.) is passed to Resend to facilitate the email delivery to us. Resend's privacy policy can be found on their website.
        </p>
        
        <h2>5. Data Security</h2>
        <p>
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet-based site can be 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2>6. Your Rights</h2>
        <p>
            You have the right to request access to the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you wish to exercise this right, please contact us.
        </p>
        
        <h2>7. Changes to This Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        
        <h2>8. Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us through the <a href="/#contact">contact form</a> on our homepage.
        </p>
    </LegalPageLayout>
  );
}
