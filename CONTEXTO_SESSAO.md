# Contexto de Sessão — Aventuras Fantásticas Ficha Interativa

## O que é este projeto

Ficha de personagem interativa para os livros-jogos **Aventuras Fantásticas** (série Fighting Fantasy, de Steve Jackson e Ian Livingstone), publicados no Brasil pela Jambô Editora. O projeto é um único arquivo `index.html` com CSS e JS embutidos — sem backend, sem banco de dados, sem dependências externas além das fontes Google Fonts.

---

## Repositório e deploy

| Item | Valor |
|---|---|
| Repositório GitHub | `https://github.com/andreasfernandes93/af_ficha_aventuras` |
| GitHub Pages (site ao vivo) | `https://andreasfernandes93.github.io/af_ficha_aventuras/` |
| Branch principal | `main` |
| Pasta local | `C:\Users\LENOVO\Documents\Aventuras Fantasticas Sheet\` |

### Comandos para atualizar o site
```powershell
cd "C:\Users\LENOVO\Documents\Aventuras Fantasticas Sheet"
git add .
git commit -m "descrição"
git push
```

---

## Arquivos do projeto

| Arquivo | Descrição |
|---|---|
| `index.html` | Aplicação completa (HTML + CSS + JS num único arquivo) |
| `README.md` | Documentação do projeto e instruções de uso |
| `CONTEXTO_SESSAO.md` | Este arquivo |

---

## Terminologia adotada (Aventuras Fantásticas — Jambô Editora)

| Inglês (Fighting Fantasy) | Português (Aventuras Fantásticas) |
|---|---|
| Skill | **HABILIDADE** |
| Stamina | **ENERGIA** |
| Luck | **SORTE** |
| Attack Strength | **FORÇA DE ATAQUE** |
| Test Your Luck | **Testar Sorte** |
| Lucky | **Sortudo** |
| Unlucky | **Azarado** |
| Provisions | **Provisões** |
| Gold | **Ouro** |
| Equipment | **Equipamentos** |
| Monster | **Monstro** |
| Hero | **Herói** |

---

## Regras implementadas

### Criação de personagem
- **HABILIDADE**: 1d6 + 6 (máximo 12)
- **ENERGIA**: 2d6 + 12 (máximo 24)
- **SORTE**: 1d6 + 6 (máximo 12)

### Combate
- Ambos rolam **2d6 + HABILIDADE** = Força de Ataque
- Maior FA acerta o oponente: **−2 ENERGIA**
- Empate: ninguém se fere, rola de novo

### Testar Sorte
- Role 2d6. Se ≤ SORTE atual → **Sortudo**; se > → **Azarado**
- Em ambos os casos: **SORTE −1**

### Sorte no combate
| Situação | Sortudo | Azarado |
|---|---|---|
| No Ataque (após acertar) | −4 Energia no monstro (total) | −1 Energia no monstro (total) |
| Na Defesa (após levar dano) | Anula o dano (+2 de volta) | +1 dano extra (−3 total) |

### Provisões
- Cada Provisão restaura **+4 ENERGIA** (não ultrapassa o valor inicial)

---

## Funcionalidades implementadas

### Abas
1. **🧙 Personagem** — Nome, HABILIDADE/ENERGIA/SORTE com valor atual e inicial editável; botão "Gerar Personagem Aleatório" (rola os dados corretos); botões +/−; resumo das regras de criação
2. **🎒 Inventário** — Ouro e Provisões com contadores +/−; botão "Comer +4 Energia"; lista de equipamentos com adicionar (Enter ou botão) e remover
3. **🎲 Dados** — Rolar 1d6 e 2d6 com animação CSS; "Testar Sorte" com feedback visual (Sortudo/Azarado), exibe detalhes da rolagem e reduz Sorte; histórico de rolagens (últimas 80)
4. **⚔️ Combate** — Arena Herói vs Monstro; Força de Ataque (2d6+Habilidade) manual ou automática; botão "Combater!" que rola para os dois e resolve a rodada; "Sorte no Ataque" e "Sorte na Defesa" com lógica correta; log de combate colorido (últimas 150 entradas)
5. **📜 Notas** — Textarea livre com contador de caracteres; aba também contém os controles de salvar/carregar sessão

### Sistema de salvamento
- **Auto-save**: `localStorage` com chave `af-ficha-v2` — salva automaticamente a cada mudança
- **Exportar JSON**: baixa arquivo `af-nome-data.json` com todos os dados
- **Importar JSON**: carrega arquivo JSON salvo anteriormente (pede confirmação)
- **Apagar tudo**: limpa localStorage e recarrega a página
- Botões de Salvar/Carregar também no cabeçalho (acesso rápido de qualquer aba)

### Estrutura do estado (`localStorage`)
```json
{
  "nome": "string",
  "hab": { "ini": 0, "atu": 0 },
  "ene": { "ini": 0, "atu": 0 },
  "sor": { "ini": 0, "atu": 0 },
  "ouro": 0,
  "provisoes": 10,
  "itens": [{ "id": 123, "nome": "string" }],
  "notas": "string",
  "monstro": { "nome": "", "hab": 7, "ene": 6 },
  "logDados": [{ "ts": "00:00:00", "txt": "html string" }],
  "logCombate": [{ "ts": "00:00:00", "txt": "html string", "cls": "css-class" }]
}
```

---

## Design

- **Tema**: fantasia sombria (dark fantasy)
- **Paleta principal**:
  - Background: `#0d0c18`
  - Surface cards: `#14122a` / `#1d1a35`
  - Dourado (accent): `#c9941a`
  - Azul (Habilidade): `#3498db`
  - Vermelho (Energia / Combate): `#e74c3c`
  - Roxo (Sorte): `#9b59b6`
  - Verde (Sorte positiva / Provisão): `#27ae60`
