import { IVehicle } from '../models/vehicle.interface'

export interface IVehicleRepository
{
	listAll() : Promise<Array<IVehicle>>
	add(vehicle: IVehicle) : void
	remove(id:number) : void
}