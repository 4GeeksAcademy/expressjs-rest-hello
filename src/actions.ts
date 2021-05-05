import { Request, Response } from 'express';
import { getRepository } from 'typeorm';  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User';
import { Exception } from './utils';


export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
	try{
		const users = await getRepository(User).find();
		return res.json(users);
	}
	catch(error){
		console.error(error)
		throw error
	}
}

export const getUser = async (req: Request, res: Response): Promise<Response> =>{
	
	const users = await getRepository(User).findOne(req.params.id);
	return res.json(users);
}

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.firstname) throw new Exception("Please provide a firstname")
	if(!req.body.lastname) throw new Exception("Please provide a lastname")
	if(!req.body.email) throw new Exception("Please provide an email")

	const newUser = getRepository(User).create(req.body);  //Creo un usuario
	const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}


export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
	try {
		
		const user = await getRepository(User).findOne(req.params.id); //Busco el usuario en la tabla por el ID recibido
		
		if(user){
		
			getRepository(User).merge(user, req.body);  // Hace un merge de los datos existentes con los que se reciben a través de body
			const results = await getRepository(User).save(user);  // Almacena el cambio en la base de datos		
			return res.json(results);
	
		}

		return res.status(404).json({ message: "Not User found" });

	} catch (error) {
		return res.status(500).json({ message: error });
	}
}


export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
	
	const users = await getRepository(User).delete(req.params.id);
	return res.json(users);
}

// export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
// 	const user = await getRepository(User).findOne(req.params.id);

// 	if(user){

// 		getRepository(User).merge(user, req.body);  // Hace un merge de los datos existentes con los que se reciben a través de body
// 		const results = await getRepository(User).save(user);  // Almacena el cambio en la base de datos
		
// 		return res.json(results);
// 	}
	
// }