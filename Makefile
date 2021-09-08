setup:
	docker build -t newsapp .

start:
	docker run --rm -it -p 3000:3000 newsapp