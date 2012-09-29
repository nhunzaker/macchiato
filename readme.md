# Express Boilerplate

Be it basic buildouts, or fun node experiments, this is my standard 
boilerplate for such projects. I use [ejs](https://github.com/visionmedia/ejs) 
for templating and [mocha](https://github.com/visionmedia/mocha) for testing. 
Asset compilation is handled by the ever wonderful [grunt.js](http://gruntjs.com).

### Requirements

- [node.js](http://nodejs.org/)
- [TJ Holowaychuk's fork of jscoverage](https://github.com/visionmedia/node-jscoverage)

### Build it

`npm install -d`

### Test it

`npm test`

### Check test coverage

`make coverage`

### Start it

`npm start`

### Compile assets

`grunt`

or

`grunt watch`

### Host it

``` shell
heroku create
git push heroku master
```
