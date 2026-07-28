import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, ExternalLink, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegalModal = ({ isOpen, onClose, initialType = 'terms' }) => {
  const [activeTab, setActiveTab] = React.useState(initialType);

  React.useEffect(() => {
    setActiveTab(initialType);
  }, [initialType, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-[#122219] text-[#123524] dark:text-[#EAE3D2] border border-[#E5DDD0] dark:border-[#C8A96A]/30 rounded-2xl w-full max-w-md max-h-[72vh] flex flex-col shadow-2xl overflow-hidden font-montserrat"
        >
          {/* Top Header Bar */}
          <div className="px-4 py-3 border-b border-[#E5DDD0] dark:border-[#C8A96A]/20 flex items-center justify-between bg-[#123524] text-white shrink-0">
            <div className="flex items-center gap-2">
              {activeTab === 'terms' ? (
                <FileText className="w-4 h-4 text-[#D6AE4D]" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-[#D6AE4D]" />
              )}
              <h3 className="font-serif font-bold text-sm text-white tracking-wide">
                Akole Café • {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Solid Non-Overlapping Tab Switcher */}
          <div className="p-2 bg-[#FAF6EE] dark:bg-[#0E1B14] border-b border-[#E5DDD0] dark:border-[#C8A96A]/20 shrink-0">
            <div className="grid grid-cols-2 gap-1.5 bg-white/70 dark:bg-[#16241B] p-1 rounded-xl border border-[#E5DDD0] dark:border-[#C8A96A]/20">
              <button
                type="button"
                onClick={() => setActiveTab('terms')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold normal-case tracking-normal transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'terms'
                    ? 'bg-[#D6AE4D] text-[#0A1A12] shadow-xs font-bold'
                    : 'text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold normal-case tracking-normal transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'privacy'
                    ? 'bg-[#D6AE4D] text-[#0A1A12] shadow-xs font-bold'
                    : 'text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Clean Scrollable Content Body */}
          <div className="p-4 overflow-y-auto space-y-3.5 text-xs leading-relaxed text-black/80 dark:text-[#EAE3D2]/90 flex-1 bg-white dark:bg-[#122219]">
            {activeTab === 'terms' ? (
              <>
                <div className="p-2.5 rounded-lg bg-[#D6AE4D]/10 border border-[#D6AE4D]/25 text-[11px]">
                  <strong className="text-[#123524] dark:text-[#D6AE4D] block mb-0.5 font-bold">
                    Summary for Akole Café Customers
                  </strong>
                  By ordering online or reserving a table, you agree to our fair service policies, real-time ordering rules, and easy cancellation policy.
                </div>

                <div className="space-y-2.5">
                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      1. Orders & Delivery
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      Food is prepared fresh upon order placement. Delivery estimates depend on traffic and distance within Akole.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      2. Prices & Payments
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      All prices are in INR (₹) inclusive of tax. We accept UPI (GPay/PhonePe), Credit Cards, Net Banking, and COD.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      3. Cancellations & Refunds
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      Cancel within 2 minutes of ordering before kitchen preparation starts. Refunds process within 3–5 business days.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      4. Table Reservations
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      Reserved tables are held for 15 minutes past the scheduled time. For delays, please call +91 98765 43210.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-2.5 rounded-lg bg-[#D6AE4D]/10 border border-[#D6AE4D]/25 text-[11px]">
                  <strong className="text-[#123524] dark:text-[#D6AE4D] block mb-0.5 font-bold">
                    Your Data Protection Guarantee
                  </strong>
                  Akole Café safeguards your contact details and order history. We NEVER sell your personal data to advertisers.
                </div>

                <div className="space-y-2.5">
                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      1. Information We Collect
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      Your name, phone number, email address, and order preferences when you create an account or order food.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      2. How Data is Used
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      To deliver orders, send WhatsApp order tracking updates, award VIP points, and ensure secure account login.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      3. Payment Security
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      Payments are encrypted via PCI-DSS gateways. Banking PINs or card details are NEVER stored on our servers.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#123524] dark:text-white mb-0.5">
                      4. Privacy Support
                    </h4>
                    <p className="text-[11px] text-black/70 dark:text-[#EAE3D2]/80">
                      For data access or account deletion requests, email us at <strong className="text-[#D6AE4D]">privacy@akolecafe.com</strong>.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="px-4 py-3 border-t border-[#E5DDD0] dark:border-[#C8A96A]/20 bg-[#FAF6EE] dark:bg-[#0E1B14] flex items-center justify-between gap-3 shrink-0">
            <Link
              to={activeTab === 'terms' ? '/terms' : '/privacy'}
              target="_blank"
              onClick={onClose}
              className="text-[11px] text-[#D6AE4D] hover:underline font-semibold flex items-center gap-1 normal-case tracking-normal"
            >
              <span>Full Page View</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#D6AE4D] hover:bg-[#B89035] text-[#0A1A12] font-bold text-xs transition-colors shadow-xs normal-case tracking-normal cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>I Understand</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LegalModal;
