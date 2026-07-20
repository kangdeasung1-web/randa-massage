import { motion } from 'motion/react';
import { Activity, Droplet, Sparkles } from 'lucide-react';

interface CourseOption {
  duration: string;
  price: string;
}

interface CourseItem {
  id: string;
  title: string;
  badge: string;
  options: CourseOption[];
}

const COURSES_DATA: CourseItem[] = [
  {
    id: 'dry-care',
    title: '건식케어',
    badge: 'BEST',
    options: [
      { duration: '60분', price: '70,000원' },
      { duration: '90분', price: '90,000원' },
      { duration: '120분', price: '110,000원' },
    ]
  },
  {
    id: 'swedish-healing',
    title: '스웨디시힐링',
    badge: '인기',
    options: [
      { duration: '60분', price: '90,000원' },
      { duration: '90분', price: '110,000원' },
      { duration: '120분', price: '130,000원' },
      { duration: '150분', price: '150,000원' },
    ]
  },
  {
    id: 'premium-care',
    title: '프리미엄케어',
    badge: '추천',
    options: [
      { duration: '60분', price: '110,000원' },
      { duration: '90분', price: '130,000원' },
      { duration: '120분', price: '150,000원' },
      { duration: '150분', price: '180,000원' },
    ]
  }
];

export default function CourseSection() {
  return (
    <section className="py-12 md:py-20 bg-[#121212] border-t border-[#2C2C2C]" id="premium-courses-section">
      <div className="max-w-7xl mx-auto px-6">
         
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs text-[#C1121F] font-sans font-semibold tracking-wider block">
            엄선된 맞춤형 코스
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] tracking-tight">
            프리미엄 케어 프로그램
          </h2>
          <div className="w-8 h-[1px] bg-[#C1121F] mx-auto mt-3" />
        </div>

        {/* Course Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {COURSES_DATA.map((course, idx) => {
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col justify-start bg-[#181818] border border-[#2C2C2C] rounded-[20px] p-5 sm:p-6 hover:border-[#C1121F] transition-all duration-300 shadow-sm hover:-translate-y-[4px] relative group/card overflow-hidden"
                id={`course-item-${course.id}`}
              >
                {/* Top Badge & SVG Icon with minimal top space */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-[rgba(193,18,31,0.12)] text-[#E63946] text-[10px] font-sans font-bold tracking-wider border border-[rgba(193,18,31,0.35)]">
                    {course.badge}
                  </span>
                  <div className="text-[#E63946] bg-[rgba(193,18,31,0.05)] p-2 rounded-xl border border-[rgba(193,18,31,0.35)]">
                    {course.id === 'dry-care' && (
                      <Activity className="w-4 h-4 stroke-[1.5]" />
                    )}
                    {course.id === 'swedish-healing' && (
                      <Droplet className="w-4 h-4 stroke-[1.5]" />
                    )}
                    {course.id === 'premium-care' && (
                      <Sparkles className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </div>
                </div>

                {/* Course Name (Korean First, Largest) */}
                <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#FFFFFF] tracking-tight leading-none text-left mb-4">
                  {course.title}
                </h3>

                {/* Thin divider before pricing */}
                <div className="w-full h-[1px] bg-[#2C2C2C] mb-3" />

                {/* Pricing Table (Time Left, Price Right, boldest prices) */}
                <div className="space-y-2">
                  {course.options.map((opt, oIdx) => (
                    <div 
                      key={oIdx} 
                      className="flex items-center justify-between py-2 border-b border-[#2C2C2C] last:border-b-0"
                    >
                      <span className="text-xs sm:text-sm font-sans font-medium text-[#A8A8A8]">{opt.duration}</span>
                      <span className="text-xl sm:text-2xl font-sans font-black text-[#E63946] hover:text-[#D62839] transition-colors tracking-tight">
                        {opt.price}
                      </span>
                    </div>
                  ))}
                  {/* Spacer row for height consistency */}
                  {course.options.length < 4 && (
                    <div className="flex items-center justify-between py-2 border-b border-transparent opacity-0 select-none pointer-events-none" aria-hidden="true">
                      <span className="text-xs sm:text-sm font-sans font-medium">150분</span>
                      <span className="text-xl sm:text-2xl font-sans font-black">150,000원</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand Promise Footer */}
        <div className="mt-12 pt-8 border-t border-[#2C2C2C] flex flex-col items-center text-center space-y-4">
          <p className="text-xs text-[#A8A8A8] font-sans leading-relaxed max-w-xl italic">
            "간다출장마사지는 선입금을 요구하지 않습니다. 고객님의 안전한 웰니스 경험을 위해 100% 현장 후불제 시스템을 고수합니다."
          </p>
          <div className="flex gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#2C2C2C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#2C2C2C]" />
          </div>
        </div>

      </div>
    </section>
  );
}