- **Fontes**: Cinzel Decorative (título), Cinzel (headings), Lora (corpo) — via Google Fonts CDN
- **Layout**: max-width 860px, centrado, cards com border + box-shadow

---

## Responsividade mobile

### Breakpoints
- **≤ 600px**: layout mobile — abas mostram só emoji (`.tab-label { display:none }`), header compacto com botões só emoji (`.hdr-btn-label { display:none }`), stats grid 2 colunas, "moedas de ouro" escondido, add-row do inventário quebra em 2 linhas, arena de combate em 1 coluna
- **≤ 400px**: stats grid 1 coluna

### Classes CSS especiais para mobile
- `.tab-label` — texto das abas (ex: "Personagem"), escondido em mobile
- `.hdr-btn-label` — texto dos botões do header ("Salvar"/"Carregar"), escondido em mobile
- `.resource-suffix` — texto "moedas de ouro" no inventário, escondido em mobile

---

## Decisões técnicas importantes

- **Tudo num único arquivo** `index.html` — facilita deploy no GitHub Pages e uso offline
- **Sem frameworks** — JS vanilla puro, sem React/Vue/etc.
- **Estado como objeto global** `E` — simples, direto, fácil de serializar para JSON
- **localStorage key**: `af-ficha-v2` (incrementar versão se mudar estrutura do estado)
- **Logs de combate/dados** armazenam HTML com tags `<strong>` para formatação inline — funciona via `innerHTML`
- **Função `escapar()`** usada para sanitizar nomes de personagem/monstro antes de inserir no log via innerHTML
- **`renderizarTudo()`** é chamada na inicialização e ao importar JSON — re-renderiza todos os elementos do DOM a partir do estado

---

## Possíveis melhorias futuras (não implementadas)

- Mapa de referência por livro (como o original scarix.be/ffroller/)
- Suporte a regras especiais de livros específicos (ex: magia em A Cidadela do Caos)
- Múltiplos personagens / múltiplas sessões salvas
- Histórico de combates persistido entre sessões
- Modo escuro/claro alternável
- Atalhos de teclado
- Modo PWA completo (manifest.json + service worker para offline total)
- Animação de dados com faces pontuadas (SVG/CSS)

---

## Referência original

O projeto foi inspirado em `https://scarix.be/ffroller/` — uma ficha interativa em inglês. Esta versão é independente, totalmente em português, com as traduções da Jambô Editora.
