import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-sm md:text-base text-slate-400 tracking-[0.18em] uppercase">
            Cold Call Dojo
          </h1>
        </div>

        {/* Main Card */}
        <div className="glass-panel">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 mb-6">
            <span className="text-xs text-slate-300 tracking-[0.18em] uppercase">
              FOR SALES & FREELANCERS
            </span>
          </div>

          {/* Title */}
          <h1 className="title-large mb-4">
            콜드콜, 게임처럼 연습하기
          </h1>

          {/* Subtitle */}
          <p className="text-body mb-8 max-w-2xl">
            AI 고객과 실전처럼 통화하고, 레벨과 경험치로 성장하는
            <br className="hidden md:block" /> 콜드콜 훈련 플랫폼입니다.
          </p>

          {/* CTA Button */}
          <Link href="/session" className="btn-primary mb-12 inline-block">
            연습 시작하기
          </Link>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-400 mb-1">실전 시뮬레이션</div>
              <div className="text-sm text-slate-200">AI와 실전처럼 통화하며 연습하세요</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-400 mb-1">레벨 시스템</div>
              <div className="text-sm text-slate-200">경험치를 쌓으며 난이도가 자동으로 상승합니다</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-400 mb-1">AI 페르소나</div>
              <div className="text-sm text-slate-200">다양한 고객 유형과 음성 응답으로 실전감을 높입니다</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
