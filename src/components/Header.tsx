import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';
import { ButtonLink } from './ui/Button';
import { NAV_LINKS, SITE } from '../lib/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const onDark = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-white/10'
          : onDark ? 'bg-transparent' : 'bg-bone/85 backdrop-blur-md border-b border-black/5',
      )}
    >
      <div className="container-x flex items-center justify-between h-16 lg:h-20">
        <Link
          to="/"
          className={cn(
            'flex items-center gap-2 font-extrabold tracking-tightish text-lg',
            scrolled || onDark ? 'text-textdark' : 'text-ink',
          )}
        >
          <span aria-hidden className="inline-block w-2 h-2 rounded-full bg-warmth animate-color-cycle" />
          <span>Ashton</span>
          <span className={cn('font-medium', (scrolled || onDark) ? 'text-textdark/70' : 'text-muted')}>
            Holiday Lighting
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => cn(
                'text-sm font-medium transition-colors',
                scrolled || onDark
                  ? isActive ? 'text-warmth' : 'text-textdark/80 hover:text-textdark'
                  : isActive ? 'text-warmth-dark' : 'text-bone-text/80 hover:text-bone-text',
              )}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink to="/contact" variant="primary" className="py-2.5 px-5 text-sm">
            Free quote
          </ButtonLink>
        </div>

        <button
          type="button"
          className={cn(
            'lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full',
            scrolled || onDark ? 'text-textdark border border-white/15' : 'text-ink border border-black/15',
          )}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="text-xl leading-none">{open ? '×' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-ink text-textdark">
          <div className="container-x py-4 flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => cn(
                  'py-3 text-base font-medium',
                  isActive ? 'text-warmth' : 'text-textdark/80',
                )}
              >
                {l.label}
              </NavLink>
            ))}
            <ButtonLink to="/contact" variant="primary" className="mt-3 w-full">
              Get a free quote
            </ButtonLink>
            <p className="text-xs text-textdark/50 mt-2">{SITE.serviceArea}</p>
          </div>
        </div>
      )}
    </header>
  );
}
