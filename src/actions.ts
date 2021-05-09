import { Request, Response } from 'express'
import { getRepository, getConnection, ObjectLiteral } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Planet } from './entities/Planet'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'

export const createToken = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(Users)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string);
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
		const planets = await getRepository(Planet).find();
		return res.json(planets);
}

export const getUser = async (req: Request, res: Response): Promise<Response> =>{
	
	const user = await getRepository(Users).findOne(req.params.id, { relations: ["planets"] });
	if(user) console.log("users", user);
	return res.json(user);
}

export const getMe = async (req: Request, res: Response): Promise<Response> =>{
	// Notice that the user IS NOT coming from the DB, the user object was decoded from the token
	// you can retrive the current user on any privite endpoint by typing "req.user"
	console.log("This is the logged in user calling this endpoint", req.user);
	//                  ⬇ not comming from the BD
	return res.json(req.user);
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
	const user = await getRepository(Users).findOne(req.params.id); //Busco el usuario en la tabla por el ID recibido
	if(!user) return res.status(404).json({ message: "Not Users found" });
	
	getRepository(Users).merge(user, req.body);  // Hace un merge de los datos existentes con los que se reciben a través de body
	const results = await getRepository(Users).save(user);  // Almacena el cambio en la base de datos		
	return res.json(results);
}


export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
	const users = await getRepository(Users).delete(req.params.id);
	return res.json(users);
}
