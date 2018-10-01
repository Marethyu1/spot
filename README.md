# Spot
![spot](https://github.com/Marethyu1/spot/blob/master/images/logo.png)  
  
  
  Spot is a mobile application designed to create a new and exciting way for dog enthusiasts to collect and share dogs while enjoying the great outdoors. Dog owners are encouraged to go out and explore their towns and cities searching for different dogs to add to their collection. Dog owners can collect different breeds of dogs by taking photos of the dogs that they have found. They can then upload these photos and create a map detailing the different places they have explored and the dogs they have found.


# Architecture
Spot is split into two key components: A Mobile App (./spot-mobile-app) and a Back End Server (./server)


# Running the Server
The server has the following dependencies
- docker
- nodejs

It can be run with the following commands
- Nagivate into the server directory with ```cd ./server```
- Install the node dependencies with ```npm install```
- Start a mysql docker container with ```npm run start-docker```
- Once the docker container is running create the development db with ```npm run create:dev-db```
- Start up the server with ```npm run start```


# Running the Mobile App
The server has the following dependencies
- nodejs

It can be run with the following commands
- Nagivate into the server directory with ```cd ./spot-mobil-app```
- Install the node dependencies with ```npm install```
- Start the app with ```npm run start``` This will spin up app using [expo](https://expo.io/)
- If you have an ios emulator installed you can press i to start the emulator
