# Spot
![spot](https://github.com/Marethyu1/spot/blob/master/images/logo.png)
Spot is a mobile application designed to create a new and exciting way for dog enthusiasts to collect and share dogs while enjoying the great outdoors. Dog owners are encouraged to go out and explore their towns and cities searching for different dogs to add to their collection. Dog owners can collect different breeds of dogs by taking photos of the dogs that they have found. They can then upload these photos and create a map detailing the different places they have explored and the dogs they have found.


# Architecture
Spot is split into two key components: A Mobile App and a Back End Server. The original architectural plan is as follows:
![Architecture](https://github.com/Marethyu1/spot/blob/master/images/architecture.png)

The mobile application is built using React Native. The Google App Engine will host a Node.js server. This can handle REsTful requests from the mobile app. The server can then authenticate users through Firebase Authentication and save data (including photos) to Google Cloud SQL database. 
