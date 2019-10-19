var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');

var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');
var startupRouter = require('./routes/startups');
var cors = require('cors');
var upload = require('express-fileupload');
var favoriteRouter = require('./routes/favorites');
var experiencesRouter = require('./routes/experiences');
var educationsRouter = require('./routes/educations');
var advertisementsRouter = require('./routes/advertisements');
var challengesRouter = require('./routes/challenges');
var skillsRouter = require('./routes/skills');
var stageRouter = require('./routes/stage');
var categoryRouter = require('./routes/category');
var proposalRouter = require('./routes/proposals');
var scheduleRouter = require('./routes/schedule');
var areaRouter = require('./routes/area');
//const controller = require('./controllers/userController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(upload());

app.use('/documentation', express.static(__dirname + '/doc', { maxAge: 86400000 }));

app.use('/users', usersRouter);
app.use('/employees',employeesRouter);
app.use('/startups', startupRouter);
app.use('/favorites', favoriteRouter);
app.use('/experiences', experiencesRouter);
app.use('/educations', educationsRouter);
app.use('/advertisements', advertisementsRouter);
app.use('/challenges', challengesRouter);
app.use('/skills', skillsRouter);
app.use('/proposals', proposalRouter);
app.use('/stages', stageRouter);
app.use('/categories', categoryRouter);
app.use('/schedules', scheduleRouter);
app.use('/areas', areaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(404)
  res.send({ error: 'Page Not found'   })
  console.log(err)
  return
});

module.exports = app;
