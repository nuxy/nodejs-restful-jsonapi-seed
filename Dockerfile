FROM node

ARG NODE_ENV=development
ENV env $NODE_ENV

WORKDIR /app

COPY *.json ./

RUN npm install --no-optional --no-package-lock --no-shrinkwrap >/dev/null 2>/dev/null
RUN npm install pm2 >/dev/null 2>/dev/null

RUN mkdir -p config .

COPY config/default.json config
COPY config/${env}.json config

ADD src src

RUN groupadd -r app && useradd -r -g app -m app

USER app

EXPOSE 3000

CMD ["npm", "run", "deploy"]
