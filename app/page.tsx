import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ColdCall BALANCE
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
          Voice Trainer v0.1
        </p>
        
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          마이크를 통해 실제 통화처럼 연습하고, AI 클라이언트로부터 현실적인 응답을 받아보세요.
          통화 후 균형잡힌 피드백 리포트를 받을 수 있습니다.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">평가 항목</h2>
          <div className="space-y-3">
            <div>
              <strong className="text-blue-600 dark:text-blue-400">ERS (Emotional Resilience Score)</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                감정적 회복력 점수: 통화 중 스트레스나 부정적 반응에 얼마나 잘 대처했는지 평가합니다.
              </p>
            </div>
            <div>
              <strong className="text-green-600 dark:text-green-400">LS (Logic/Structure Score)</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                논리/구조 점수: 대화의 논리성과 구조화된 커뮤니케이션 능력을 평가합니다.
              </p>
            </div>
          </div>
        </div>

        <Link 
          href="/session"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Start Training
        </Link>
      </div>
    </main>
  );
}

