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
				reject(new Array<IVehicle>())
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
				reject(false)
			}
		})
		
	}

	public async remove(arr: Array<{[key:string]:number}>) : Promise<boolean>
	{
		return await new Promise<boolean>((resolve, reject) => {
			try
			{
				for(let key of arr)
					this._vehicleService.vehicles = this._vehicleService.vehicles
															.filter(vehicle => (+vehicle.id) !== (+key.id))

				resolve(true)
			}
			catch(err)
			{
				resolve(false)
			}
		})
	}
	
}