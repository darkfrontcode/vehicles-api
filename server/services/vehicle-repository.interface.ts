import { IVehicle } from '../models/vehicle.interface'

export interface IVehicleRepository
{
	listAll() : Promise<Array<IVehicle>>
	add(vehicle: IVehicle) : Promise<boolean>
	remove(arr: Array<{[key:string]:number}>) : Promise<boolean>
	edit(vehicle: IVehicle) : Promise<boolean>
}