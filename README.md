# Traveling Like a Root

Projeto desenvolvido como teste técnico para a empresa Root Code.


- Front-end: https://traveling-like-a-root.vercel.app/
- API Laravel: https://travelinglikearoot.alwaysdata.net/api/v1/quotes


## Requirementos

- Docker
- Node.js version: v24.16.0
- PHP version: 8.5

---

## Esrtrutura do projeto

A configuração está localizada em:  `/docker`

```
/docker
  ├── docker-compose.yml
  ├── Dockerfile.Laravel
  └── .env.example
```

---

## Instruções de como executar

### 1. Configure as variáveis de ambiente
### Edite os valores se necessário.

- #### Dentro da pasta `docker`, copie o arquivo:

```bash
cp docker/.env.example docker/.env
```

- #### Na pasta `laravel`, copie rquivo:

```bash
cp laravel/.env.example laravel/.env
```

- #### Na pasta `next`, copie rquivo:

```bash
cp next/.example.env next/.env
```

---

### 3. inicie os containers

Dá raiz do projeto:

```bash
docker compose -f docker/docker-compose.yml up --build
```

Ou em detached mode:

```bash
docker compose -f docker/docker-compose.yml up -d --build
```

---

### 4. Gere as migrations e seeders do Laravel

Dá raiz do projeto:

```bash
cd docker && docker-compose exec laravel php artisan migrate --seed
```

### 6. Inicie o Next

Dá raiz do projeto:

```bash
cd next && npm run dev
```



---

## Notas

- Tenha certeza de que o `.env` está própriamente configurado
