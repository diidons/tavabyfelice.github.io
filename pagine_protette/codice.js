import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CodicePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/check-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
        sessionStorage.setItem('hasAccess', 'true');
        router.push('/eventi');
    } else {
      const data = await response.json();
      setError(data.message || 'Errore di accesso');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Inserisci il Codice di Accesso</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Codice a 4 cifre"
          maxLength="4"
          required
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Accedi</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}