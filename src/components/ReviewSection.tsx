import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function ReviewSection() {
  const reviews = [
    {
      id: 1,
      stars: 5,
      text: '출장 때문에 호텔에서 이용했는데 예약부터 방문까지 정말 빨랐습니다. 관리도 꼼꼼했고 분위기도 편안해서 다음에도 다시 이용하고 싶었습니다.',
      author: '이*호 고객님',
      location: '시흥출장마사지 이용',
    },
    {
      id: 2,
      stars: 5,
      text: '퇴근 후 집에서 편하게 받을 수 있어서 생각보다 훨씬 만족했습니다. 친절하고 약속 시간도 정확했습니다. 믿고 부를 수 있는 홈타이입니다.',
      author: '김*은 고객님',
      location: '홈타이 케어 이용',
    },
    {
      id: 3,
      stars: 5,
      text: '시흥에서 여러 출장안마 업체를 이용해봤는데 응대도 가장 친절하고 선입금 없는 100% 현장 후불제라 부담 없이 편안하게 이용했습니다. 다음에도 간다출장마사지를 이용할 예정입니다.',
      author: '박*진 고객님',
      location: '스웨디시 테라피 이용',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#121212] border-t border-[#2C2C2C] relative overflow-hidden" id="customer-reviews-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs text-[#C1121F] font-sans font-semibold tracking-[0.2em] uppercase block">
            소중한 고객 만족 후기
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8F8F8] tracking-tight leading-tight">
            고객이 다시 찾는 간다출장마사지
          </h2>
          <p className="text-sm md:text-base text-[#A8A8A8]">
            실제 이용 고객들의 솔직하고 만족스러운 후기를 소개합니다.
          </p>
          <div className="w-10 h-[1px] bg-[#C1121F] mx-auto mt-4" />
        </div>

        {/* Reviews Grid & Mobile Slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {reviews.map((review, idx) => {
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#181818] border border-[#2C2C2C] hover:border-[#C1121F] rounded-[20px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-[4px] shadow-sm hover:shadow-md group/review-card h-full min-h-[240px]"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C1121F] text-[#C1121F] transition-transform duration-300 group-hover/review-card:scale-110" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-[#A8A8A8] font-sans text-sm sm:text-base leading-relaxed break-keep font-light">
                    "{review.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-[#2C2C2C] flex items-center justify-between shrink-0">
                  <span className="text-xs sm:text-sm text-[#F8F8F8] font-sans font-medium">
                    {review.author}
                  </span>
                  <span className="text-[11px] text-[#E63946] font-medium">
                    {review.location}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center">
          <p className="text-[11px] text-[#A8A8A8] font-sans">
            ※ 고객 개인정보 보호 및 식별성 방지를 위해 일부 내용(이름)은 안전하게 편집되었습니다.
          </p>
        </div>

      </div>
    </section>
  );
}
