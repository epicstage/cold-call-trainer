/**
 * 전화 연결음(뚜르르) 생성 및 재생 함수
 * Web Audio API를 사용하여 간단한 다이얼 톤 생성
 */
export async function playDialTone(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // 오실레이터 설정: 440Hz 톤
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 440; // 440Hz
      oscillator.type = 'sine';
      
      // Gain 조절 (볼륨)
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05); // 페이드 인
      
      // 첫 번째 톤: 0.3초 재생
      oscillator.start(audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.3);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.35); // 페이드 아웃
      
      // 0.2초 쉬고 두 번째 톤
      const secondOscillator = audioContext.createOscillator();
      const secondGainNode = audioContext.createGain();
      
      secondOscillator.connect(secondGainNode);
      secondGainNode.connect(audioContext.destination);
      
      secondOscillator.frequency.value = 440;
      secondOscillator.type = 'sine';
      
      const secondStartTime = audioContext.currentTime + 0.55; // 0.3 + 0.2 + 0.05
      secondGainNode.gain.setValueAtTime(0, secondStartTime);
      secondGainNode.gain.linearRampToValueAtTime(0.3, secondStartTime + 0.05);
      
      secondOscillator.start(secondStartTime);
      secondGainNode.gain.linearRampToValueAtTime(0.3, secondStartTime + 0.3);
      secondGainNode.gain.linearRampToValueAtTime(0, secondStartTime + 0.35);
      secondOscillator.stop(secondStartTime + 0.4);
      
      // 첫 번째 톤 정리
      oscillator.stop(audioContext.currentTime + 0.35);
      
      // 전체 약 1초 후 resolve
      setTimeout(() => {
        resolve();
      }, 900); // 약 0.9초 (두 번째 톤이 끝난 후)
      
    } catch (error) {
      console.warn('Dial tone playback failed:', error);
      // 실패해도 바로 resolve (오류 시 바로 통화 시작)
      resolve();
    }
  });
}


