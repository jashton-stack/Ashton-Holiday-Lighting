import { Link } from 'react-router-dom';
import { SITE, NAV_LINKS } from '../lib/site';

export function Footer() {
  return (
    <footer className="bg-ink text-textdark border-t border-white/10">
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
            <span aria-hidden className="inline-block w-2 h-2 rounded-full bg-warmth" />
            <span>Ashton Holiday Lighting</span>
          </Link>
          <p className="mt-4 text-textdark/70 max-w-md">
            Omaha's certified EverLights dealer. Permanent outdoor lighting, installed
            once and controlled from your phone — by an owner-operator who's lit up
            {' '}{SITE.homesLit} Nebraska homes.
          </p>
          <p className="mt-4 text-textdark/55 text-sm">
            Serving {SITE.serviceArea}.
            <br />
            {SITE.cities.join(' · ')}
          </p>
        </div>

        <div>
          <p className="eyebrow text-textdark/55 mb-4">Site</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link className="text-textdark/85 hover:text-warmth" to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li><Link className="text-textdark/85 hover:text-warmth" to="/contact">Get a quote</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-textdark/55 mb-4">Contact</p>
          <ul className="space-y-2 text-textdark/85">
            <li>
              <a href={SITE.phoneHref} className="hover:text-warmth">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-warmth break-all">
                {SITE.email}
              </a>
            </li>
            <li className="pt-3">
              <a
                href={SITE.googleBusinessUrl}
                className="text-warmth hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x border-t border-white/10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-textdark/45">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p>Certified EverLights Dealer · Built in Omaha, NE</p>
      </div>
    </footer>
  );
}
