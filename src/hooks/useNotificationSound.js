import { useEffect, useRef } from 'react';

const useNotificationSound = () => {
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const bufferRef = useRef(null);

  useEffect(() => {
    // Khởi tạo AudioContext khi component mount
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();

    // Tạo một oscillator đơn giản làm âm thanh thông báo
    const createNotificationBuffer = () => {
      const sampleRate = audioContextRef.current.sampleRate;
      const duration = 0.2;  // 200ms
      const bufferSize = sampleRate * duration;
      const buffer = audioContextRef.current.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Tạo một âm thanh "beep" đơn giản
      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        data[i] = Math.sin(2 * Math.PI * 880 * t) * Math.exp(-5 * t);
      }

      bufferRef.current = buffer;
    };

    createNotificationBuffer();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playNotification = () => {
    if (audioContextRef.current && bufferRef.current) {
      try {
        // Tạo source mới cho mỗi lần phát
        const source = audioContextRef.current.createBufferSource();
        source.buffer = bufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start();
        console.log('Âm thanh đang phát');
      } catch (error) {
        console.error('Lỗi khi phát âm thanh:', error);
      }
    }
  };

  return playNotification;
};

export default useNotificationSound;
