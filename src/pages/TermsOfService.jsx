import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  CreditCard, 
  UtensilsCrossed, 
  Clock, 
  HelpCircle, 
  ChevronRight,
  AlertCircle,
  Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import Container from '../components/common/Container';

const TermsOfService = () => {
  const sections = [
    {
      id: 'acceptance',
      icon: ShieldCheck,
      title: '1. Acceptance of Terms',
      content: `Welcome to Akole Café. By accessing our website, placing an order (online or in-store), subscribing to our VIP Loyalty Club, or booking table reservations, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our digital services.`
    },
    {
      id: 'ordering',
      icon: UtensilsCrossed,
      title: '2. Online Food Ordering & Delivery',
      content: `All food items, specialty beverages, and bakery goods displayed on our menu are subject to availability. 
      - Orders are processed immediately upon confirmation.
      - Estimated delivery times given during checkout are approximate and depend on traffic, weather conditions, and distance within Akole and nearby areas.
      - Please ensure accurate delivery details and active phone numbers. Akole Café is not responsible for delayed deliveries caused by incorrect addresses provided by customers.`
    },
    {
      id: 'pricing',
      icon: CreditCard,
      title: '3. Pricing & Payments',
      content: `All prices are listed in Indian Rupees (₹) and include applicable taxes unless specified otherwise.
      - We accept UPI (Google Pay, PhonePe, Paytm), major Credit/Debit cards, Net Banking, and Cash on Delivery (COD).
      - Prices are subject to change without prior notice, but price changes will not affect orders already confirmed.`
    },
    {
      id: 'cancellation',
      icon: Clock,
      title: '4. Order Cancellation & Refunds',
      content: `We strive to serve fresh, high-quality food. Cancellation and refund terms are as follows:
      - **Cancellations:** You can cancel an order within 2 minutes of placement or before kitchen preparation starts.
      - **Refunds:** Eligible refunds for cancelled orders or damaged items will be processed back to your original payment method within 3 to 5 business days.
      - **Quality Concerns:** If you receive an incorrect or damaged item, please contact our support team immediately within 30 minutes of receipt with photo proof for prompt replacement or credit.`
    },
    {
      id: 'reservations',
      icon: CheckCircle2,
      title: '5. Table Reservations Policy',
      content: `Table reservations made via our website are held for up to 15 minutes past the reserved time.
      - If your party is running late, please inform us by phone.
      - We reserve the right to reassign tables for unconfirmed arrivals after the 15-minute grace period during peak dining hours.`
    },
    {
      id: 'loyalty',
      icon: Gift,
      title: '6. VIP Loyalty Club & Promo Offers',
      content: `Akole Café VIP Club points and promo codes are non-transferable and cannot be exchanged for cash.
      - Discount coupons and promotional codes must be applied before final checkout.
      - Akole Café reserves the right to modify or terminate promotional campaigns at any time.`
    },
    {
      id: 'contact',
      icon: HelpCircle,
      title: '7. Contact & Support',
      content: `If you have any questions regarding our Terms of Service or need assistance with an order, please reach out to us:
      - **Email:** support@akolecafe.com
      - **Phone:** +91 98765 43210
      - **Address:** Akole Main Highway, Near City Center, Akole, Maharashtra - 422601`
    }
  ];

  return (
    <div className="bg-[#FAF6EE] dark:bg-[#0A160F] text-[#123524] dark:text-[#EAE3D2] min-h-screen pb-16 transition-colors duration-300">
      <PageBanner 
        title="Terms of" 
        highlight="Service" 
        subtitle="Akole Café Legal Guidelines" 
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
              <FileText className="w-4 h-4" />
              <span>Effective Date: July 28, 2026</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-[#123524] dark:text-white">
              Terms & Conditions of Akole Café
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black/70 dark:text-[#EAE3D2]/80">
              Please read these terms carefully before using our website or ordering services. By placing an order with Akole Café, you acknowledge that you have read, understood, and agreed to these terms.
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
                Have questions about your privacy?
              </h4>
              <p className="text-xs text-black/70 dark:text-[#EAE3D2]/80 mt-1">
                Read how we safeguard your personal details and payment information.
              </p>
            </div>
            <Link
              to="/privacy"
              className="px-5 py-2.5 rounded-xl bg-[#D6AE4D] hover:bg-[#B89035] text-[#0A1A12] font-semibold text-xs transition-colors flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span>View Privacy Policy</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsOfService;
