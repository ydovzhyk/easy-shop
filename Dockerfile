# Використовуємо node:14 як базовий образ
FROM node

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо весь код з репозиторію до директорії /app
COPY . .

# Встановлюэмо модулі
RUN npm install

# Використовуємо порт 3000
EXPOSE 3000:3000

# Команда для запуску проекту
CMD ["npm", "start"]


# comand for terminal:
# docker build -t frontend-kapusta-local .
# docker images
# docker run -d -p 3000:3000 a26223b57f4c //start container running at port 3000 in browser
# docker ps // show all container
# docker stop id // id - container