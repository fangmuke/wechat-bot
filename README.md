# WeChat Bot
### Status：Dev.
微信机器人

## How To Use

### 1. check node version, need to be $ge than v12.0.0
```
node --version // >= v12.0.0
``` 

### 2. install node modules
After cloning the repo, change current directory to repo's root folder:

RUN: `yarn install` or `npm install`

### 3. add local config file
RUN `cp ./config/default.json ./config/local.json`.

### 4. override local config file
**Contact [haoda](mailto:oxddoxdd@gmail.com) to request following information.**

* server host 
* server port
* padlocal token
* server ca certification 

Then fill them into `local.json`.

*`local.json`has been ruled by .gitignore, credentials are safe to store.*

### 5. try the run
RUN: `yarn run dev` or `npm run dev`

### 6. build
RUN: `yarn run build` or `npm run build`

### 7. run
RUN: `yarn run start` or `npm run start`
