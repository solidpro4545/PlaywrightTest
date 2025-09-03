FROM mcr.microsoft.com/playwright:v1.55.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN mkdir -p /app/playwright-report
VOLUME ["/app/playwright-report"]

CMD ["npx", "playwright", "test"]
