# Projeto Backend com Express

Este projeto é uma API backend desenvolvida com Express, configurada para autenticação básica e integração com um sistema de front-end. Inclui validação de requisições, controle de logs, limitação de requisições, e organização modular de rotas.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para criação de APIs
- **TypeScript** - Superset do JavaScript com tipagem opcional
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Helmet** - Middleware para segurança HTTP
- **Rate-Limit** - Controle de taxa de requisições para prevenção de abusos
- **Axios** - Cliente HTTP para requisições a APIs externas

## Requisitos

- Node.js
- NPM

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/eduardoibarr/api-movies.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd api-movies
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn
   ```

## Configuração de Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para configurar a API. Crie um arquivo \`.env\` na raiz do projeto e defina as seguintes variáveis:

```plaintext
NODE_ENV=development
PORT=3000
MOVIES_API_TOKEN=your_token
MOVIES_API_URL=your_url
BASIC_AUTH_USERNAME=your_username
BASIC_AUTH_PASSWORD=your_password
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

- \`npm run dev\` - Executa o servidor em modo de desenvolvimento com nodemon.
- \`npm run build\` - Compila o projeto TypeScript para JavaScript na pasta \`dist\`.
- \`npm start\` - Executa o projeto compilado em produção.

## Principais Rotas da API

- **/movies**: Rotas para operações com filmes.
- **/series**: Rotas para operações com séries.
- **/genres**: Rotas para operações com gêneros.
- **/discover**: Rotas para busca personalizada de filmes e séries.

## Segurança

O projeto utiliza o **Helmet** para adicionar cabeçalhos de segurança HTTP e o **rate-limit** para limitar o número de requisições por IP, ajudando a prevenir ataques de força bruta.

## Contato

Para dúvidas ou sugestões, entre em contato com [comigo](mailto:eduardoibarr56@gmail.com).

---
