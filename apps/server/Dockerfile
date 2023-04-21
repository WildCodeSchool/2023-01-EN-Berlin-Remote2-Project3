FROM node:18-alpine

# Set the NODE_ENV variable inside the container to "production"
ENV NODE_ENV=production

# Install pnpm inside the container
RUN npm install -g pnpm

# To copy the files to the absolute path "/app" inside the container and install
# the dependencies there
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile --prod
RUN pnpm run build; exit 0

EXPOSE 8000

CMD ["pnpm", "start"]
