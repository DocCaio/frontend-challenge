const Hero = () => {
  return (
    <main className="w-full px-4 py-6 md:px-10 md:py-12">
      <div
        className="
          mx-auto max-w-7xl
          overflow-hidden rounded-2xl
          bg-gradient-to-br from-orange-500 to-amber-950
          p-4 sm:p-6
          md:bg-none md:p-0
        "
      >       
        <div className="flex flex-row items-center gap-3 sm:gap-6 md:gap-10">

      
          <div className="min-w-0 flex-1 space-y-3 md:space-y-6">

            <span className="text-xs font-medium uppercase tracking-widest text-orange-200 sm:text-sm">
              Bem-vindo à Kurio
            </span>

            <h1 className="text-xl font-bold leading-tight text-[#F5F1EB] sm:text-3xl md:text-5xl lg:text-6xl">
              Seja Dono do Futuro da Arte Digital
            </h1>

            <p className="text-xs leading-relaxed text-[#CFB28C] sm:text-sm md:text-lg">
              Descubra NFTs selecionados de criadores emergentes e
              consagrados. Colecione arte digital rara, apoie artistas
              e tenha uma parte da cultura da internet.
            </p>

            <a
              href="#explorar"
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl bg-[#D28A4C]
                px-3 py-2 text-xs font-semibold text-white
                transition-colors hover:bg-[#B97135]
                sm:px-5 sm:py-3 sm:text-sm
              "
            >
              <span>Explorar</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="block h-4 w-4 shrink-0 md:hidden"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </a>
          </div>

         
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#D28A4C"
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0 sm:h-6 sm:w-6"
              aria-hidden="true"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>

            <img
              src="https://imgur.com/a/u82FNtK"
              alt="Arte digital da coleção Kurio"
              className="
                h-40 w-full min-w-0
                rounded-2xl object-cover
                sm:h-64
                md:h-[420px]
              "
            />

          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;