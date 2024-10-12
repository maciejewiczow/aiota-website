#! pwsh

docker run --rm -it --volume "$PWD`:/app" composer $args
