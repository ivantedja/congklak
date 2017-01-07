## Congklak Game

See how to play in [here](http://www.expat.or.id/info/congklakinstructions.html).

### Initial setup

```bash
# Clone the repo...
git clone https://github.com/ivantedja/congklak.git
cd congklak

# Then, you need to install all the dependencies...
npm install

# If you wanna be able to use global commands `gulp`...
npm install -g gulp
```

### Running in the browser for development
```bash
gulp build
gulp serve

# If you wanna Gulp to re-build on every change...
gulp watch
```

### Running unit testing
```bash
npm test
```

### If you just wanna run it

Just open `index.html` in your browser. See it live in [here](https://ivantedja.github.io/congklak/)

### Brief Description
```bash
# holes are represented by Array with index as follows:
      8  9 10 11 12 13 14
  [7]                     [15]
      6  5  4  3  2  1  0
```

Here are the models involved:
- Board
- Hole
- StoreHouse
- Player
- Stone

### Screenshots

![screenshot 1](https://github.com/ivantedja/congklak/screenshots/screenshot-1.png)

![screenshot 2](https://github.com/ivantedja/congklak/screenshots/screenshot-2.png)

![screenshot 3](https://github.com/ivantedja/congklak/screenshots/screenshot-3.png)

### Stacks involved

- [ES6 boilerplate](https://github.com/thoughtram/es6-babel-browserify-boilerplate)
- JavaScript
- jQuery
- [Mocha](https://mochajs.org/)
- [Chai](http://chaijs.com/)
