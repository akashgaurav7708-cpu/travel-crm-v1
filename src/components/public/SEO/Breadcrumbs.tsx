'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  if (pathname === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
        <Home size={12} /> Home
      </Link>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const title = segment.replace(/-/g, ' ');

        return (
          <React.Fragment key={href}>
            <ChevronRight size={10} className="text-slate-300" />
            {isLast ? (
              <span className="text-brand-gold truncate max-w-[150px] sm:max-w-none" aria-current="page">
                {title}
              </span>
            ) : (
              <Link href={href} className="hover:text-brand-gold transition-colors">
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
