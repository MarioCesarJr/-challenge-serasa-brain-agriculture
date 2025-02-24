# Como Rodar a Aplicação e os Testes

## Pré-requisitos
Antes de rodar a aplicação e os testes, você precisa ter as seguintes ferramentas instaladas em sua máquina:
- Node 18 ou superior
- IDE (opcional)
- [Postgres database](https://www.postgresql.org/download/)

## Executar migração prisma
```bash
npx prisma migrate dev --name init
````

 ## Executar testes de unidade
 ```bash
 npm run test:watch 
 ````

  ## Executar testes e2e
 ```bash
 npm run test:vitest:e2e 
 ````

## Como rodar o app com docker:

## Executar o docker compose
 ### Iniciar o app com o banco postgres e rodar as migrações do prisma

 ```bash
docker compose up -d --build && npx prisma migrate dev --name init
 ```

 ### Parar e remover os containers:
 ```bash
 docker compose down  
 ````
 ## Endpoints:
 ## Cadastro de produtores rurais
 ```bash
 curl -X 'POST' \
  'http://localhost:3000/producers' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
        "cpfCnpj": "12345678000138",
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
##  Edição de produtor rural
```bash
curl -X 'PUT' \
  'http://localhost:3000/producers/c4daf5d1-87b3-47ce-adce-f3c4fe8634b2' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
        "cpfCnpj": "12345678000108",
        "name": "Produtor Exemplo"
}'
````
## Exclusão de produtor rural
```bash
curl -X DELETE http://localhost:3000/producers/7ae56b17-b5ee-45d7-9457-f94375723361
```` 

## Dasboard
```bash
curl http://localhost:3000/dashboard
```

## swagger URL
```bash
http://localhost:3000/docs
````