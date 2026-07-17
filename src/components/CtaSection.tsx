import { motion } from 'motion/react';
import { Phone, MessageSquare, Check } from 'lucide-react';

interface CtaSectionProps {
  regionName: string;
}

export default function CtaSection({ regionName }: CtaSectionProps) {
  return (
    <section 
      className="py-[120px] bg-[#111111] border-t border-white/5 relative overflow-hidden flex items-center justify-center" 
      id="contact-section"
    >
      {/* Soft Background Glow Effects (No heavy patterns) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A04D]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#C8A04D]/2 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#C8A04D]/2 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Top small text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-[14px] text-[#C8A04D] font-sans font-bold tracking-[0.3em] uppercase">
              READY TO RELAX?
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-[56px] font-serif font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15]"
          >
            지금 바로<br />
            <span className="text-white">{regionName} 예약하기</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#B8B8B8] text-[15px] md:text-[17px] leading-[1.9] font-sans max-w-2xl mx-auto break-keep font-light"
          >
            전화 또는 카카오톡으로 원하는 시간과 장소를 알려주시면<br className="hidden sm:block" />
            가장 편안하고 품격 있는 예약을 빠르게 도와드립니다.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md sm:max-w-none mx-auto w-full sm:w-auto"
          >
            {/* Phone Button */}
            <a
              href="tel:010-8451-4040"
              className="w-full sm:w-auto h-[60px] px-10 rounded-full bg-[#C8A04D] hover:bg-[#D9B25E] text-[#111111] font-sans font-bold text-[14px] tracking-[0.15em] flex items-center justify-center gap-2.5 transition-all duration-[250ms] ease-out hover:scale-[1.03] hover:-translate-y-[2px] active:scale-[0.97] shadow-[0_4px_15px_rgba(200,160,77,0.15)] hover:shadow-[0_8px_25px_rgba(200,160,77,0.35)] cursor-pointer shrink-0"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>전화 예약</span>
            </a>

            {/* Kakao Button */}
            <a
              href="https://open.kakao.com/o/sxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-[60px] px-10 rounded-full bg-transparent border border-[#C8A04D] text-white hover:text-[#111111] hover:bg-[#C8A04D] font-sans font-bold text-[14px] tracking-[0.15em] flex items-center justify-center gap-2.5 transition-all duration-[250ms] ease-out hover:scale-[1.03] hover:-translate-y-[2px] active:scale-[0.97] hover:shadow-[0_6px_20px_rgba(200,160,77,0.25)] cursor-pointer shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>카카오톡 상담</span>
            </a>
          </motion.div>

          {/* Bullet notices below buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 text-[#9A9A9A] text-[13px] sm:text-[14px] font-sans font-medium"
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
              <span>100% 후불제</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#C8A04D]/10 flex items-center justify-center text-[#C8A04D] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>시흥 전지역 방문</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
