'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { User } from 'lucide-react';

export function Navbar() {
  const [status, setStatus] = useState('');

  const handleTestLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'aursh@example.com', // 🔁 use a test account
          password: 'securePassword123'
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('token', data.token);
      setStatus('✅ Logged in!');
    } catch (err: any) {
      setStatus('❌ ' + err.message);
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-2xl font-bold text-primary">
              StackIt
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="sm" onClick={handleTestLogin}>
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            {status && (
              <span className="text-sm text-muted-foreground">{status}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
