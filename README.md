# Clean Architecture Frontend Example

Este é um exemplo de projeto frontend utilizando Clean Architecture. A Clean Architecture é um padrão de arquitetura de software que visa criar sistemas escaláveis, testáveis e sustentáveis, promovendo a separação de responsabilidades e a manutenção do código de forma mais fácil.

## Estrutura do Projeto

O projeto é estruturado de acordo com os princípios da Clean Architecture, dividindo as responsabilidades em camadas bem definidas.

### `src` (Source Code)

- **`components`**: Componentes React reutilizáveis.
- **`domain`**: Lógica de negócios e regras de domínio.
  - **`models`**: Definições de tipos e modelos.
  - **`services`**: Serviços de domínio (por exemplo, serviços de autenticação, serviços de usuário).
- **`pages`**: Páginas React correspondentes às rotas da aplicação.
- **`presentation`**: Código relacionado à apresentação da interface do usuário.
  - **`styles`**: Estilos globais e utilitários relacionados a estilos.
- **`utils`**: Utilitários gerais e funções auxiliares.

## Clean Architecture no Frontend

A Clean Architecture no frontend traz benefícios como:

1. **Separação de Responsabilidades**: As responsabilidades são distribuídas em camadas (entidades, casos de uso, interface do usuário), facilitando a compreensão e manutenção do código.

2. **Testabilidade**: A lógica de negócios é mantida em camadas independentes, o que facilita a escrita de testes unitários e a realização de testes automatizados.

3. **Manutenção Facilitada**: A estrutura permite a evolução do sistema sem alterar drasticamente o código existente, o que é especialmente útil em projetos de longo prazo.

4. **Reusabilidade de Código**: Componentes e lógica de negócios podem ser facilmente reutilizados em diferentes partes da aplicação.

5. **Facilidade de Troca de Tecnologia**: A mudança na biblioteca/framework de UI não afeta diretamente a lógica de negócios, proporcionando maior flexibilidade.

## Como Executar o Projeto

1. **Instale as Dependências**:

   ```bash
   npm install
   ```

2. **Execute o Projeto em Modo de Desenvolvimento**:

   ```bash
   npm run dev
   ```

   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).
