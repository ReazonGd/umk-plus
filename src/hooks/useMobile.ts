import { useState, useEffect } from 'preact/hooks';

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengecek ukuran layar
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Cek saat pertama kali mount
    checkIfMobile();

    // Tambahkan event listener untuk resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;