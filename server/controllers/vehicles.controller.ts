import { 
	Request as req, 
	Response as res, 
	NextFunction as next 
} 										from 'express'
import { inject, injectable } 			from 'inversify'
import { IOCTYPES } 					from '../ioc'
import { IVehicleRepository }			from '../services'
import { IVehicle } 					from '../models/vehicle.interface'

@injectable()
export class VehiclesController
{
	public static url = '/vehicles'

	constructor(@inject(IOCTYPES.VEHICLE_REPOSITORY_SERVICE) private _vehicleRepositoryService: IVehicleRepository)
	{
		
	}

	public async listAll(req, res, next) : Promise<void>
	{		
		const list = await this._vehicleRepositoryService.listAll()
		list.length > 0 ? res.status(200).json(list) : res.status(204).json(list)
		
	}

	public async add(req, res, next) : Promise<void>
	{
		await this._vehicleRepositoryService.add(req.body) ? res.sendStatus(201) : res.sendStatus(404)
	}

	public async remove(req, res, next) : Promise<void>
	{
		await this._vehicleRepositoryService.remove(req.body) ? res.sendStatus(202) : res.sendStatus(404)
	}

	public async edit(req, res, next) : Promise<void>
	{
		await this._vehicleRepositoryService.edit(req.body) ? res.sendStatus(200) : res.sendStatus(404)
	}

}