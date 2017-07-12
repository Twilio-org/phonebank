.PHONY: install build lint run

install:
	npm install

lint:
	npm run lint

build:
	docker build -t phonebank .

run:
	docker run -i -p 3000:3000 -t phonebank:latest
