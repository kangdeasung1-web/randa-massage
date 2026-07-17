import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { SHARED_FAQS } from '../data/sharedFaqs';

interface FaqSectionProps {
  regionName: string;
}

export default function FaqSection({ regionName }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = SHARED_FAQS;

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-[80px] lg:py-[120px] bg-[#0c0c0c] border-t border-white/5 relative overflow-hidden" id="premium-faqs-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[14px] text-[#C8A04D] font-sans font-semibold tracking-[0.25em] uppercase block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl md:text-[44px] lg:text-[48px] font-bold text-white tracking-tight leading-tight">
            자주 묻는 질문
          </h2>
          <p className="text-[17px] leading-[1.85] text-[#B8B8B8] mt-2">
            예약 전 가장 많이 문의하시는 내용을 정리했습니다.
          </p>
          <div className="w-12 h-[1px] bg-[#C8A04D]/60 mx-auto mt-4" />
        </div>

        {/* FAQs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[18px] border transition-all duration-[300ms] ease-out overflow-hidden ${
                  isOpen
                    ? 'bg-[#181818] border-[#C8A04D] shadow-none'
                    : 'bg-[#0a0a0a] border-[#C8A04D]/18 hover:border-[#C8A04D]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-6 sm:px-8 sm:py-7 flex items-center justify-between text-white focus:outline-none cursor-pointer group"
                >
                  <span className="font-sans font-semibold text-[15px] sm:text-[17px] tracking-tight text-[#E5E5E5] group-hover:text-white transition-colors duration-200">
                    {faq.q}
                  </span>
                  <div className="shrink-0 ml-4 flex items-center justify-center w-6 h-6 rounded-full">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#C8A04D] transition-transform duration-300" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#C8A04D]/60 group-hover:text-[#C8A04D] transition-colors duration-300" />
                    )}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-[15px] text-[#A1A1A1] leading-[1.85] font-sans border-t border-white/5 pt-5 break-keep font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer Announcement */}
        <div className="mt-16 text-center">
          <p className="text-[12px] md:text-[13px] text-[#C8A04D] font-sans font-bold tracking-[0.15em] uppercase">
            24시간 예약 가능 · 100% 후불제 · {regionName} 전지역 방문
          </p>
        </div>

      </div>
    </section>
  );
}
