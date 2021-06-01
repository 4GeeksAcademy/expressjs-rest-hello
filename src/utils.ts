import * as path from 'path' // node.js internal module usefull to get file paths
import listEndpoints from 'express-list-endpoints' //just a function that retrieves all the API routes
import ejs from "ejs" //template engine

import { Request, Response, NextFunction } from 'express';
import { ObjectLiteral } from 'typeorm';

// We need to know what will be the API host
// in a local computer is always "localhost" 
// but in gitpod if varies depending on the workspace URL
export const url = (port: string) => {
	let publicUrl = `http://localhost:${port}`;
	// Gitpod has internal environment variables https://www.gitpod.io/docs/environment-variables/
	// the Workspace URL is one of them (thank God)
	if(process.env.GITPOD_WORKSPACE_URL){
		const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
		publicUrl = `https://${port}-${host}`;
	}
	return publicUrl
}

// this function creates the HTML/CSS for the API Index home page
export const renderIndex = async (_app: any, url: string) => {

	// loop all the endpoints that the user has generated
	const routes = listEndpoints(_app).map((item: any) => {
		let endpoints: ObjectLiteral[] = []
		item.methods.forEach((e:string) => {
			endpoints.push({ method: e, path: item.path })
		})
		return endpoints
	}).flat()
	//remove the home page rout because its obvious
	.filter((r:ObjectLiteral) => r.path != "/")
	
	// data to be sent to the home page
	let data = {
		host: url,
		routes,
		rigo: "https://github.com/4GeeksAcademy/expressjs-rest-hello/blob/master/docs/assets/rigo-baby.jpeg?raw=true",
		starter: "https://start.4geeksacademy.com/starters/express",

	}
	return new Promise((resolve, reject) => {
		// use the EJS template engine to generate the HTML/CSS
		ejs.renderFile(path.join(__dirname, "../docs/assets/template.ejs"), data as ejs.Data,(err, result) => {
		if (err) {
			reject(err);
		}
		 	resolve(result);
		});
	});
}

//.sort((a,b) => a.method > b.method)

export const safe = (fn:any) => async (req: Request, res: Response, next: NextFunction) => {
	try{
		const fnReturn = await fn(req, res)
	}catch(err){
		res.status(err.status || 500);
		res.json({ message: err.message || err.msg || err });
		
		next(err);
	}
}

export class Exception extends Error{
	status: number = 400
	constructor(msg: string, status: number = 400){
		super();
		this.status = status || 400;
		this.message = msg;
	}
}