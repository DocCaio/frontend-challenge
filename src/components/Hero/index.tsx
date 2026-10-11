import emeraldApe from "@/assets/nfts/emerald-ape.png";

const Hero = () => {
  return (
    <section aria-labelledby="hero-titulo" className="w-full py-6 md:py-12">
      <div className="page-container">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#2F1B12] via-[#21130D] to-[#160D08] p-6 sm:p-10 md:bg-none md:p-0">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
            <div className="flex-1 space-y-4 md:space-y-6">
              <span className="text-xs tracking-wider text-[#A3856C] uppercase md:text-sm">
                Bem-vindo à Kurio
              </span>

              <h1
                id="hero-titulo"
                className="text-2xl font-black uppercase leading-tight tracking-wide text-[#F5F1EB] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                SEJA DONO DO FUTURO <br className="hidden sm:inline" />
                DA ARTE DIGITAL
              </h1>

              <p className="max-w-xl text-xs leading-relaxed text-[#A3856C] sm:text-sm md:text-base">
                Descubra NFTs selecionados de criadores emergentes e consagrados.
                Colecione arte digital rara, apoie artistas e tenha uma parte da
                cultura da internet.
              </p>

              <div className="pt-2">
                <a
                  href="#explorar"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D28A4C] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#110A07] transition-all hover:bg-[#c27a3c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream"
                >
                  <span>EXPLORAR</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative flex shrink-0 justify-center md:justify-end">
              <div className="relative overflow-hidden rounded-3xl border border-[#3D261C] shadow-2xl">
                <img
                  src={emeraldApe}
                  alt="Emerald Ape NFT"
                  width={420}
                  height={420}
                  fetchPriority="high"
                  className="h-72 w-72 object-cover sm:h-96 sm:w-96 md:h-[420px] md:w-[420px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 md:mt-12" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#D28A4C]/40" />
            <span className="h-2 w-2 rounded-full bg-[#D28A4C]" />
            <span className="h-2 w-2 rounded-full bg-[#D28A4C]/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;