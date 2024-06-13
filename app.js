const createError = require('http-errors');
const express =  require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const nunjucksSetup = require('./utils/nunjucksSetup');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');

const app = express();

// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  })
);

// Reducing fingerprinting
app.disable('x-powered-by')

// Set up cookie security 
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))

// view engine setup
nunjucksSetup(app)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // Set locals, providing error details
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Set status based on error status or default to 500
  res.status(err.status || 500);

  // Render the error page and pass the error message
  res.render('main/error', { error: res.locals.message });
});

module.exports = app;