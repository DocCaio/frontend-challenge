import { articles } from '../content'

const formatDay = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC', 
  })

export default function JournalSection() {
  return (
    <section
      aria-labelledby="diario-titulo"
      className="page-container pb-12"
    >
      <header className="mb-8 text-center">
        <h2 id="diario-titulo" className="text-2xl font-bold text-kurio-cream md:text-3xl">
          Diário da Cunhagem
        </h2>
        <p className="mt-3 text-xs text-kurio-sand sm:text-sm">
          Histórias, guias e insights para colecionadores sobre o universo da propriedade
          digital.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <li key={article.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg bg-kurio-surface">
              <img
                src={article.image}
                alt={article.alt}
                width={400}
                height={300}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="flex flex-wrap items-center gap-x-2 text-xs text-kurio-sand">
                  <time dateTime={article.publishedAt}>{formatDay(article.publishedAt)}</time>
                  <span aria-hidden="true">|</span>
                  <span>Leitura de {article.readMinutes} min</span>
                </p>

                <h3 className="text-base font-bold leading-snug text-kurio-cream">
                  {article.title}
                </h3>

                <p className="text-xs leading-relaxed text-kurio-sand">
                  {article.description}
                </p>

                <button
                  type="button"
                  disabled
                  title="Em breve"
                  className="mt-auto inline-flex w-fit items-center gap-1 pt-1 text-xs font-bold text-kurio-accent disabled:cursor-not-allowed disabled:opacity-80"
                >
                  Ler mais
                  <span className="sr-only"> sobre {article.title}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}