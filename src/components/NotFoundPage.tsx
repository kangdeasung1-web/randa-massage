import { ArrowLeft, Compass, PhoneCall } from 'lucide-react';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export default function NotFoundPage({ onGoHome }: NotFoundPageProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#111111] px-6 py-24 text-center font-sans">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Animated Icon */}
        <div className="w-16 h-16 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-[#C8A04D] mb-8 animate-pulse">
          <Compass className="w-8 h-8" />
        </div>

        {/* Status Code */}
        <span className="text-sm font-semibold tracking-widest text-[#C8A04D] uppercase mb-2">
          Error 404
        </span>

        {/* Title */}
        <h1 className="text-3xl font-light tracking-tight text-white mb-4 sm:text-4xl">
          길을 잃으셨나요?
        </h1>

        {/* Description */}
        <p className="text-base text-[#D0D0D0] leading-relaxed mb-10">
          요청하신 페이지를 찾을 수 없습니다. 주소를 다시 확인하시거나 아래 버튼을 통해 최고급 안방 힐링 서비스 홈으로 복귀해 보십시오.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-8 py-4 bg-[#C8A04D] hover:bg-[#B38D3C] text-[#111111] text-sm font-bold tracking-wide rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(200,160,77,0.18)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 페이지로 돌아가기</span>
          </button>
          
          <a
            href="tel:010-8451-4040"
            className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white text-white text-sm font-medium tracking-wide rounded-full transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-white/5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>상담원 문의하기</span>
          </a>
        </div>
      </div>
    </div>
  );
}
