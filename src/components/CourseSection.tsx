import { motion } from 'motion/react';
import { Diamond, Sparkle, Crown } from 'lucide-react';

interface CourseOption {
  duration: string;
  price: string;
}

interface CourseItem {
  id: string;
  title: string;
  tagline: string;
  options: CourseOption[];
}

const COURSES_DATA: CourseItem[] = [
  {
    id: 'dry-care',
    title: '건식 케어',
    tagline: 'Dry Care',
    options: [
      { duration: '60분', price: '70,000원' },
      { duration: '90분', price: '90,000원' },
      { duration: '120분', price: '110,000원' },
    ]
  },
  {
    id: 'swedish-healing',
    title: '스웨디시 힐링',
    tagline: 'Swedish Healing',
    options: [
      { duration: '60분', price: '90,000원' },
      { duration: '90분', price: '110,000원' },
      { duration: '120분', price: '130,000원' },
      { duration: '150분', price: '150,000원' },
    ]
  },
  {
    id: 'premium-care',
    title: '프리미엄 케어',
    tagline: 'Premium Care',
    options: [
      { duration: '60분', price: '110,000원' },
      { duration: '90분', price: '130,000원' },
      { duration: '120분', price: '150,000원' },
      { duration: '150분', price: '180,000원' },
    ]
  }
];

export default function CourseSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#111111] border-t border-white/5" id="premium-courses-section">
      <div className="max-w-7xl mx-auto px-6">
         
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs text-[#C8A04D] font-sans font-semibold tracking-[0.2em] uppercase block">
            엄선된 맞춤형 코스
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            프리미엄 케어 프로그램
          </h2>
          <p className="text-sm md:text-base text-neutral-400">
            고객님의 최상의 만족을 위해 정성껏 설계된 세심한 테라피 코스입니다.
          </p>
          <div className="w-10 h-[1px] bg-[#C8A04D]/40 mx-auto mt-4" />
        </div>

        {/* Course Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {COURSES_DATA.map((course, idx) => {
            const isPremium = course.id === 'premium-care';
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="flex flex-col h-full justify-between bg-[#161616] border border-neutral-800 rounded-[20px] p-6 sm:p-8 hover:border-[#C8A04D]/40 transition-all duration-300 shadow-sm hover:shadow-md relative group/card"
                id={`course-item-${course.id}`}
              >
                {/* Header Content */}
                <div className="flex flex-col flex-grow">
                  {/* Custom Badges aligned perfectly in a standard height box */}
                  <div className="flex flex-col items-center mb-6 text-center">
                    <div className="h-[76px] flex items-center justify-center mb-4">
                      {course.id === 'dry-care' && (
                        <div className="flex flex-col items-center space-y-2">
                          <Diamond className="w-[28px] h-[28px] text-[#C8A04D]" strokeWidth={1.5} fill="none" />
                          <span className="text-[10px] font-sans font-semibold text-[#C8A04D] uppercase select-none tracking-[4px] pl-[4px]">
                            ESSENTIAL
                          </span>
                        </div>
                      )}
                      {course.id === 'swedish-healing' && (
                        <div className="flex flex-col items-center space-y-2">
                          <Sparkle className="w-[28px] h-[28px] text-[#C8A04D]" strokeWidth={1.5} fill="none" />
                          <span className="text-[10px] font-sans font-semibold text-[#C8A04D] uppercase select-none tracking-[4px] pl-[4px]">
                            SIGNATURE
                          </span>
                        </div>
                      )}
                      {course.id === 'premium-care' && (
                        <div className="flex flex-col items-center space-y-2">
                          <Crown className="w-[28px] h-[28px] text-[#C8A04D]" strokeWidth={1.5} fill="none" />
                          <span className="text-[10px] font-sans font-semibold text-[#C8A04D] uppercase select-none tracking-[4px] pl-[4px]">
                            BLACK LABEL
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {course.title}
                    </h3>
                    
                    <div className="w-24 h-[1px] bg-neutral-800 mt-4 mb-2" />
                    
                    <span className="text-[10px] text-neutral-400 tracking-wider font-sans block uppercase font-medium">
                      {course.tagline}
                    </span>
                  </div>

                  {/* Pricing List - exactly 4 slots to match heights perfectly across all columns */}
                  <div className="space-y-3 flex-grow mb-8 pt-2">
                    {[0, 1, 2, 3].map((slotIdx) => {
                      const opt = course.options[slotIdx];
                      if (opt) {
                        return (
                          <div 
                            key={slotIdx} 
                            className="flex items-center justify-between py-3 border-b border-white/5 group/row transition-colors duration-300"
                          >
                            <span className="font-sans text-sm text-neutral-400 group-hover/row:text-white transition-colors duration-300">
                              {opt.duration}
                            </span>
                            <span className="font-sans font-bold text-base text-white tracking-tight">
                              {opt.price}
                            </span>
                          </div>
                        );
                      } else {
                        // Invisible filler space matching the exact option row height
                        return (
                          <div 
                            key={slotIdx} 
                            className="py-3 border-b border-transparent h-[45px]" 
                          />
                        );
                      }
                    })}
                  </div>
                </div>

                {/* Reservation Action Button - 100% aligned bottom position with rounded-full radius */}
                {isPremium ? (
                  <button
                    onClick={scrollToContact}
                    className="w-full h-[54px] rounded-full bg-[#C8A04D] hover:bg-[#D9B25E] text-[#111111] font-sans font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center shrink-0 mt-auto"
                    id={`course-btn-${course.id}`}
                  >
                    예약 신청하기
                  </button>
                ) : (
                  <button
                    onClick={scrollToContact}
                    className="w-full h-[54px] rounded-full bg-transparent border border-neutral-700 text-neutral-300 font-sans font-bold text-sm tracking-wide transition-all duration-200 hover:border-[#C8A04D] hover:text-white hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer flex items-center justify-center shrink-0 mt-auto"
                    id={`course-btn-${course.id}`}
                  >
                    예약 신청하기
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Brand Promise Footer */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center text-center space-y-4">
          <p className="text-xs md:text-sm text-neutral-400 font-sans leading-relaxed max-w-xl italic">
            "간다출장마사지는 선입금을 요구하지 않습니다. 고객님의 안전한 웰니스 경험을 위해 100% 현장 후불제 시스템을 고수합니다."
          </p>
          <div className="flex gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A04D]/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
          </div>
        </div>

      </div>
    </section>
  );
}
