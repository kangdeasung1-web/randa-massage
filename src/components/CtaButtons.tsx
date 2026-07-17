import { Phone, MessageSquare } from 'lucide-react';

interface CtaButtonsProps {
  className?: string;
  isSmall?: boolean;
}

export default function CtaButtons({ className = "", isSmall = false }: CtaButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}>
      {/* Phone Button */}
      <a
        href="tel:010-8451-4040"
        className={`w-full sm:w-auto ${isSmall ? 'h-[50px] px-8 text-[13px]' : 'h-[60px] px-10 text-[14px]'} rounded-full bg-[#C8A04D] hover:bg-[#D9B25E] text-[#111111] font-sans font-bold tracking-[0.15em] flex items-center justify-center gap-2.5 transition-all duration-[250ms] ease-out hover:scale-[1.03] hover:-translate-y-[2px] active:scale-[0.97] shadow-[0_4px_15px_rgba(200,160,77,0.15)] hover:shadow-[0_8px_25px_rgba(200,160,77,0.35)] cursor-pointer shrink-0`}
      >
        <Phone className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} fill-current`} />
        <span>전화로 빠른 예약</span>
      </a>

      {/* Kakao Button */}
      <a
        href="https://open.kakao.com/o/sxxxxx"
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full sm:w-auto ${isSmall ? 'h-[50px] px-8 text-[13px]' : 'h-[60px] px-10 text-[14px]'} rounded-full bg-transparent border border-[#C8A04D] text-[#C8A04D] hover:text-[#111111] hover:bg-[#C8A04D] font-sans font-bold tracking-[0.15em] flex items-center justify-center gap-2.5 transition-all duration-[250ms] ease-out hover:scale-[1.03] hover:-translate-y-[2px] active:scale-[0.97] hover:shadow-[0_6px_20px_rgba(200,160,77,0.25)] cursor-pointer shrink-0`}
      >
        <MessageSquare className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        <span>카카오톡 상담하기</span>
      </a>
    </div>
  );
}
