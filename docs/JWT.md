Install the library

1. npm install jwt-express @types/jwt-express --save

2. Add middlewares inside app.js:

```js
app.use(jwt.init('secret'))
app.use(((err: any, req: any, res: any, next: any) => {
	if (err) console.error(err);
	if (err.name === 'UnauthorizedError') {
	  res.status(401).json({ status: 'invalid token' });
	}
	next();
}))

```