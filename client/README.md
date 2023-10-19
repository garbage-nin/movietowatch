# Movietowatch

Project was created using MEAN stack (Mongodb, ExpressJs, Angularm Node
A simple movie to watch app. Following features
- Add your favorite movie to mongodb using nodejs/express js
- Edit your current movie (you can unpin/pin the movie)
- Upload/Get the image of your movie to the server
- Sort and filter your movie

## Deployment
Requirements:
- mongodb
- angular cli
- node
  
Frontend - angular
  1. Fork then clone the repo to your local development.
  2. On running the front end navigate to moviestowatch/ first install dependency using:
     ``` npm install ```
  3. Then execute on cli ``` ng serve ```

Backend & mongodb - Nodejs/expressjs/mongodb
  1. Install mongodb on your local https://www.mongodb.com/docs/manual/installation/
  2. Create a folder under moviestowatch/api named uploads ```mkdir uploads``` (this will hold your uploaded image)
  3. Navigate to moviestowatch/api, then run ```npm install``` for dependencies.
  4. Then execute on cli ```npm run start```
     - "npm run start" executes the cli "mongoimport" which import the data from moviestowatch/data, you can delete this to just start without the testdata
     - if you want to backup your mongodb data you can run ```npm run export-db```, so the next time you run the backend it will use your backupdata
  

## License
This project is licensed under the MIT License.
