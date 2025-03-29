'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // 返回上一页
    } else {
      router.push('/'); // 返回首页
    }
  };

  return (
    <button className="opacity-50 hover:opacity-100 hover:underline" onClick={handleBack}>cd ..
    </button>
  );
}
