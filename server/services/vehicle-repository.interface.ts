import { IVehicle } from '../models/vehicle.interface'

export interface IVehicleRepository
{
	listAll() : Promise<Array<IVehicle>>
	add(vehicle: IVehicle) : void
	remove(arr: Array<{[key:string]:number}>) : Promise<boolean>
}