# Base image: node:lts-alpine
FROM node:lts-alpine@sha256:425c81a04546a543da824e67c91d4a603af16fbc3d875ee2f276acf8ec2b1577 AS base
LABEL maintainer="William de Souza Freire"
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app

# Build Environment Development DevDependencies
FROM base AS develop
WORKDIR /home/node/app
USER node
COPY --chown=node:node . ./
COPY --chown=node:node package.json yarn.* tsconfig.json ./
RUN yarn install --production=false --frozen-lockfile
CMD ["sh", "scripts/server-develop.sh"]

# Build Environment Production Dependencies
FROM base AS production
WORKDIR /home/node/app
USER node
COPY --chown=node:node package.json yarn.* ./
RUN yarn install --production=true --frozen-lockfile

# Build
FROM base AS build
WORKDIR /home/node/app
USER node
COPY --chown=node:node . ./
COPY --chown=node:node --from=develop /home/node/app/ .
RUN yarn build

# Runtime
FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /home/node/app
USER node
COPY --chown=node:node --from=production /home/node/app/node_modules /home/node/app/node_modules/
COPY --chown=node:node --from=build /home/node/app/package.json /home/node/app/package.json
COPY --chown=node:node --from=build /home/node/app/scripts /home/node/app/scripts/
COPY --chown=node:node --from=build /home/node/app/dist /home/node/app/dist/
CMD ["sh", "scripts/server.sh"]
