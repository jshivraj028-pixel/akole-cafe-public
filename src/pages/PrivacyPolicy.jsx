import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Cookie, 
  UserCheck, 
  Mail, 
  ChevronRight,
  Server
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 'collection',
      icon: Database,
      title: '1. Information We Collect',
      content: `When you visit our website, register an account, place an order, or subscribe to Akole Café VIP Club, we collect:
      - **Personal Information:** Name, email address, mobile phone number, delivery addresses.
      - **Order History:** Food items ordered, favorite items, table reservation records, and loyalty points.
      - **Technical Data:** IP address, browser type, device information, and session logs for analytics and security.`
    },
    {
      id: 'usage',
      icon: Eye,
      title: '2. How We Use Your Information',
      content: `We use your data strictly to deliver exceptional dining and online ordering experiences:
      - To process, prepare, and deliver your food orders accurately.
      - To send SMS/WhatsApp order updates and delivery notifications.
      - To award VIP loyalty points and provide tailored discounts.
      - To respond to customer inquiries and improve our cafe menu and digital services.`
    },
    {
      id: 'security',
      icon: Lock,
      title: '3. Data & Payment Security',
      content: `Your security is paramount at Akole Café:
      - All online payments are handled through PCI-DSS compliant payment gateways (UPI, Razorpay, Net Banking).
      - We use SSL encryption to safeguard all data transmitted between your browser and our servers.
      - We **NEVER** store debit/credit card numbers, UPI PINs, or banking passwords on our servers.`
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: '4. Cookies & Local Storage',
      content: `We use minimal cookies and browser storage for:
      - Maintaining your active login session.
      - Remembering items added to your shopping cart.
      - Saving your preferred site theme (Light Mode / Dark Mode).
      You can disable cookies in your browser settings, though some shopping cart features may require cookies.`
    },
    {
      id: 'sharing',
      icon: Server,
      title: '5. Information Sharing Policy',
      content: `We respects your privacy and **NEVER** sell, rent, or trade your personal information to third-party advertisers.
      Information is shared solely with trusted operational partners:
      - Verified delivery riders to deliver food to your address.
      - SMS/Email service providers for order confirmations and OTP verification.`
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: '6. Your Rights & Data Control',
      content: `You have full control over your personal information:
      - **Access & Edit:** You can review and edit your profile details at any time in Profile Settings.
      - **Opt-Out:** You can unsubscribe from promotional SMS or newsletters by clicking unsubscribe or updating notification preferences.
      - **Account Deletion:** You can request complete deletion of your account and order history by contacting support@akolecafe.com.`
    },
    {
      id: 'contact',
      icon: Mail,
      title: '7. Privacy Inquiries & Support',
      content: `For any concerns regarding privacy, data protection, or account security, please contact our Privacy Team:
      - **Email:** privacy@akolecafe.com / support@akolecafe.com
      - **Helpline:** +91 98765 43210
      - **Akole Cafe HQ:** Akole Main Highway, Akole, Maharashtra - 422601`
    }
  ];

  return (
    <div className="bg-[#FAF6EE] dark:bg-[#0A160F] text-[#123524] dark:text-[#EAE3D2] min-h-screen pb-16 transition-colors duration-300">
      <PageBanner 
        title="Privacy" 
        highlight="Policy" 
        subtitle="Akole Café Trust & Transparency" 
      />

      <Container className="pt-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Top Intro Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#122219] border border-[#E5DDD0] dark:border-[#C8A96A]/20 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D6AE4D]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-3 text-[#D6AE4D] font-montserrat font-bold text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Effective Date: July 28, 2026</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-[#123524] dark:text-white">
              Your Privacy Matters to Akole Café
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black/70 dark:text-[#EAE3D2]/80">
              At Akole Café, we treat your personal data with the highest level of care and integrity. This Privacy Policy outlines how we collect, protect, and use your information across our website and mobile application.
            </p>
          </motion.div>

          {/* Sections List */}
          <div className="space-y-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 md:p-7 rounded-2xl bg-white dark:bg-[#122219] border border-[#E5DDD0] dark:border-[#C8A96A]/20 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#D6AE4D]/10 text-[#D6AE4D] dark:bg-[#D6AE4D]/20 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-serif font-bold text-[#123524] dark:text-white">
                        {section.title}
                      </h3>
                      <div className="text-sm leading-relaxed text-black/75 dark:text-[#EAE3D2]/85 whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Links at Bottom */}
          <div className="p-6 rounded-2xl bg-[#D6AE4D]/10 dark:bg-[#D6AE4D]/15 border border-[#D6AE4D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-serif font-bold text-[#123524] dark:text-white text-base">
                Looking for Terms of Service?
              </h4>
              <p className="text-xs text-black/70 dark:text-[#EAE3D2]/80 mt-1">
                Check our ordering terms, cancellation policies, and refund rules.
              </p>
            </div>
            <Link
              to="/terms"
              className="px-5 py-2.5 rounded-xl bg-[#D6AE4D] hover:bg-[#B89035] text-[#0A1A12] font-semibold text-xs transition-colors flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span>View Terms of Service</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
