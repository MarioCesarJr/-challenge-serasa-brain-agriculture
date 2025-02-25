# Como executar a Aplicação e os Testes

## Pré-requisitos
Antes de rodar a aplicação e os testes, você precisa ter as seguintes ferramentas instaladas em sua máquina:
- **Node** versão 22 ou superior: [Baixe aqui](https://nodejs.org/)
- **IDE** (opcional)
- **PostgreSQL**: [Baixe e instale aqui](https://www.postgresql.org/download/)

## Executando a Aplicação
## 1. Instalar Dependências
Primeiro, instale as dependências do projeto:
```bash
npm install
````

## 2. Executar a migração do prisma
Se você ainda não tiver rodado a migração do banco de dados, use o comando abaixo para aplicar as migrações do Prisma:
```bash
npx prisma migrate dev --name init
````
## 3. Renomear o Arquivo ```.env.example```
Antes de rodar a aplicação, você deve renomear um arquivo na raiz do projeto chamado ```.env.example```. Renomeie-o para ```.env```:
```bash
mv .env.example .env
```` 
## 4. Rodar a Aplicação Localmente
Para rodar a aplicação localmente, execute o seguinte comando:
```bash
npm run start:dev
````
## Executando os Testes
## 1. Testes de unidade
Para rodar os testes de unidade e manter o ambiente de testes em execução, use:
 ```bash
 npm run test:watch 
 ````
## 2. Testes End-to-End (E2E)
Para rodar os testes end-to-end (E2E):
 ```bash
 npm run test:vitest:e2e 
 ````

## Como rodar o app com docker:
Caso queira rodar a aplicação utilizando Docker, siga os passos abaixo.
## 1. Construir e Rodar o Docker Compose
Para iniciar a aplicação com o banco PostgreSQL e rodar as migrações do Prisma, execute o seguinte comando:
 ```bash
docker compose up -d --build && npx prisma migrate dev --name init
 ```
 Este comando irá:
 - Construir as imagens do Docker
 - Iniciar os containers
 - Executar as migrações do Prisma

 ## 2. Parar e Remover os Containers
 ```bash
 docker compose down  
 ````
 ## Endpoints:
 Aqui estão alguns exemplos de como interagir com a API da aplicação usando curl.
 ## 1. Cadastro de produtores rurais
 Para cadastrar um novo produtor rural, faça um **POST** para o endpoint ```/producers```:
 ```bash
 curl -X 'POST' \
  'http://localhost:3000/producers' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
        "cpfCnpj": "40779487000177",
        "name": "Produtor Exemplo",
        "properties": [
                {
                        "farmName": "Fazenda Ouro Preto",
                        "city": "Goiânia",
                        "state": "Goiás",
                        "totalArea": 1000,
                        "arableArea": 800,
                        "vegetationArea": 200,
                        "crops": [
                                        {
                                                "cropName": "Soja",
                                                "harvestYear": 2025
                                        },
                                        {
                                                "cropName": "Café",
                                                "harvestYear": 2025
                                        }
                        ]
                }

        ]
}'
 ````
## 2. Edição de produtor rural
Para editar um produtor rural existente, faça um **PUT** para o endpoint ```/producers/{id}```, substituindo ```{id}``` pelo ID do produtor:
```bash
curl -X 'PUT' \
  'http://localhost:3000/producers/c4daf5d1-87b3-47ce-adce-f3c4fe8634b2' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
        "cpfCnpj": "69362912000100",
        "name": "Produtor Exemplo"
}'
````
## 3. Exclusão de produtor rural
Para excluir um produtor rural, faça um **DELETE** para o endpoint ```/producers/{id}```, substituindo ```{id}``` pelo ID do produtor:
```bash
curl -X DELETE http://localhost:3000/producers/7ae56b17-b5ee-45d7-9457-f94375723361
```` 

## 4. Dashboard
Para acessar o dashboard da aplicação, basta fazer uma requisição **GET** para o endpoint ```/dashboard```:
```bash
curl http://localhost:3000/dashboard
```

## Swagger
A documentação interativa da API está disponível via Swagger. Acesse a URL abaixo:
```bash
http://localhost:3000/docs
````