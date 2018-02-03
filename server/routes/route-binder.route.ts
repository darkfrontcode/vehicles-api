import * as express             from 'express'
import { Container }            from 'inversify'

import { VehiclesController }   from '../controllers'
import { IOCTYPES }             from '../ioc'

export class RouteBinder
{
	public static configureRoutes(app: express.Express, container: Container): void
	{
        const vehiclesController = container.get(VehiclesController)

        app.route(VehiclesController.url)
            .get(async (req, res, next) => await vehiclesController.listAll(req, res, next))
            .post(async (req, res, next) => await vehiclesController.add(req, res, next))
            .delete(async (req, res, next) => await vehiclesController.remove(req, res, next))
    }
}