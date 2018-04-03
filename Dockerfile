FROM node:carbon

WORKDIR /opt/app

COPY package*.json ./

RUN npm install --no-optional --no-package-lock --no-shrinkwrap

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
