import { Link } from '@tanstack/react-router'
import {
  COPYRIGHT_YEAR,
  contact,
  features,
  linkColumns,
  socials,
  wallets,
  type FooterLink,
} from './content'
import Newsletter from './Newsletter'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream'

const divider = 'lg:border-l lg:border-kurio-accent lg:pl-6'

function FooterItem({ link }: { link: FooterLink }) {
  if (link.collection) {
    return (
      <Link
        to="/"
        search={{ collection: link.collection, sort: 'recent' as const, page: 1 }}
        hash="explorar"
        className={`text-sm text-kurio-cream transition-colors hover:text-kurio-accent-hover ${focusRing}`}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <span title="Em breve" className="cursor-default text-sm text-kurio-cream">
      {link.label}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 md:px-10">
      <div className="bg-kurio-surface">

        <div className="grid gap-8 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-12">
          {features.map((feature, i) => (
            <div key={feature.title} className={i > 0 ? divider : 'lg:pr-6'}>
              <div
                aria-hidden="true"
                className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-kurio-accent text-2xl font-bold text-kurio-bg"
              >
                {feature.letter}
              </div>
              <h2 className="mt-4 text-lg font-bold text-kurio-cream">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-kurio-sand">
                {feature.description}
              </p>
            </div>
          ))}

          <div className={divider}>
            <Newsletter />
          </div>
        </div>


        <div className="bg-kurio-band">
          <div className="grid items-center gap-3 px-6 py-5 text-sm text-kurio-cream sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
            <Link
              to="/"
              search={{ collection: 'all', sort: 'recent' as const, page: 1 }}
              className={`w-fit font-bold uppercase tracking-wider ${focusRing}`}
            >
              Kurio
            </Link>
            <p>{contact.tagline}</p>
            <a
              href={`mailto:${contact.email}`}
              className={`w-fit transition-colors hover:text-kurio-accent-hover ${focusRing}`}
            >
              {contact.email}
            </a>
            <a
              href={contact.phoneHref}
              className={`w-fit transition-colors hover:text-kurio-accent-hover ${focusRing}`}
            >
              {contact.phone}
            </a>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-8 px-6 py-8 lg:grid-cols-4 lg:px-12">
          {linkColumns.map((column) => (
            <nav key={column.id} aria-labelledby={`footer-${column.id}`}>
              <h2 id={`footer-${column.id}`} className="text-lg font-bold text-kurio-cream">
                {column.title}
              </h2>
              <ul className="mt-2 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-lg font-bold text-kurio-cream">Redes sociais</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Kurio no ${label} (abre em nova aba)`}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border border-kurio-accent text-kurio-accent transition-colors hover:bg-kurio-accent hover:text-kurio-bg ${focusRing}`}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-lg font-bold text-kurio-cream">Carteiras compatíveis</h2>
            <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-kurio-accent/40 bg-kurio-band px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-kurio-accent">
              {wallets.map((wallet, i) => (
                <li key={wallet} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">•</span>}
                  {wallet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs text-kurio-cream">
        © {COPYRIGHT_YEAR} Kurio. Propriedade digital para todos.
      </p>
    </footer>
  )
}