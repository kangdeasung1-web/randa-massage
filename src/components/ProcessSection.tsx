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
    <section className="py-16 md:py-24 bg-[#121212] border-t border-[#2C2C2C] relative overflow-hidden" id="service-process-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs text-[#C1121F] font-sans font-semibold tracking-[0.2em] uppercase block">
            간편하고 안전한 홈케어
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8F8F8] tracking-tight">
            이용 절차 안내
          </h2>
          <p className="text-sm md:text-base text-[#A8A8A8]">
            지친 하루의 끝, 단 4가지 단계로 만나는 고품격 홈케어
          </p>
          <div className="w-10 h-[1px] bg-[#C1121F] mx-auto mt-4" />
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch relative max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            return (
              <div key={step.id} className="relative flex items-stretch h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="w-full bg-[#181818] border border-[#2C2C2C] hover:border-[#C1121F] rounded-[20px] p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-[4px] relative group/process-card h-full justify-start shadow-sm hover:shadow-md overflow-hidden min-h-[220px]"
                >
                  {/* Circular red Line with White Number */}
                  <div className="w-12 h-12 rounded-full border border-[#2C2C2C] flex items-center justify-center bg-transparent group-hover/process-card:border-[#C1121F] group-hover/process-card:bg-[rgba(193,18,31,0.05)] transition-all duration-300 shrink-0 mb-6">
                    <span className="text-sm font-semibold text-[#A8A8A8] group-hover/process-card:text-[#C1121F] transition-colors">
                      {step.id}
                    </span>
                  </div>

                  <span className="text-base sm:text-lg font-bold text-[#F8F8F8] tracking-tight mb-2 block">
                    {step.title}
                  </span>
                  
                  <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed font-sans break-keep max-w-[180px] mx-auto group-hover/process-card:text-[#F8F8F8] transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Accent Line Bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#2C2C2C] w-8 group-hover/process-card:w-full group-hover/process-card:bg-[#C1121F] transition-all duration-300 ease-out" />
                </motion.div>

                {/* Grid Connection Connector (Chevron Arrow) */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-4 z-10 text-[#2C2C2C]">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs md:text-sm text-[#C1121F] font-sans font-semibold tracking-wide">
            24시간 실시간 예약 · 100% 현장 후불제 · {regionName} 전지역 신속 방문
          </p>
        </div>

      </div>
    </section>
  );
}
