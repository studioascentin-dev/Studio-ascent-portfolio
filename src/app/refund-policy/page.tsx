
import { type Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Read the Refund Policy for Studio Ascent digital products.',
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

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="Refund Policy">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2>1. Overview</h2>
        <p>
            Thank you for shopping at Studio Ascent. We appreciate the trust you place in us and our digital products. Our Refund Policy is designed to be clear and straightforward.
        </p>

        <h2>2. Digital Products</h2>
        <p>
            <strong>All sales of digital products are final.</strong>
        </p>
        <p>
            Due to the immediate, irreversible nature of digital goods, we do not offer refunds or exchanges once a purchase is complete and the product has been delivered or made accessible. When you purchase a digital product from our store (such as an After Effects plugin, template, or application), you receive instant access to it. As there is no way to "return" a digital item, we cannot process refunds.
        </p>
        <p>
            We encourage you to read the product descriptions, view the provided videos, and check the system requirements carefully before making a purchase to ensure the product fits your needs.
        </p>

        <h2>3. Non-Delivery of Product</h2>
        <p>
            In the rare event that you do not receive the download link for your purchased product after a successful payment, please do not hesitate to contact us immediately.
        </p>
        <p>
            You can use the **Payment & Support** form located on the product page or at the bottom of our <a href="/store">store</a> page. Please provide the following details:
        </p>
        <ul>
            <li>Your full name</li>
            <li>The email address used for the purchase</li>
            <li>The Payment ID from your confirmation email (e.g., from Razorpay)</li>
        </ul>
        <p>
            Upon verification of your payment, we will promptly send the download link to your email address or WhatsApp number (if provided).
        </p>
        
        <h2>4. Services</h2>
        <p>
            Refunds for services such as Web Development, Video Editing, etc., are handled on a case-by-case basis and are governed by the specific contract or agreement signed for that project.
        </p>

        <h2>5. Contact Us</h2>
        <p>
            If you have any questions about our Refund Policy or are experiencing issues with a product you purchased, please <a href="/#contact">contact us</a>. We are here to help and ensure you have a positive experience with our products.
        </p>
    </LegalPageLayout>
  );
}

