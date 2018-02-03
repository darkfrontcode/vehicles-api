import { IVehicle } 			from '../models/vehicle.interface'
import { IVehicleService } 		from './vehicle.service.interface'
import { VehicleList } 			from '../vehicles/vehicle.list'
import { injectable } 			from 'inversify'
import 'reflect-metadata'

@injectable()
export class VehicleService implements IVehicleService
{
	public vehicles = VehicleList
}