
all: clean

clean: 
	find . -name 'books' -type f -exec rm -f {} \; 
	go clean

go-get:
	rm -rf src/github.com
	rm -rf src/gopkg.in
	go get -v github.com/codegangsta/negroni
	go get -v github.com/streadway/amqp
	go get -v github.com/gorilla/mux
	go get -v github.com/unrolled/render
	go get -v github.com/satori/go.uuid
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson

run:
	go run src/app/$(app).go

main:
	go run src/app/main.go

format:
	go fmt books

install:
	go install books

build:
	go build books

start:
	./books 

test-ping:
	curl localhost:3000/ping

test-books:
	curl localhost:3000/books

docker-build: 
	docker build -t books .
	docker images

docker-network:
	docker network ls

docker-network-inspect:
	docker network inspect host

docker-shell:
	docker exec -it books bash 

docker-clean:
	docker stop books
	docker rm books
	docker rmi books

docker-ip:
	docker-machine ip

docker-ps:
	 docker ps --all --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t"

docker-ps-ports:
	 docker ps --all --format "table {{.Names}}\t{{.Ports}}\t"

