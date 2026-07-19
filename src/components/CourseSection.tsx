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
    <section className="py-[80px] lg:py-[120px] bg-[#111111] border-t border-white/5" id="premium-courses-section">
      <div className="max-w-7xl mx-auto px-6">
         
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[14px] text-[#C8A04D] font-sans font-semibold tracking-[0.25em] uppercase block">
            GANDA SELECTIVE THERAPY
          </span>
          <h2 className="text-3xl md:text-[44px] lg:text-[48px] font-bold text-white tracking-tight">
            프리미엄 케어 프로그램
          </h2>
          <p className="text-[17px] leading-[1.85] text-[#B8B8B8] mt-2">
            최상의 만족을 선사하는 최고급 테라피 가이드
          </p>
          <div className="w-12 h-[1px] bg-[#C8A04D]/60 mx-auto mt-4" />
        </div>

        {/* Course Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {COURSES_DATA.map((course, idx) => {
            const isPremium = course.id === 'premium-care';
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="flex flex-col h-full justify-between bg-[#161616] border border-[#C8A04D]/18 rounded-[18px] p-8 sm:p-10 hover:border-[#C8A04D] hover:-translate-y-[6px] transition-all duration-[350ms] ease-out shadow-none relative group/card"
                id={`course-item-${course.id}`}
              >
                {/* Header Content */}
                <div className="flex flex-col flex-grow">
                  {/* Custom Badges aligned perfectly in a standard height box */}
                  <div className="flex flex-col items-center mb-8 text-center">
                    <div className="h-[76px] flex items-center justify-center mb-6">
                      {course.id === 'dry-care' && (
                        <div className="flex flex-col items-center space-y-2.5">
                          <Diamond className="w-[30px] h-[30px] text-[#C8A04D]" strokeWidth={1.5} fill="none" />
                          <span className="text-[10px] font-sans font-semibold text-[#C8A04D] uppercase select-none tracking-[4px] pl-[4px]">
                            ESSENTIAL
                          </span>
                        </div>
                      )}
                      {course.id === 'swedish-healing' && (
                        <div className="flex flex-col items-center space-y-2.5">
                          <Sparkle className="w-[30px] h-[30px] text-[#C8A04D]" strokeWidth={1.5} fill="none" />
                          <span className="text-[10px] font-sans font-semibold text-[#C8A04D] uppercase select-none tracking-[4px] pl-[4px]">
                            SIGNATURE
                          </span>
                        </div>
                      )}
                      {course.id === 'premium-care' && (
                        <div className="flex flex-col items-center space-y-2.5">
                          <Crown className="w-[30px] h-[30px] text-[#C8A04D]" strokeWidth={1.5} fill="none" />
                          <span className="text-[10px] font-sans font-semibold text-[#C8A04D] uppercase select-none tracking-[4px] pl-[4px]">
                            BLACK LABEL
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-3xl sm:text-[36px] font-serif font-bold text-white tracking-tight leading-none">
                      {course.title}
                    </h3>
                    
                    {/* Thinner, longer gold line */}
                    <div className="w-36 h-[0.5px] bg-[#C8A04D]/40 mt-6 mb-3" />
                    
                    <span className="text-[11px] text-[#C8A04D] tracking-[0.2em] font-sans block uppercase font-medium opacity-80">
                      {course.tagline}
                    </span>
                  </div>

                  {/* Pricing List - exactly 4 slots to match heights perfectly across all columns */}
                  <div className="space-y-4 flex-grow mb-10 pt-4">
                    {[0, 1, 2, 3].map((slotIdx) => {
                      const opt = course.options[slotIdx];
                      if (opt) {
                        return (
                          <div 
                            key={slotIdx} 
                            className="flex items-center justify-between py-3.5 border-b border-white/5 group/row transition-colors duration-300"
                          >
                            <span className="font-sans text-[15px] text-[#9A9A9A] group-hover/row:text-white transition-colors duration-300">
                              {opt.duration}
                            </span>
                            <span className="font-sans font-bold text-[19px] text-white tracking-tight">
                              {opt.price}
                            </span>
                          </div>
                        );
                      } else {
                        // Invisible filler space matching the exact option row height
                        return (
                          <div 
                            key={slotIdx} 
                            className="py-3.5 border-b border-transparent h-[53px]" 
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
                    className="w-full h-[60px] rounded-full bg-[#C8A04D] hover:bg-[#D9B25E] text-[#111111] font-sans font-bold text-[13px] tracking-[0.2em] uppercase transition-all duration-[250ms] ease-out hover:scale-[1.03] hover:-translate-y-[2px] active:scale-[0.98] shadow-[0_4px_15px_rgba(200,160,77,0.15)] hover:shadow-[0_6px_20px_rgba(200,160,77,0.25)] cursor-pointer flex items-center justify-center shrink-0 mt-auto"
                    id={`course-btn-${course.id}`}
                  >
                    예약 문의
                  </button>
                ) : (
                  <button
                    onClick={scrollToContact}
                    className="w-full h-[60px] rounded-full bg-transparent border border-[#C8A04D]/40 text-[#C8A04D] font-sans font-bold text-[13px] tracking-[0.2em] uppercase transition-all duration-[250ms] ease-out hover:border-[#C8A04D] hover:bg-[#C8A04D]/5 hover:scale-[1.03] hover:-translate-y-[2px] active:scale-[0.98] hover:shadow-[0_4px_20px_rgba(200,160,77,0.25)] cursor-pointer flex items-center justify-center shrink-0 mt-auto"
                    id={`course-btn-${course.id}`}
                  >
                    예약 문의
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Brand Promise Footer */}
        <div className="mt-28 pt-12 border-t border-white/5 flex flex-col items-center text-center space-y-6">
          <p className="text-[13px] text-[#9A9A9A] font-sans leading-relaxed max-w-2xl italic">
            "간다출장마사지는 선입금을 요구하지 않습니다. 고객님의 안전한 웰니스 경험을 위해 100% 현장 후불제 시스템을 고수합니다."
          </p>
          <div className="flex gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A04D]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A04D]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A04D]/20" />
          </div>
        </div>

      </div>
    </section>
  );
}
