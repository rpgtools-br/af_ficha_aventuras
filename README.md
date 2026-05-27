# ⚔ Aventuras Fantásticas — Ficha Interativa

Ficha interativa para jogar os livros-jogos da série **Aventuras Fantásticas** (Fighting Fantasy), criada por Steve Jackson e Ian Livingstone.

Projeto 100% client-side: um único arquivo HTML com CSS e JavaScript embutidos. Sem banco de dados, sem backend. Funciona offline e pode ser hospedado no GitHub Pages.

---

## ✨ Funcionalidades

| Aba | O que faz |
|-----|-----------|
| 🧙 **Personagem** | Nome, HABILIDADE, ENERGIA e SORTE — com geração aleatória por dados |
| 🎒 **Inventário** | Ouro, Provisões (com botão "Comer +4 Energia") e lista de itens |
| 🎲 **Dados** | Rolar 1d6 / 2d6, Testar Sorte com feedback visual e histórico |
| ⚔️ **Combate** | Arena completa com Força de Ataque, Sorte no Ataque/Defesa e log |
| 📜 **Notas** | Anotações livres da aventura |

### Salvar / Carregar
- **Auto-save** no `localStorage` do navegador — nunca perde o progresso
- **Exportar JSON** — salva a ficha como arquivo `.json` no computador
- **Importar JSON** — carrega uma sessão salva anteriormente
- Botões de Salvar/Carregar também ficam no cabeçalho (acesso rápido)

---

## 🎲 Regras Básicas (Aventuras Fantásticas)

### Criação de Personagem
| Atributo | Como Rolar | Máximo |
|----------|------------|--------|
| **HABILIDADE** | 1d6 + 6 | 12 |
| **ENERGIA** | 2d6 + 12 | 24 |
| **SORTE** | 1d6 + 6 | 12 |

### Combate
1. Herói e Monstro rolam **2d6 + HABILIDADE** = **Força de Ataque (FA)**
2. Quem tiver a **maior FA** acerta o oponente: **−2 ENERGIA**
3. Em caso de **empate**, ninguém é ferido — role novamente

### Testar Sorte
- Role 2d6. Se o resultado for **≤ SORTE atual** → **Sortudo ✦**
- Se o resultado for **> SORTE atual** → **Azarado ✧**
- Em ambos os casos, **SORTE diminui 1**

#### Sorte no Combate
| Situação | Sortudo | Azarado |
|----------|---------|---------|
| **No Ataque** (após acertar) | −4 Energia no monstro | −1 Energia no monstro |
| **Na Defesa** (após levar dano) | Anula o dano | −3 Energia no herói |

### Provisões
- Cada Provisão restaura **4 pontos de ENERGIA**
- Não pode ultrapassar a ENERGIA inicial

---

## 🚀 Como Usar

### Localmente
Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não precisa de servidor.

### GitHub Pages
1. Crie um repositório no GitHub (ex: `af-ficha`)
2. Faça upload do `index.html` para a branch `main`
3. Vá em **Settings → Pages → Source**: selecione `main` / `root`
4. Acesse `https://seu-usuario.github.io/af-ficha/`

---

## 📁 Estrutura do Projeto

```
index.html   ← Tudo em um único arquivo (HTML + CSS + JS)
README.md    ← Este arquivo
```

---

## 🔖 Séries Compatíveis

Esta ficha é compatível com todos os livros da série publicados no Brasil pela **Jambô Editora** e pela antiga **Marques Saraiva**, incluindo:

- O Feiticeiro da Montanha de Fogo
- A Cidadela do Caos
- A Floresta da Perdição
- Armadilha Mortal
- A Cidade dos Ladrões
- A Mansão do Inferno
- Criatura Selvagem
- … e todos os demais títulos

---

## ⚖️ Aviso Legal

Aventuras Fantásticas / Fighting Fantasy é uma marca registrada de **Steve Jackson e Ian Livingstone**.
Este é um projeto de fã, sem fins lucrativos, criado para uso pessoal.
