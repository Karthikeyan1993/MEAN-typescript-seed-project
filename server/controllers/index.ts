import { NextFunction, Request, Response, Router } from 'express';

export class NewExampleController {

  static init(): Router {
    console.log('[NewExampleController::init] Creating index route.');
    let router = Router();

    let controller = new IndexController();
    router.get('/', controller.index);
    router.get('/:id', controller.get);
    router.put('/:id', controller.put);
    router.post('/', controller.post);

    return router
  }

  index(req: Request, res: Response, next: NextFunction) {
    console.log('[NewExampleController::index]');

    res.render('index');
  }

  get(req: Request, res: Response, next: NextFunction) {
    console.log('[NewExampleController::get]');

    res.render('index');
  }

  put(req: Request, res: Response, next: NextFunction) {
    console.log('[NewExampleController::put]');

    res.render('index');
  }

  post(req: Request, res: Response, next: NextFunction) {
    console.log('[NewExampleController::post]');

    res.render('index');
  }
}
