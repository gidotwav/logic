# 🚀 Plataforma Interativa de Lógica de Programação & SQL

Uma plataforma educacional completa, moderna e 100% interativa desenvolvida com **React, TypeScript, Tailwind CSS, SQLite WebAssembly (`sql.js`) e Python Engine client-side**, criada para ensinar Lógica e Bancos de Dados na prática ("Aprender Fazendo").

![Preview](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Recursos Principais

- 🧠 **Trilha de Lógica de Programação (Python)**: Do básico de variáveis e condicionais até funções, recursão e análise de dados.
- 🗄️ **Trilha de SQL**: De consultas simples com `SELECT`/`WHERE` até múltiplos `JOIN`s, Subqueries e Window Functions (`ROW_NUMBER`, `RANK`, `PARTITION BY`).
- 🏬 **5 Bancos de Dados Reais**: Schemas completos com dados de Loja Virtual, Universidade, Streaming de Música, Gestão de Empresa e Rede Social.
- ⚡ **Execução 100% no Navegador**:
  - SQLite real executado localmente via WebAssembly (`sql.js`).
  - Interpretador Python client-side com captura de `print()`, suporte a `input()` e runner de casos de teste ocultos.
- 💡 **Sistema de Dicas Progressivas** (Dica 1, Dica 2, Dica 3 e Revelar Solução).
- 📖 **Explicação Didática em 8 Pontos**: Análise detalhada de cada exercício com raciocínio lógico, erros comuns, boas práticas e analogias do mundo real.
- 🎮 **Gamificação Completa**: XP, Níveis 1 a 10, Streak diário, 10 Conquistas com confetes e efeitos sonoros via Web Audio API.
- 🔄 **Modo Revisão** (Repetição espaçada com foco em erros passados).
- 🌟 **Desafio Diário** (Exercício diário com bônus de 2x XP).
- 🧪 **Playground Sandbox** para consultas SQL e scripts Python livres.
- ⚙️ **Configurações**: Tema Escuro / Claro, áudio e exportação/importação de progresso em JSON.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Ícones)
- **Banco de Dados**: [sql.js](https://sql.js.org/) (SQLite compilado para WebAssembly)
- **Efeitos & Gamificação**: `canvas-confetti`, Web Audio API nativa
- **Deploy**: [Vercel](https://vercel.com/) / Netlify / GitHub Pages

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173/
```

---

## 📦 Como Fazer Deploy no Vercel

1. Crie um novo repositório no seu [GitHub](https://github.com/new).
2. Conecte o repositório local e faça o push:
```bash
git init
git add .
git commit -m "feat: initial commit - plataforma completa"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```
3. Acesse [Vercel Dashboard](https://vercel.com/dashboard).
4. Clique em **"Add New..."** > **"Project"**.
5. Importe o repositório do GitHub recém-criado.
6. A Vercel detectará automaticamente o framework **Vite**. Basta clicar em **Deploy**! 🚀

---

## 📄 Licença

Distribuído sob a licença MIT.
