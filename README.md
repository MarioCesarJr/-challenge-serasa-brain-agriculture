# Como rodar o app:

## Executar o docker compose
 ### Iniciar o app com o banco postgres e rodar as migrações do prisma

 ```bash
docker compose up -d --build && npx prisma migrate dev --name init
 ```

 ### Parar e remover os containers:
 ```bash
 docker compose down  
 ````