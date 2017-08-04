
### How to run

You will need two terminals open where you have the project located. Run the following commands, one in each terminal.

```
npm start
```
and
```
npm run build
```

### How to create a new controller and route

#### Add Controller
- You will create a new controller in the server/controllers folder.  Lets add server/controllers/newExample.ts
- Your controller should look like the following:
```
import { NextFunction, Request, Response, Router } from 'express';

export class NewExampleController {

  static init(): Router {
    console.log('[NewExampleController::init] Creating index route.');
    let router = Router();

    let controller = new IndexController();
    router.get('/', controller.index);

    return router
  }

  index(req: Request, res: Response, next: NextFunction) {
    console.log('[NewExampleController::index]');

    res.status(200).json({
      message: 'New Example Controller',
      obj: {}
    });
  }
}
```
- If you need to add more routes to the controller do the following and try to keep it restful with a controller only having post, index, put, get methods:
```
import { NextFunction, Request, Response, Router } from 'express';

export class NewExampleController {

  static init(): Router {
    console.log('[NewExampleController::init] Creating index route.');
    let router = Router();

    let controller = new IndexController();
    router.get('/', controller.index);
    router.post('/create', controller.post);

    return router
  }

  index(req: Request, res: Response, next: NextFunction) {
    console.log('[NewExampleController::index]');

    res.status(200).json({
      message: 'New Example Controller Index',
      obj: {}
    });
  }

  post(req: Request, res: Response, next: NextFunction) {
    console.log('[NewExampleController::post]');

    res.status(200).json({
      message: 'New Example Controller Post',
      obj: {}
    });
  }
}
```

#### Make the controller and route excessible
- In server/app.ts you will add a call to your new controller by importing it at the top of the file 
`import { NewExampleController } from './controllers/newExampleController'`
- You will then go to the **api** method in server/app.ts and add the initialization of your new route.
```
  private api() {
    let newExampleController = NewExampleController.init();
    this.app.use('/api/new-example', newExampleController);
  }
```
- This will now make **http://localhost:3000/api/new-example** and **http://localhost:3000/api/new-example/create** accessible.

## How to make a new Model

- You will create a new model in server/models.  For this we will create server/models/newExample.ts
- Your model should look like the following.
```
import { Document, Schema, model } from 'mongoose';

// This will be where the JSON get moved from front end to back end and visa versa
export class NewExampleDto {
  name: string;
  allowed: boolean;

  constructor(data: {
    name: string,
    allowed: boolean
  }) {
    this.name = data.name;
    this.allowed = data.allowed;
  }
}

// This will represent the schema in Mongo
let schema = new Schema({
    name: {type: String, required: true},
    allowed: {type:Boolean, required: true}
});

export interface NewExampleDocument extends NewExampleDto, Document { }

// This will be what you use to call NewExampleModel.findOne ect with NewExample being the Document name in Mongo
export const NewExampleModel = model<NewExampleDocument>('NewExample', schema);
```

### Further Breakdown of the Model

- JSON will get moved from front end to back end and visa versa with the following part of the file.  This is like a .net DTO
```
export class NewExampleDto {
  name: string;
  allowed: boolean;

  constructor(data: {
    name: string,
    allowed: boolean
  }) {
    this.name = data.name;
    this.allowed = data.allowed;
  }
}
```
- This will define the schema in Mongo
```
let schema = new Schema({
    name: {type: String, required: true},
    allowed: {type:Boolean, required: true}
});
```
- This defines how you do finds and save.  For Example `NewExampleModel.findOne` or `NewExampleModel.save`.  NewExample will be the Document's name in Mongo.
```
export interface NewExampleDocument extends NewExampleDto, Document { }
export const NewExampleModel = model<NewExampleDocument>('NewExample', schema);
```

You can now start building out routes and models in your MEAN stack with typescript.
