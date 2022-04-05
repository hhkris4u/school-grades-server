include .env

default: build

DOCKER='docker'
DOCKER_COMPOSE='docker-compose'

dc-build:
	rm -rf build
	$(DOCKER_COMPOSE) build app

# ---------- Development ----------
start: dc-build
		$(DOCKER_COMPOSE) run -e NODE_ENV=development --service-ports --entrypoint=npm app run start



start-nodemon: dc-build	
	$(DOCKER_COMPOSE) run -e NODE_ENV=development --service-ports --entrypoint=npm app run dev




