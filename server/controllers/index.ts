import { NextFunction, Request, Response, Router } from 'express';

export class IndexController {

  static init(): Router {
    console.log('[IndexController::init] Creating index route.');
    let router = Router();

    let controller = new IndexController();
    router.get('/', controller.index);

    return router
  }

  index(req: Request, res: Response, next: NextFunction) {
    console.log('[IndexController::index]');

    res.render('index');
  }
}
