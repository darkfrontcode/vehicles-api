import { injectable, inject } 	from 'inversify'
import { IVehicleRepository } 	from './vehicle-repository.interface'
import { IVehicleService } 		from './vehicle.service.interface'
import { IVehicle } 			from '../models/vehicle.interface'
import { IOCTYPES } 			from '../ioc'
import 'reflect-metadata'

@injectable()
export class VehicleRepositoryService implements IVehicleRepository
{
	constructor(@inject(IOCTYPES.VEHICLE_SERVICE) private _vehicleService: IVehicleService)
	{
		
	}

	public async listAll() : Promise<Array<IVehicle>>
	{
		return await new Promise<Array<IVehicle>>((resolve, reject) => {
			try
			{
				resolve(this._vehicleService.vehicles)
			}
			catch(err)
			{
				resolve(new Array<IVehicle>())
			}
		})
	}

	public async add(vehicle: IVehicle) : Promise<boolean>
	{
		return await new Promise<boolean>((resolve, reject) => {
			try
			{
				this._vehicleService.vehicles.push(vehicle)
				resolve(true)
			}
			catch(err)
			{
				resolve(false)
			}
		})
		
	}

	public async remove(arr: Array<{[key:string]:number}>) : Promise<boolean>
	{
		return await new Promise<boolean>((resolve, reject) => {
			try
			{
				for(let key of arr)
					this._vehicleService.vehicles = this._vehicleService.vehicles.filter(vehicle => (+vehicle.id) !== (+key.id))

				resolve(true)
			}
			catch(err)
			{
				resolve(false)
			}
		})
	}

	public async edit(vehicle: IVehicle) : Promise<boolean>
	{
		return await new Promise<boolean>((resolve, reject) => {
			try
			{
				const key = this._vehicleService.vehicles.findIndex(v => (+v.id) === (+vehicle.id))

				if(key === -1)
				{
					resolve(false)
				}
				else
				{
					this._vehicleService.vehicles[key] = { ...this._vehicleService.vehicles[key], ...vehicle }
					resolve(true)
				}
			}
			catch(err)
			{
				resolve(false)
			}
		})
	}
	
}