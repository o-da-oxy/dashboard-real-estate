# Fullstack Dashboard Real Estate

## Команды для запуска

В корне ./server:
1) docker-compose up
   - разворачивает бд PostgreSQL
   - запускает скрипт init-db.sql (закомментировано т.к лучше сделать миграцию sequelize)
2) npm install
3) sequelize db:migrate
4) npm run start

В корне ./client
1) npm install
2) npm run dev
