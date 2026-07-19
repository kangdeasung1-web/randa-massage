import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import CtaButtons from './CtaButtons';

interface CtaSectionProps {
  regionName: string;
}

export default function CtaSection({ regionName }: CtaSectionProps) {
  return (
    <section 
      className="py-16 md:py-24 bg-[#111111] border-t border-white/5 relative overflow-hidden flex items-center justify-center" 
      id="contact-section"
    >
      {/* Soft Background Glow Effects (No heavy patterns) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A04D]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#C8A04D]/2 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#C8A04D]/2 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top small text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-xs text-[#C8A04D] font-sans font-bold tracking-wider uppercase">
              지친 일상에 드리는 가장 편안한 쉼표
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl font-sans font-bold text-white tracking-tight leading-tight"
          >
            지금 바로 {regionName} 예약하기
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto break-keep font-light"
          >
            전화 또는 카카오톡으로 원하는 시간과 장소를 알려주시면<br className="hidden sm:block" />
            가장 빠르고 친절하게 고품격 맞춤 예약을 안내해 드리겠습니다.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <CtaButtons className="pt-2" />
          </motion.div>

          {/* Bullet notices below buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 text-neutral-400 text-xs sm:text-sm font-sans font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#C8A04D]/10 flex items-center justify-center text-[#C8A04D] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>24시간 상담 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#C8A04D]/10 flex items-center justify-center text-[#C8A04D] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>100% 현장 후불제</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#C8A04D]/10 flex items-center justify-center text-[#C8A04D] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>시흥 전지역 신속 방문</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
