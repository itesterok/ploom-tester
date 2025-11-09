FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx playwright install --with-deps chromium firefox

ENV CI=true

CMD ["npm", "test"]
