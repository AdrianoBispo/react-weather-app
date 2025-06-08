# 🌦️ React Weather App | Previsão do Tempo Inteligente
O **React Weather App** é uma aplicação web moderna e responsiva para monitoramento climático, construída com as mais recentes tecnologias do ecossistema React. A aplicação permite aos usuários obter previsões do tempo em tempo real, salvar cidades favoritas e receber sugestões inteligentes baseadas no clima, graças à integração com a API Gemini do Google.

## 📂 Estrutura do Projeto
O projeto segue uma arquitetura modular e escalável, com responsabilidades bem definidas:

```
src/
├── components/   # Componentes React reutilizáveis
├── hooks/        # Hooks customizados
├── lib/          # Utilitários e configurações
├── pages/        # Componentes de página (rotas)
├── services/     # Módulos para comunicação com APIs
├── styles/       # Estilos globais
├── types/        # Definições de tipos do TypeScript
└── App.tsx       # Componente principal e roteador
```

## ✨ Funcionalidades Principais
- **Autenticação Completa:** Sistema de cadastro e login seguro com E-mail/Senha, além de autenticação com o Google via Firebase Authentication.
- **Previsão em Tempo Real:** Consumo da API OpenWeatherMap para exibir dados climáticos detalhados, incluindo temperatura, umidade, condições atmosféricas e velocidade do vento, com descrições em português.
- **Geolocalização Automática:** Detecção automática da localização do usuário via GPS para exibir o clima local na tela inicial.
- **Busca Global de Cidades:** Permite a busca por qualquer cidade do mundo para visualizar a previsão do tempo.
- **Favoritos e Histórico:** Sistema para salvar cidades favoritas e um histórico das últimas pesquisas, com dados persistidos no Firebase Firestore para sincronização entre dispositivos.
- **Previsão Detalhada:** Exibição da previsão do tempo por hora (próximas 24h) e por dia (próximos 5 dias).
- **Sugestões com IA:** Integração com a API Gemini para fornecer sugestões inteligentes sobre o que vestir e atividades para fazer com base nas condições climáticas atuais.
- **Performance e Cache:** Utilização de cache no Local Storage para armazenar dados recentes, permitindo uma experiência de uso fluida mesmo com conexões instáveis.
- **Proteção de Rotas:** Rotas privadas que garantem que apenas usuários autenticados possam acessar o dashboard principal.

## 🛠️ Tecnologias Utilizadas
- **Frontend:**
  - React (com Vite)
  - TypeScript
  - Tailwind CSS
  - React Router DOM
- **UI e Animação:**
  - Shadcn/UI
  - Framer Motion
- **Backend e API:**
  - Firebase (Authentication e Firestore)
  - OpenWeatherMap API
  - Google Gemini API
- **Validação de Formulários:**
  - React Hook Form
  - Zod

##  Como Executar o Projeto
Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Git
- Contas no Firebase, OpenWeatherMap e Google AI para obter as chaves de API.

### 1. Clone o Repositório
```
git clone https://github.com/AdrianoBispo/react-weather-app.git
```

### 2. Acesse o Repositório
```
cd react-weather-app
```

### 3. Instale as Dependências
```
npm install
```

### 4. Configure as Variáveis de Ambiente
Crie um arquivo chamado ``.env`` na raiz do projeto e adicione suas chaves de API, seguindo o modelo do arquivo ``.env.example`` (ou o bloco de código abaixo).
```
# Firebase Configuration
VITE_FIREBASE_API_KEY="SUA_API_KEY_DO_FIREBASE"
VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN_DO_FIREBASE"
VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID_DO_FIREBASE"
VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET_DO_FIREBASE"
VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID_DO_FIREBASE"
VITE_FIREBASE_APP_ID="SEU_APP_ID_DO_FIREBASE"

# OpenWeatherMap API Key
VITE_OPENWEATHER_API_KEY="SUA_CHAVE_DA_API_OPENWEATHERMAP"

# Gemini API Key
VITE_GEMINI_API_KEY="SUA_CHAVE_DA_API_GEMINI"
```

### 5. Rode a Aplicação
```
npm run dev
```

A aplicação, por padrão, estará disponível em _http://localhost:5173_.

## 📜 Licença
Este projeto está licenciado sob a [Licença Creative Commons](LICENSE). Veja o arquivo LICENSE para mais detalhes.
