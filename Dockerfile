# Use the official Bun image
FROM oven/bun:latest

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# Generate Prisma client (NO migrations at build time)
RUN bunx prisma generate --schema ./src/libs/prisma/schema.prisma

# Start app — migrate at runtime
CMD ["sh", "-c", "bunx prisma migrate deploy --schema ./src/libs/prisma/schema.prisma && bun src/index.ts"]
