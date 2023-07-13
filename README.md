# UnB-Reviews
Este repositório tem como objetivo documentar o desenvolvimento do Projeto Final da disciplina de Bancos de Dados da Universidade de Brasília, ministrada pelo professor Pedro Garcia.

As instruções e especificações do trabalho estão descritas no arquivo `Especificações.pdf`

## Pré-requisitos
É necessário possuir os seguintes softwares instalados previamente na máquina antes de rodar a aplicação:
- `node.js` na versão 18.0.0 ou mais recente (versões anteriores podem não suportar o Next.js 13)
- `npm` na versão 9.0.0 ou mais recente
- `mysql-server` na versão 8.0.0 ou mais recente

## Criando o banco de dados
No seu terminal, siga os seguintes passos:
- Inicie o servidor mysql como root pelo comando `mysql -u root -p`
- Insira sua senha de administrador caso solicitado
- Crie o banco de dados utilizando o comando `source PATH`, substituindo `PATH` pelo caminho absoluto na sua máquina para o arquivo `/src/lib/mysql/createSchema.sql`
- Isso deverá criar o schema 'UnB Reviews' no seu SGBD, incluindo todas as tabelas que usaremos na aplicação, juntamente com a VIEW 'Denuncias_Aprimoradas', gerada pela PROCEDURE 'CreateDenunciasView'
- Este processo também já insere no banco 3 registros para cada uma das tabelas
- Encerre o terminal do mysql server com o comando `quit`

## Iniciando a aplicação
- No diretório raiz deste repositório, execute em seu terminal o comando `npm install`
- Rode o comando `npm run dev` para que o Next.js prepare a aplicação. Assim que a mensagem `event compiled client and server successfully` aparecer no terminal, significa que está tudo certo. Mantenha este processo rodando enquanto estiver utilizando a aplicação.
- Em qualquer browser, acesse `https://localhost:3000` e deverá ver a home page da UnB Reviews