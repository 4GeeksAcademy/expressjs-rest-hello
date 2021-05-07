import { Request, Response } from 'express'
import { getRepository, getConnection, ObjectLiteral } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Planet } from './entities/Planet'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	const email = req.body.email;
	const password = req.body.password;

	const userRepo = await getRepository(User)

	const user = await userRepo.findOne({ email, password })
	if(!user) throw new Exception("Invalid email or password", 401)

	const token = jwt.sign({ user }, process.env.JWT_KEY as string); // config => expire time, algorithm
	
	return res.json({ user, token });
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(User).find();
		return res.json(users);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
		const planets = await getRepository(Planet).find();
		return res.json(planets);
}

export const getUser = async (req: Request, res: Response): Promise<Response> =>{
	
	const user = await getRepository(User).findOne(req.params.id, { relations: ["planets"] });
	if(user) console.log("users", user);
	return res.json(user);
}

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")

	const newUser = getRepository(User).create(req.body);  //Creo un usuario
	const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const addToFavorite = async (req: Request, res:Response): Promise<Response> =>{

	const planetId = req.params.id;

	const users = req.body.users;
	delete req.body['users']

	const planetRepo = getRepository(Planet);
	const planet = planetRepo.create(req.body as ObjectLiteral);  //Creo un usuario
	
	//add users from the req.body
	planet.users = users; 
	
	const result = await planetRepo.save(planet); //Grabo el nuevo usuario 
	
	return res.json(result);
}

export const createPlanet = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.name) throw new Exception("Please provide a firs_tname")
	if(!req.body.users) throw new Exception("Please provide a the planet users")

	const users = req.body.users;
	delete req.body['users']

	const planetRepo = getRepository(Planet);
	const planet = planetRepo.create(req.body as ObjectLiteral);  //Creo un usuario
	
	//add users from the req.body
	planet.users = users; 
	
	const result = await planetRepo.save(planet); //Grabo el nuevo usuario 
	
	return res.json(result);
}


export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
	const user = await getRepository(User).findOne(req.params.id); //Busco el usuario en la tabla por el ID recibido
	if(!user) return res.status(404).json({ message: "Not User found" });
	
	getRepository(User).merge(user, req.body);  // Hace un merge de los datos existentes con los que se reciben a través de body
	const results = await getRepository(User).save(user);  // Almacena el cambio en la base de datos		
	return res.json(results);
}


export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
	const users = await getRepository(User).delete(req.params.id);
	return res.json(users);
}
