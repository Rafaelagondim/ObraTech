# ObraTech

Sistema para auxiliar no planejamento, orçamento e gerenciamento de custos de obras de construção civil.

## Objetivo

O ObraTech está sendo desenvolvido com o objetivo de facilitar o planejamento e a elaboração de orçamentos de obras, reunindo informações sobre ambientes, materiais de construção, preços e localização.

A proposta é transformar essas informações em uma ferramenta que auxilie na estimativa de custos e na tomada de decisões durante o planejamento de uma obra.

## Status do projeto

Em desenvolvimento.

### Funcionalidades planejadas

- [x] Estrutura inicial do banco de dados
- [x] Cadastro de usuários
- [x] Cadastro de obras
- [x] Relacionamento entre usuários e obras
- [ ] Cadastro de ambientes e dimensões
- [ ] Cadastro de materiais de construção
- [ ] Cadastro de preços por localização
- [ ] Histórico de preços de materiais
- [ ] Composição de orçamentos
- [ ] Estimativa de custos
- [ ] Dashboard de custos e evolução de preços

## Tecnologias

Atualmente, o projeto está sendo desenvolvido utilizando:

- PostgreSQL
- SQL
- Git
- GitHub

Outras tecnologias serão adicionadas conforme o desenvolvimento da aplicação avançar.

##  Estrutura inicial do banco de dados

Atualmente, o banco de dados possui as seguintes entidades:

### usuarios 

Armazena os usuários que utilizarão o sistema.

### obras

Armazena as obras cadastradas e suas principais informações, como:

- nome;
- descrição;
- cidade;
- estado;
- área construída;
- data de início;
- usuário responsável.

As tabelas usuarios e obras possuem um relacionamento por meio de uma chave estrangeira.

## Estrutura do projeto

text
ObraTech
database
 001_criar_usuarios.sql
 s002_criar_obras.sql
 .gitignore
README.md