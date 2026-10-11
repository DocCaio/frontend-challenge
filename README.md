# Kurio · NFT Marketplace

Implementação do desafio frontend **NFT Marketplace** (React + TypeScript), baseada no layout do Figma. Todo o "backend" (catálogo, carrinho, cupons, autenticação) é **simulado no navegador com MSW**, então o projeto roda a partir de um checkout limpo, sem serviços privados nem backend de produção.

- **Repositório:** `<URL-DO-REPOSITORIO>`
- **Aplicação publicada:** `<URL-DA-APLICACAO>`
- **Decisões, contratos e desvios do Figma:** veja o [ARCHITECTURE.md](./ARCHITECTURE.md)

> **Leia primeiro:** a seção [Status da entrega](#status-da-entrega) mostra, sem rodeios, o que está pronto, o que está parcial e o que ficou pendente.

---

## Sumário

- [Status da entrega](#status-da-entrega)
- [Stack](#stack)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Comandos](#comandos)
- [Credenciais e cupons fictícios](#credenciais-e-cupons-fictícios)
- [Mocks (MSW): dados, persistência e reset](#mocks-msw-dados-persistência-e-reset)
- [Reproduzindo os fluxos de falha](#reproduzindo-os-fluxos-de-falha)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Deploy](#deploy)
- [Solução de problemas](#solução-de-problemas)
- [Considerações finais](#considerações-finais)

---

## Status da entrega

| Área | Situação | Observações |
|---|---|---|
| Início: Hero, catálogo, filtros (coleção, preço, rede), card em destaque | **Feito** | Filtros vivem na URL (sobrevivem a refresh e ao histórico) e reiniciam a paginação |
| Início: cards promocionais, Diário da Cunhagem, footer | **Feito** | Itens fora do escopo ficam desabilitados, sem simular sucesso (ver ARCHITECTURE.md) |
| Busca, ordenação, paginação e abas do catálogo | **Parcial** | A API mockada já aceita `q`, `sort` e `page`; a interface de busca, ordenação e paginação ainda não está ligada |
| Detalhe do NFT | **Pendente** | O botão "Comprar" nos cards é **temporário** e some quando o detalhe existir |
| Carrinho | **Feito** | Quantidades (otimista, com rollback), remoção, cupom, resumo, persistência após refresh, contador no NavBar |
| Login e cadastro | **Feito** | Modal com validação, erros da API, sessão recuperável e mesclagem do carrinho do visitante |
| Pagamento e confirmação do pedido | **Pendente** | O botão "Conectar e finalizar" está desabilitado |
| Perfil, carteiras e favoritos | **Pendente** | |
| MSW (REST) | **Parcial** | Catálogo, carrinho e autenticação com estado consistente e persistente; falta pedidos, favoritos, perfil e carteiras |
| Cenários configuráveis de rede e falha | **Pendente** | Há cenários determinísticos de erro já reproduzíveis (veja abaixo), mas não há seletor de cenário |
| Socket.IO e eventos em tempo real | **Pendente** | Contrato previsto no ARCHITECTURE.md, sem implementação |
| Testes E2E e regressão visual (Playwright) | **Pendente** | |
| Auditoria Lighthouse | **Pendente** | Nenhuma medição foi feita |
| Responsividade e acessibilidade | **Parcial** | Teclado, foco visível, labels, erros associados aos campos e `<dialog>` nativo estão feitos; auditoria completa pendente |
| shadcn/ui | **Pendente** | Os componentes atuais são próprios, com Tailwind |

---

## Stack

**Em uso**

| Responsabilidade | Tecnologia |
|---|---|
| Interface | React |
| Linguagem | TypeScript |
| Build e dev server | Vite |
| Roteamento | TanStack Router |
| Estado remoto | TanStack Query |
| Cliente HTTP | Axios |
| Estilização | Tailwind CSS 4 |
| Mocking | MSW (Service Worker no navegador) |
| Validação de formulários | Zod 4 |
| Aritmética de ETH | decimal.js (valores trafegam como strings decimais) |
| Ícones | react-icons |

**Previstas e ainda não aplicadas:** Socket.IO (`socket.io-client`, `@mswjs/socket.io-binding`), shadcn/ui, Playwright e Lighthouse.

---

## Como rodar

Pré-requisito: **Node.js 20 ou superior**.

```bash
git clone <URL-DO-REPOSITORIO>
cd frontend-challenge
npm ci
```

Crie o arquivo `.env` na raiz do projeto:

```env
VITE_ENABLE_MOCKS=true
```

Inicie o servidor de desenvolvimento com os mocks ligados:

```bash
npm run dev
```

Abra **http://localhost:5173**.

> Acesse por `localhost` (ou HTTPS). O hash de senha dos mocks usa `crypto.subtle`, que o navegador só libera nesses contextos. Abrindo pelo IP da rede local, o login e o cadastro falham.

---

## Variáveis de ambiente

| Variável | Valores | Descrição |
|---|---|---|
| `VITE_ENABLE_MOCKS` | `true` / `false` | Liga o MSW no navegador. Precisa ser `true` no build de demonstração, porque não existe backend real. O Vite lê a variável **no momento do build**. |

---

## Comandos

### Disponíveis

| Objetivo | Comando |
|---|---|
| Desenvolvimento com mocks | `npm run dev` |
| Build de produção | `npm run build` |
| Servir o build localmente | `npm run preview` |
| Verificação de tipos | `npx tsc -b` |
| Lint | `npm run lint` |

Para o build de demonstração com mocks, deixe `VITE_ENABLE_MOCKS=true` no `.env` (ou em `.env.production`) antes de rodar `npm run build`.

### Previstos (ainda não configurados)

| Objetivo | Comando previsto |
|---|---|
| Testes E2E (Playwright, Chromium, desktop e mobile) | `npm run test:e2e` |
| Atualizar baselines de regressão visual | `npm run test:e2e -- --update-snapshots` |
| Auditoria Lighthouse (3 medições, mediana) | `npm run lighthouse` |

---

## Credenciais e cupons fictícios

**Usuários** (dois, como pede o enunciado). O mock guarda apenas o **hash** das senhas, nunca o texto puro:

| Nome | E-mail | Senha |
|---|---|---|
| Ana Colecionadora | `ana@kurio.dev` | `Kurio@123` |
| Bruno Cripto | `bruno@kurio.dev` | `Kurio@123` |

Você também pode criar uma conta nova em **Entrar → Criar conta** (senha com 8+ caracteres, letra e número).

**Cupons** (aplicáveis no carrinho):

| Código | Efeito |
|---|---|
| `KURIO10` | 10% de desconto sobre o subtotal |
| `BEMVINDO` | desconto fixo de 0.25 ETH |
| `VERAO25` | **expirado** (testa o erro de cupom expirado) |
| qualquer outro | **inválido** |

---

## Mocks (MSW): dados, persistência e reset

- Os handlers ficam em `src/mocks/handlers/` (catálogo, carrinho, autenticação). Componentes, hooks e o cliente Axios **não** têm respostas fictícias nem caminhos alternativos: todo cálculo (subtotal, desconto, taxa e total) acontece nos handlers.
- O catálogo é **determinístico**: 48 NFTs gerados sempre iguais (mesmos preços, coleções, redes e estoques).
- O estado (carrinhos, usuários, sessões) é mantido em memória e **persistido no `localStorage`** para sobreviver a refresh:

| Chave | Conteúdo |
|---|---|
| `kurio.mock.carts` | carrinhos por dono (visitante ou usuário) |
| `kurio.mock.users` | usuários (com hash de senha) |
| `kurio.mock.sessions` | sessões ativas e validade |
| `kurio.session` | token e id do usuário logado (lado do cliente) |
| `kurio.visitorId` | identificador do visitante |

### Resetar para o cenário conhecido

Pelo DevTools: **F12 → Application → Storage → Clear site data** e recarregue. Isso apaga o estado persistido, e os dois usuários de demonstração são recriados no próximo carregamento.

Pelo Console (apaga só as chaves do projeto):

```js
['kurio.mock.carts','kurio.mock.users','kurio.mock.sessions','kurio.session','kurio.visitorId']
  .forEach((k) => localStorage.removeItem(k)); location.reload()
```

### Seleção de cenários

Ainda **não há seletor de cenário** (latência variável, timeouts e erros 5xx configuráveis). Hoje existe um cenário padrão, com atrasos fixos por endpoint (200 a 500 ms), e as falhas listadas abaixo são reproduzíveis de forma determinística.

---

## Reproduzindo os fluxos de falha

| Fluxo | Como reproduzir | Resultado esperado |
|---|---|---|
| Cupom inválido | No carrinho, aplique `ABC` | Erro "Cupom inválido..." associado ao campo |
| Cupom expirado | No carrinho, aplique `VERAO25` | Erro "Este cupom expirou." |
| Campo de cupom vazio | Clique em **Aplicar** sem digitar | Mensagem de validação |
| Limite de disponibilidade | No carrinho, aumente a quantidade de um NFT até o limite | O botão `+` desabilita no limite; o excedente via API devolve conflito (409) com mensagem |
| Conflito de cadastro | **Criar conta** com `ana@kurio.dev` | "Esse e-mail já está em uso." no campo |
| Validação de formulário | Envie login/cadastro vazios, com senha curta ou senhas diferentes | Erros por campo, foco no primeiro inválido |
| Credenciais inválidas | **Entrar** com senha errada | "E-mail ou senha incorretos." |
| Sessão expirada | Logado, edite `kurio.mock.sessions` (Application → Local Storage), troque `expiresAt` por `0` e navegue | A próxima requisição autenticada responde `SESSION_EXPIRED`; o app limpa a sessão e volta ao estado de visitante |
| Sessão inválida | Logado, apague a chave `kurio.mock.sessions` e navegue | `SESSION_INVALID`; mesma limpeza |
| Mesclagem do carrinho ao entrar | Como visitante, adicione itens e depois faça login | Os itens do visitante aparecem no carrinho da conta |
| Falha de conexão | DevTools → Network → **Offline** e tente qualquer ação | Mensagem "Sem conexão com o servidor." e botão **Tentar novamente** |
| Carregamento lento (skeletons) | DevTools → Network → **Slow 4G** e recarregue | Skeletons com shimmer no catálogo e no carrinho |

Cenários de timeout após criação de pedido, preço alterado/edição esgotada durante a compra e pagamento recusado dependem do checkout, que ainda não foi implementado.

---

## Estrutura de pastas

```
src/
  app/                  providers, router e layout (RootLayout, NavBar, Footer)
  pages/                telas que compõem features (home, carrinho)
  features/
    catalog/            api, hooks, tipos e componentes do catálogo
    cart/               api, hooks, tipos e componentes do carrinho
    auth/               api, hooks, schemas (Zod) e AuthModal
    journal/            conteúdo e seção "Diário da Cunhagem"
  components/ui/        primitivos compartilhados
  lib/                  http (Axios), sessão, visitante, dinheiro (ETH), cache privado
  mocks/                MSW: db, fixtures, handlers, auth, estado de carrinho
  assets/nfts/          imagens locais
public/
  mockServiceWorker.js  Service Worker do MSW
```

Regra de dependência (sentido único): `app → pages → features → components/ui, lib`. Uma feature não importa de outra; quem junta é a página. Detalhes no [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Deploy

Recomendado: **Vercel** (Netlify e Cloudflare Pages também servem).

1. Defina `VITE_ENABLE_MOCKS=true` nas variáveis de ambiente do projeto.
2. Garanta o fallback de SPA, para acesso direto e refresh nas rotas (`/carrinho`, etc.). Na Vercel, crie `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

3. O arquivo `public/mockServiceWorker.js` precisa ir junto no build (ele é servido como arquivo estático). Se estiver faltando: `npx msw init public/ --save`.

---

## Solução de problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Erros `404` em `/api/...` e "Algo deu errado" na tela | O MSW não está interceptando | Confira `VITE_ENABLE_MOCKS=true` no `.env`, reinicie o dev server e faça **Clear site data** |
| Aviso `intercepted a request without a matching request handler` | Handler não registrado ou arquivo antigo `mocks/handlers.ts` ainda existindo ao lado da pasta `mocks/handlers/` | Apague o arquivo antigo; em desenvolvimento o Console lista os handlers registrados |
| Login/cadastro falham, outras telas funcionam | Página aberta por IP da rede (sem contexto seguro) | Abra por `http://localhost:5173` |
| Service Worker desatualizado | `mockServiceWorker.js` de versão diferente do pacote `msw` | `npx msw init public/ --save` |

---

## Considerações finais

Pelo tempo que me foi disponibilizado, fiz o máximo que pude. Procurei respeitar ao máximo o layout do Figma, mas algumas coisas eu não consegui: a tabela de [Status da entrega](#status-da-entrega) mostra com transparência o que ficou pendente (detalhe do NFT, pagamento e confirmação, perfil e carteiras, tempo real com Socket.IO, testes Playwright e auditoria Lighthouse), e o [ARCHITECTURE.md](./ARCHITECTURE.md) registra os desvios em relação ao Figma e as decisões de UX tomadas pelo caminho.

Preferi entregar menos telas, mas funcionando de ponta a ponta (catálogo, carrinho com cupom e conta com sessão), com estado consistente entre cache e mocks, a entregar muitas telas apenas visuais. Fico à disposição para evoluir o restante.
