import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

import { IndexController } from './controllers/index';
import { NewExampleController } from './controllers/newExample';

class Server {
  app: express.Application

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //api routes
    this.api();

    //configure routes
    this.routes();

    //error handling
    this.errorhandling();

    //log the routes
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(this.app));
  }

  /**
   * Configure application
  */
  private config() {
    this.app.use(express.static(path.join(__dirname, 'public')));

    //configure hbs
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'hbs');

    //mount logger
    this.app.use(logger('dev'));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({extended: false}));

    //mount cookie parser middleware
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    //mount override?
    this.app.use(methodOverride());

    this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      next();
    });

    mongoose.connect('localhost:27017/node-angular');
  }

  /**
   * Configure routes
   */
  private routes() {
    //IndexController
    let indexController = IndexController.init();
    //use router middleware
    this.app.use('/', indexController);
  }

  /**
   * Create REST API routes
   */
  private api() {
    let newExampleController = NewExampleController.init();
    this.app.use('/api/new-example', newExampleController);
  }

  private errorhandling() {
    // catch 404 and forward to error handler
    this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
      res.render('index');
    });

    //error handling
    this.app.use(errorHandler());
  }

}

export = Server.bootstrap().app;
