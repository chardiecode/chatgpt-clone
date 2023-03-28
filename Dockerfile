FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]