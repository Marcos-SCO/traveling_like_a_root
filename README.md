# Traveling Like a Root

Projeto desenvolvido como teste técnico para a empresa Root Code.


- Front-end: https://traveling-like-a-root.vercel.app/
- API Laravel: https://travelinglikearoot.alwaysdata.net/api/v1/quotes


## Tecnologias Utilizadas

### Backend
- PHP 8.5
- Laravel 13
- PHPUnit
- MySQL

### Frontend
- Next.js
- React
- TypeScript
- TailwindCSS

### Infraestrutura
- Docker
- Docker Compose

---

### Esrtrutura do projeto

A configuração está localizada em:  `/docker`

```
Estrutura do Projeto
/
├── docker/
│   ├── docker-compose.yml
│   ├── Dockerfile.Laravel
│   ├── Dockerfile.Next
│   └── .env.example
│
├── laravel/
│   ├── app/
│   ├── tests/
│   └── ...
│
├── next/
│   ├── src/
│   └── ...
│
└── postman/
    └── admissional_traveling_like_a_root.postman_collection.json
```

---

## Instruções de como executar

### 1. Configure as variáveis de ambiente
### Edite os valores se necessário.

- #### Dentro da pasta `docker`, copie o arquivo:

```bash
cp docker/.env.example docker/.env
```

- #### Na pasta `laravel`, copie arquivo:

```bash
cp laravel/.env.example laravel/.env
```

- #### Na pasta `next`, copie arquivo:

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

### 4. Migrations/seeders e composer no Laravel

Dá raiz do projeto:

```bash
docker-compose -f docker/docker-compose.yml exec laravel composer install
```

```bash
docker-compose -f docker/docker-compose.yml exec laravel php artisan migrate --seed
```

### 6. Instale as depedências com o npm e inicie o Next

Dá raiz do projeto:

```bash
(cd next && npm install && npm run dev)
```

### 7. Rode os testes

Dá raiz do projeto:

```bash
docker-compose -f docker/docker-compose.yml exec laravel php artisan test

```

---


## Collection do Postman

Para facilitar os testes da API, foi disponibilizada uma collection do Postman contendo os principais endpoints do projeto.

### Importando a collection

1. Abra o Postman.
2. Clique em **Import**.
3. Selecione o arquivo:

```text
postman/admissional_traveling_like_a_root.postman_collection.json
```

4. Após a importação, os endpoints estarão disponíveis para execução.

### Configuração da URL da API

Caso esteja executando o projeto localmente, configure a variável utilizada pela collection para apontar para sua instância da API.

Exemplo:

```text
http://localhost:8043/api/v1
```

### Exemplo de requisição

Endpoint:

```http
POST /quotes
```

Payload:

```json
{
  "travel_zone": "EUROPA",
  "start_date": "2026-07-10",
  "end_date": "2026-07-20",
  "travelers": [
    {
      "name": "Ana",
      "birth_date": "1990-03-15",
      "additionals": [
        "BAGAGEM",
        "ESPORTES_AVENTURA"
      ]
    }
  ]
}
```


---

## Decisões e Premissas

### Arquitetura da regra de negócio

A lógica de precificação foi isolada da camada HTTP seguindo o princípio de separação de responsabilidades. O controller é responsável apenas por validar a requisição, acionar o serviço de cálculo e retornar a resposta.

Toda a lógica de negócio foi centralizada em serviços dedicados, permitindo reutilização, testes unitários independentes e futuras extensões das regras de precificação.

### Uso de Enums

As zonas de viagem, adicionais e faixas de cálculo foram implementadas utilizando Enums para evitar uso de strings mágicas e garantir maior segurança durante o desenvolvimento.

### Estratégia de cálculo

A lógica de precificação foi implementada seguindo integralmente a ordem de cálculo especificada no desafio, incluindo regras de período mínimo, adicionais, desconto de grupo e arredondamento.

### Cálculo da idade

A idade do viajante é calculada utilizando a data de início da viagem, conforme especificado no enunciado, e não a data atual.

### Tratamento do adicional de esportes de aventura

Quando o adicional `ESPORTES_AVENTURA` é solicitado para um viajante fora da faixa etária permitida (18 a 64 anos), a cotação continua normalmente e um aviso é retornado ao usuário.

Essa decisão segue exatamente a regra descrita no desafio, que determina que a situação não deve ser tratada como erro de validação.

### Precisão monetária

Os cálculos intermediários mantêm sua precisão original durante todo o processamento.

O arredondamento para duas casas decimais é realizado apenas no valor final da cotação, conforme especificado no enunciado.

Os subtotais exibidos individualmente podem ser apresentados com duas casas decimais apenas para fins de visualização.

### Persistência das cotações

As cotações foram persistidas em banco de dados mesmo não sendo um requisito obrigatório. 

### Docker

Inicialmente, foi criada uma configuração Docker para Laravel e Next.js. Entretanto, para simplificar o ambiente e priorizar a estabilidade da entrega, optei por manter apenas a API containerizada, executando o frontend localmente via Node.js.


### Premissas adotadas

* Todos os valores monetários estão em BRL.
* Um viajante pode contratar simultaneamente BAGAGEM e ESPORTES_AVENTURA.
* Deve existir ao menos um viajante válido na cotação.
* As datas são recebidas no formato ISO-8601 (YYYY-MM-DD).