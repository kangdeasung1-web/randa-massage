import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ProcessSectionProps {
  regionName: string;
}

export default function ProcessSection({ regionName }: ProcessSectionProps) {
  const steps = [
    {
      id: '01',
      title: '예약 문의',
      description: '전화 또는 카카오톡으로 원하는 시간과 장소를 예약',
    },
    {
      id: '02',
      title: '관리사 배정',
      description: '예약 내용 확인 후 가장 가까운 전문 관리사 배정',
    },
    {
      id: '03',
      title: '30분 내 방문',
      description: '자택 · 호텔 · 오피스텔 · 출장지 등 원하는 장소로 방문',
    },
    {
      id: '04',
      title: '케어 시작',
      description: '서비스 종료 후 100% 현장 후불 결제',
    },
  ];

  return (
    <section className="py-[80px] lg:py-[120px] bg-[#0c0c0c] border-t border-white/5 relative overflow-hidden" id="service-process-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[14px] text-[#C8A04D] font-sans font-semibold tracking-[0.25em] uppercase block">
            REAL CUSTOMER PROCESS
          </span>
          <h2 className="text-3xl md:text-[44px] lg:text-[48px] font-bold text-white tracking-tight">
            이용 절차
          </h2>
          <p className="text-[17px] leading-[1.85] text-[#B8B8B8] mt-2">
            지친 하루의 끝, 단 4가지 단계로 만나는 고품격 홈케어
          </p>
          <div className="w-12 h-[1px] bg-[#C8A04D]/60 mx-auto mt-4" />
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 items-stretch relative max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            return (
              <div key={step.id} className="relative flex items-stretch h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="w-full bg-[#161616] border border-[#C8A04D]/18 hover:border-[#C8A04D] rounded-[18px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-[350ms] ease-out hover:-translate-y-[6px] relative group/process-card h-full justify-start shadow-none overflow-hidden min-h-[250px]"
                >
                  {/* Circular Gold Line with White Number */}
                  <div className="w-14 h-14 rounded-full border border-[#C8A04D]/40 flex items-center justify-center bg-transparent group-hover/process-card:border-[#C8A04D] group-hover/process-card:bg-[#C8A04D]/5 group-hover/process-card:scale-105 group-hover/process-card:rotate-[2deg] transition-all duration-300 shrink-0 mb-6">
                    <span className="font-serif text-[18px] font-semibold text-white tracking-widest">
                      {step.id}
                    </span>
                  </div>

                  <span className="text-[18px] md:text-[20px] font-bold text-white tracking-tight font-serif mb-3 leading-none block">
                    {step.title}
                  </span>
                  
                  <p className="text-[13px] text-[#9A9A9A] leading-[1.85] font-sans break-keep max-w-[200px] mx-auto group-hover/process-card:text-neutral-300 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Accent Line Bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#C8A04D] w-8 group-hover/process-card:w-full transition-all duration-500 ease-out" />
                </motion.div>

                {/* Grid Connection Connector (Chevron Arrow) */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-4 z-10 text-[#C8A04D]/30">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Notice */}
        <div className="mt-16 text-center">
          <p className="text-[12px] md:text-[13px] text-[#C8A04D] font-sans font-bold tracking-[0.15em] uppercase">
            24시간 예약 가능 · 100% 후불제 · {regionName} 전지역 방문
          </p>
        </div>

      </div>
    </section>
  );
}
