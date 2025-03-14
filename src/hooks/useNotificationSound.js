import { useEffect, useRef } from 'react';

const useNotificationSound = () => {
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playNotification = () => {
    if (audioContextRef.current && gainNodeRef.current) {
      try {
        const currentTime = audioContextRef.current.currentTime;
        
        // Tạo oscillator với tần số thấp hơn và dễ chịu hơn
        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, currentTime); // Tần số A4 (La)
        
        // Điều chỉnh âm lượng
        const gainNode = gainNodeRef.current;
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.5);
        
        // Kết nối và phát âm thanh
        oscillator.connect(gainNode);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.5);
        
        console.log('Âm thanh đang phát');
      } catch (error) {
        console.error('Lỗi khi phát âm thanh:', error);
      }
    }
  };

  return playNotification;
};

export default useNotificationSound;
