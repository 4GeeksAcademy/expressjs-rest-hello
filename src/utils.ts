import listEndpoints from 'express-list-endpoints';
import { Request, Response, NextFunction } from 'express';

export const url = (port: number) => {
	let publicUrl = `http://localhost:${port}`;
	if(process.env.GITPOD_WORKSPACE_URL){
		const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
		publicUrl = `https://${port}-${host}`;
	}
	return publicUrl
}

export const renderRoutes = (_app: any, url: string) => {
	const routesHTML = listEndpoints(_app).map((item: any) => {
		let endpoints: Array<string> = [];
		item.methods.forEach((e:string) => {
			endpoints.push(`${e}: ${e == 'GET' && !item.path.includes(":") ? `<a href="${item.path}">${item.path}</a>`:item.path}`)
		})
		return endpoints
	}).flat().map((item: string) => `<li>${item}</li>`)

	return `
		<h1>Welcome to your API</h1>
		<input style="padding: 5px; width: 100%; max-width: 800px;" type="text" value="${url}" />
		<p>These are the endpoints you have developed so far</p>
		<ul>${routesHTML.sort().join('')}</ul>
	`
}

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