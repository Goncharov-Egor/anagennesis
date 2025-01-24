# Local Setup

![Local Setup](https://twenty.com/images/local-setup.png)

## В этой статье

- [Предварительные требования](#предварительные-требования)
- [Шаг 1: Клонирование репозитория](#шаг-1-клонирование-репозитория)
- [Шаг 2: Переход в корневую директорию](#шаг-2-переход-в-корневую-директорию)
- [Шаг 3: Настройка базы данных PostgreSQL](#шаг-3-настройка-базы-данных-postgresql)
- [Шаг 4: Настройка базы данных Redis (кэш)](#шаг-4-настройка-базы-данных-redis-кэш)
- [Шаг 5: Настройка переменных окружения](#шаг-5-настройка-переменных-окружения)
- [Шаг 6: Установка зависимостей](#шаг-6-установка-зависимостей)
- [Шаг 7: Запуск проекта](#шаг-7-запуск-проекта)
- [Шаг 8: Использование Twenty](#шаг-8-использование-twenty)
- [Устранение неполадок](#устранение-неполадок)
- [Заметили что-то, что нужно изменить?](#заметили-что-то-что-нужно-изменить)

## Предварительные требования

**Linux и MacOS**

**Windows (WSL)**

Перед установкой и использованием Twenty убедитесь, что на вашем компьютере установлены следующие компоненты:

- [Git](https://git-scm.com/)
- [Node v18](https://nodejs.org/)
- [Yarn v4](https://yarnpkg.com/)
- [nvm](https://github.com/nvm-sh/nvm)

`npm` не подойдет, следует использовать `yarn`. Yarn теперь поставляется с Node.js, поэтому устанавливать его отдельно не нужно. Достаточно выполнить `corepack enable`, чтобы активировать Yarn, если вы еще этого не сделали.

---

## Шаг 1: Клонирование репозитория

В терминале выполните следующую команду.

**SSH (рекомендуется)**

```bash
git clone [email protected]:twentyhq/twenty.git
```

**HTTPS**

Если вы еще не настроили SSH-ключи, вы можете узнать, как это сделать, [здесь](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).

```bash
git clone https://github.com/twentyhq/twenty.git
```

## Шаг 2: Переход в корневую директорию

```bash
cd twenty
```

Все команды в следующих шагах следует выполнять из корневой директории проекта.

## Шаг 3: Настройка базы данных PostgreSQL

**Linux**

**Mac OS**

**Windows (WSL)**

**Вариант 1 (предпочтительный):** Для локальной настройки базы данных используйте следующую ссылку для установки PostgreSQL на вашу Linux-машину: [Установка Postgresql](https://www.postgresql.org/download/)

```bash
psql postgres -c "CREATE DATABASE \"default\";" -c "CREATE DATABASE test;"
```

Примечание: Возможно, вам потребуется добавить `sudo -u postgres` перед `psql`, чтобы избежать ошибок с правами доступа.

**Вариант 2:** Если у вас установлен Docker:

```bash
make postgres-on-docker
```

Теперь вы можете получить доступ к базе данных по адресу `localhost:5432` с пользователем `postgres` и паролем `postgres`.

## Шаг 4: Настройка базы данных Redis (кэш)

Twenty требует Redis для обеспечения наилучшей производительности.

**Linux**

**Mac OS**

**Windows (WSL)**

**Вариант 1:** Для локальной настройки Redis используйте следующую ссылку для установки Redis на вашу Linux-машину: [Установка Redis](https://redis.io/download)

**Вариант 2:** Если у вас установлен Docker:

```bash
make redis-on-docker
```

Если вам нужен графический интерфейс клиента, мы рекомендуем [Redis Insight](https://redis.com/redis-enterprise/redis-insight/) (доступна бесплатная версия).

## Шаг 5: Настройка переменных окружения

Используйте переменные окружения или файлы `.env` для настройки вашего проекта. [Подробнее здесь](https://twenty.com/developers/section/self-hosting/setup)

Скопируйте файлы `.env.example` в `/front` и `/server`:

```bash
cp ./packages/twenty-front/.env.example ./packages/twenty-front/.env
cp ./packages/twenty-server/.env.example ./packages/twenty-server/.env
```

## Шаг 6: Установка зависимостей

Для сборки сервера Twenty и добавления некоторых данных в вашу базу данных выполните следующую команду:

```bash
yarn
```

Обратите внимание, что `npm` или `pnpm` не подойдут.

## Шаг 7: Запуск проекта

**Linux**

**Mac OS**

**Windows (WSL)**

В зависимости от вашей дистрибуции Linux сервер Redis может запускаться автоматически. Если нет, ознакомьтесь с [руководством по установке Redis](https://redis.io/download) для вашей системы.

Настройте вашу базу данных следующей командой:

```bash
npx nx database:reset twenty-server
```

Запустите сервер, worker и frontend сервисы:

```bash
npx nx start twenty-server
npx nx worker twenty-server
npx nx start twenty-front
```

Или вы можете запустить все сервисы сразу:

```bash
npx nx start
```

## Шаг 8: Использование Twenty

**Frontend**

Frontend Twenty будет доступен по адресу [http://localhost:3001](http://localhost:3001).  
Вы можете войти, используя демо-аккаунт: `tim@apple.dev` (пароль: `Applecar2025`)

**Backend**

- Сервер Twenty будет работать по адресу [http://localhost:3000](http://localhost:3000)
- GraphQL API доступен по адресу [http://localhost:3000/graphql](http://localhost:3000/graphql)
- REST API доступен по адресу [http://localhost:3000/rest](http://localhost:3000/rest)

## Устранение неполадок

Если вы столкнулись с проблемами, ознакомьтесь с разделом [Troubleshooting](https://twenty.com/developers/section/self-hosting/troubleshooting) для поиска решений.

## Заметили что-то, что нужно изменить?

Как компания с открытым исходным кодом, мы приветствуем вклад через GitHub.

# Что прописывать на моем компьютере (by Gubernator)?
```bash
nvm use 18 && corepack enable
yarn
npx nx database:reset twenty-server
npx nx start
```
