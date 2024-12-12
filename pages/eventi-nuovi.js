import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EventiPage() {
  const router = useRouter();

  useEffect(() => {
    const hasAccess = sessionStorage.getItem('hasAccess');
    if (!hasAccess) {
      router.push('/protected/codice');
    }
  }, [router]);

  return (
    <div>
      <h1>Benvenuto nella pagina degli eventi!</h1>
    </div>
  );
}