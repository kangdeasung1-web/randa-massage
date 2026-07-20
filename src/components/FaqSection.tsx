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
    <section className="pt-12 pb-16 md:pt-14 md:pb-24 bg-[#0c0c0c] border-t border-white/5 relative overflow-hidden" id="premium-faqs-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs text-[#C8A04D] font-sans font-semibold tracking-[0.2em] uppercase block">
            질문과 답변
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            자주 묻는 질문
          </h2>
          <p className="text-sm md:text-base text-neutral-400">
            예약 전 고객분들이 가장 많이 문의하시는 내용을 명쾌하게 정리했습니다.
          </p>
          <div className="w-10 h-[1px] bg-[#C8A04D]/40 mx-auto mt-4" />
        </div>

        {/* FAQs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#181818] border-[#C8A04D]/40 shadow-sm'
                    : 'bg-[#0a0a0a] border-neutral-850 hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-white focus:outline-none cursor-pointer group"
                >
                  <span className="font-sans font-semibold text-sm sm:text-base tracking-tight text-[#E5E5E5] group-hover:text-white transition-colors duration-200">
                    {faq.q}
                  </span>
                  <div className="shrink-0 ml-4 flex items-center justify-center w-6 h-6 rounded-full">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#C8A04D] transition-transform duration-300" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-500 group-hover:text-[#C8A04D] transition-colors duration-300" />
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
                      <div className="px-6 pb-6 sm:px-8 sm:pb-6 text-xs sm:text-sm text-neutral-450 leading-relaxed font-sans border-t border-white/5 pt-4 break-keep font-light">
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
        <div className="mt-12 text-center">
          <p className="text-xs md:text-sm text-[#C8A04D] font-sans font-semibold tracking-wide">
            24시간 실시간 예약 · 100% 현장 후불제 · {regionName} 전지역 신속 방문
          </p>
        </div>

      </div>
    </section>
  );
}
