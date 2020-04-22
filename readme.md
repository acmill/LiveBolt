
# LiveBolt

This is the frontend application for the LiveBolt project. LiveBolt is a low cost, low maintenance, smart lock replacement that can also be built using your own microcontroller, sensors, and server.

## Getting everything set up

You'll find a LiveBolt setup guide [here](https://www.hackster.io/carte391/how-to-create-a-smart-lock-with-a-ti-cc3200-launchxl-151fbd)

For the frontend application, we are using [Expo](https://docs.expo.io/versions/latest/)
```bash
npm install --global expo-cli

```

Use the package manager [npm](https://npmjs.com) to install all additional packages in the root of the project after cloning.

```bash
npm install
```

Lastly, create your credentials.js file in the /constants/ folder.

``` /constants/fb_config.js``` Will be looking for it, otherwise you will not be able to access Firebase services.

```javascript
// Initialize Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    projectId: "",
  };

//  Notifications, analytics, other API keys here...



//  Exports
export default firebaseConfig;
//  export any other keys used here...
```

## Usage

After getting the most recent packages, use one of the following commands in order to get expo started.

```bash
npm start
expo start
expo start:web
```

Once that has been done, you can use a simulator for iOS or Android, or scan the QR code that will appear after successful build and launch the app right on one of your devices.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests appropriately and when necessary.

## License
MIT License

Copyright (c) [2020] [LiveBolt]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
