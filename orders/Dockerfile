FROM node:21

COPY ./ /app
WORKDIR /app
RUN npm install
EXPOSE 3333
CMD ["node", "app.js"]