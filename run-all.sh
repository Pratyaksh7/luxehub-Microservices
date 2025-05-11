#!/bin/bash

# Navigate and run each service in the background
(cd api-gateway && echo "Starting API Gateway..." && pnpm run start:dev) &
(cd auth.service && echo "Starting Auth Service..." && pnpm run start:dev) &
(cd cart.service && echo "Starting Cart Service..." && pnpm run start:dev) &

# Wait for all background processes to finish
wait