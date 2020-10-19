PROJECT				= nvenergy-backend-app

NAME   				= energyweb/${PROJECT}
LATEST 				= ${NAME}:latest
PACKAGE				= nvenergy-origin-backend.tgz

build:
	@rm -rf ./deployment
	@mkdir ./deployment
	@rush deploy -p @energyweb/nvenergy-backend-app -t ./deployment --overwrite
	@cp -r ../../config/migrations/ ./deployment/config
	@docker build -t ${NAME} -f Dockerfile ./deployment
	@rm -rf ./deployment
	@docker tag ${NAME} ${LATEST}

deploy-heroku:
ifdef HEROKU_API_KEY
	@docker tag ${LATEST} registry.heroku.com/${HEROKU_STABLE_APP_API}/web
	@docker login -u _ -p $(shell echo '$$HEROKU_API_KEY') registry.heroku.com
	@docker push registry.heroku.com/${HEROKU_STABLE_APP_API}/web
	@heroku container:release web -a ${HEROKU_STABLE_APP_API}
endif