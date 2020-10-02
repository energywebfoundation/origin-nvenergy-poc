PROJECT				= ptt-origin-backend-app

NAME   				= energyweb/${PROJECT}
LATEST 				= ${NAME}:latest
PACKAGE				= ptt-origin-backend.tgz

build:
	@yarn pack -f ${PACKAGE}
	@cp -r ../../config/migrations/ config
	@docker build -t ${NAME} --build-arg PACKAGE=${PACKAGE} .
	@rm ${PACKAGE}
	@rm -rf config
	@docker tag ${NAME} ${LATEST}

deploy-heroku:
ifdef HEROKU_API_KEY
	@docker tag ${LATEST} registry.heroku.com/${HEROKU_STABLE_APP_API}/web
	@docker login -u _ -p $(shell echo '$$HEROKU_API_KEY') registry.heroku.com
	@docker push registry.heroku.com/${HEROKU_STABLE_APP_API}/web
	@heroku container:release web -a ${HEROKU_STABLE_APP_API}
endif