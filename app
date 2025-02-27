#!/bin/bash

# Define environment variables...
export WWWUSER=${WWWUSER:-$(id -u)}
export WWWGROUP=${WWWGROUP:-$(id -g)}
export APP_SERVICE=${APP_SERVICE:-"app"}

# Define Docker Compose command prefix...
if docker compose &> /dev/null; then
    DOCKER_COMPOSE=(docker compose)
else
    DOCKER_COMPOSE=(docker-compose)
fi

EXEC="yes"

if [ -z "$APP_SKIP_CHECKS" ]; then
    # Ensure that Docker is running...
    if ! docker info >/dev/null 2>&1; then
        echo "${BOLD}Docker is not running.${NC}" >&2

        exit 1
    fi

    # Determine if app is currently up...
    if "${DOCKER_COMPOSE[@]}" ps "$APP_SERVICE" 2>&1 | grep 'Exit\|exited'; then
        echo "${BOLD}Shutting down old app processes...${NC}" >&2

        "${DOCKER_COMPOSE[@]}" down >/dev/null 2>&1

        EXEC="no"
    elif [ -z "$("${DOCKER_COMPOSE[@]}" ps -q)" ]; then
        EXEC="no"
    fi
fi

ARGS=()

if [ "$EXEC" == "yes" ]; then
    ARGS+=(exec -u $WWWUSER)
    [ ! -t 0 ] && ARGS+=(-T)
    ARGS+=("$APP_SERVICE" "$@")
else
    docker_is_not_running
fi

# Run Docker Compose with the defined arguments...
"${DOCKER_COMPOSE[@]}" "${ARGS[@]}"
