## <div align="center">📡 <br/> <p style="margin-top: 5">DevRadar</p> </div>

<p align="center">An application that finds nearby developers working with the technologies that the user search for 📡</p>

## 🛠️ Technologies

<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a></li>
  <li><a href="https://expressjs.com/">Express</a></li>
  <li><a href="https://reactjs.org/">React</a></li>
  <li><a href="https://reactnative.dev/">React Native</a></li>
  <li><a href="https://expo.io/">Expo</a></li>
  <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  <li><a href="https://mongoosejs.com/">Mongoose</a></li>
  <li><a href="https://socket.io/">Socket.io</a></li>
</ul>

## ⚙️ Requirements

<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a></li>
  <li><a href="https://www.npmjs.com/">NPM</a></li>
  <li><a href="https://expo.io/">Expo</a></li>
  <li><a href="https://expo.io/">Expo CLI</a></li>
  <li><a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas Cluster</a></li>
</ul>

## 🚀 Installation

```bash
$ git clone https://github.com/gabrielsanttana/devradar
```

### 🗄️ API

Before running the API, it's necessary to have a database setup on a MongoDB Atlas Cluster. With that, create a `.env` file in the backend folder root and put these keys in environment variables and they'll work on the mongoose connection string. 

Example: 

```
MONGODB_USERNAME=username
MONGODB_PASSWORD=123456
MONGODB_CLUSTER_URL=cluster0-lfmbb.mongodb.net
```

If you prefer, you can just place your connection string on the `server.js` file.

```
mongoose.connect(`mongodb+srv...`);
```

As the web and mobile app use the same API, it's also necessary to have an environment variable with the local IP address in order to make React Native able to call the API locally.

Example:

```
LOCAL_IP_ADDRESS=000.000.00.000
```

Then:

```bash
$ cd devradar/backend
$ npm install
$ npm run dev
```

### 💻 Web

```bash
$ cd devradar/frontend
$ npm install
$ npm start 
```

The application will pop-up in the browser on http://localhost:3000

### 📱 Mobile

It's also necessary to have an React Native Expo environment setup and the Expo mobile app installed on your smartphone.
It's important that both the smartphone and the computer are connected to the same network and to type the local IP address on the baseURL in the `api.js` file;

Example:

```
const api = axios.create({
  baseURL: 'http://000.000.00.000:3333',
});
```

With that:

```bash
$ cd devradar/mobile
$ npm install -g expo-cli
$ npm install
$ npm start
```

<p>A new window with application log will open in the browser.</p>
<p>Then, you can simply load the app by scanning the QR code with the Expo mobile app or by using the local URL.</p>

## ⚖️ License

[MIT License](https://github.com/gabrielsanttana/devradar/blob/master/LICENSE)
