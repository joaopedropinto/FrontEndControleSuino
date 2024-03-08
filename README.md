## Pururuca System

O objetivo deste projeto é implementar um sistema de gerenciamento e controle para criação de suínos, fornecendo todo o CRUD para cadastro de suínos, assim como o CRUD e dashboard das pesagens de cada suíno.

### Rotas do Projeto

- `/`: Página inicial.
- `/login`: Tela para login e cadastro de usuários, as outras rotas da aplicação só funcionam se o usuário estiver logado.
- `/cadastro-suino`: Cadastra um novo suíno, redirecionando para a tela de listagem de suínos.
- `/listagem-suino`: Lista todos os suínos e, para cada suíno, existem as opções de editar os dados, excluir, ver os detalhes e cadastrar as pesagens.
- `/edita/:id`: Tela para edição de dados de um suíno específico, que é identificado pela id que chega por parâmetro na URL.
- `/cadastro-peso/:id`: Tela para cadastros de pesagens de um suíno específico, que é identificado pela id que chega por parâmetro na URL.
- `/listagem-pesos/:id`: Tela para listar as pesagens e exibir em um gráfico os dados de pesagens de um suíno específico, que é identificado pela id que chega por parâmetro na URL.
- `/edita-pesagem/:id/:pesagemId`: Tela para edição de uma pesagem específica de um suíno específico, ambos, o id da pesagem e o id do suíno são identificados pelas ids que chegam por parâmetro na URL.

### Autores

| [<img src="https://avatars.githubusercontent.com/u/86726800?v=4" width=115><br><sub>Eduardo Matheus </sub>](https://github.com/EduardoMatheus96) | [<img src="https://avatars.githubusercontent.com/u/32523778?v=4" width=115><br><sub>João Pedro</sub>](https://github.com/joaopedropinto) | [<img src="https://avatars.githubusercontent.com/u/76014751?v=4" width=115><br><sub>Kayque Piton</sub>](https://github.com/kayquepiton) | [<img src="https://avatars.githubusercontent.com/u/82590761?v=4" width=115><br><sub>Felipe Gregue</sub>](https://github.com/FelipeGregue) | [<img src="https://avatars.githubusercontent.com/u/32984720?v=4" width=115><br><sub>Valber Francisco dos Santos</sub>](https://github.com/ValberF) |
| :----------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |
