#!/bin/bash

name="streamstory1"
path="docker/docker-compose.yml"

source docker/env/nissa.sh

if [ $1 == "build" ]; then
    docker-compose -f $path -p $name build
elif [ $1 == "start" ]; then
    docker-compose -f $path -p $name up -d
elif [ $1 == "log" ]; then
    docker-compose -f $path -p $name logs -f
elif [ $1 == "stop" ]; then
    docker-compose -f $path -p $name down --remove-orphans -v
fi
