import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="mb-8 text-center fade-in-down">
          <div className="epic-logo">
            <span className="text-4xl">🎯</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12 fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            콜드콜, 게임처럼 연습하기
          </h1>
          <p className="text-lg md:text-xl text-[#a0a0a0] font-normal leading-relaxed max-w-2xl mx-auto">
            AI 고객과 실전처럼 통화하고, 레벨과 경험치로 성장하는
            <br className="hidden md:block" /> 콜드콜 훈련 플랫폼입니다.
          </p>
        </div>

        {/* Main Card */}
        <div className="modular-card fade-in-up">
          {/* Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center rounded-full bg-[rgba(220,38,38,0.15)] px-4 py-2">
              <span className="text-xs text-[#F87171] tracking-[0.18em] uppercase font-semibold">
                FOR SALES & FREELANCERS
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-8">
            <Link href="/session" className="btn-primary text-lg px-8 py-4">
              연습 시작하기
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#2a2a2a]">
            <div className="text-center">
              <div className="text-3xl mb-3">🎙️</div>
              <div className="text-sm text-[#a0a0a0] mb-2 font-semibold">실전 시뮬레이션</div>
              <div className="text-xs text-[#707070] leading-relaxed">
                AI와 실전처럼 통화하며 연습하세요
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📈</div>
              <div className="text-sm text-[#a0a0a0] mb-2 font-semibold">레벨 시스템</div>
              <div className="text-xs text-[#707070] leading-relaxed">
                경험치를 쌓으며 난이도가 자동으로 상승합니다
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🤖</div>
              <div className="text-sm text-[#a0a0a0] mb-2 font-semibold">AI 페르소나</div>
              <div className="text-xs text-[#707070] leading-relaxed">
                다양한 고객 유형과 음성 응답으로 실전감을 높입니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
