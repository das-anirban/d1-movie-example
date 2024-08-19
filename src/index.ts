import { Hono } from "hono"

type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// List of all movies GET
app.get('/movies', async c => {
	const resp = await c.env.DB.prepare("select * from movies").all();
	const movies = resp.results;

	return c.json(movies)
})

// 3 favourite movies GET 
app.get("/favourites", async c => {
	const movies = await c.env.DB
								.prepare("select title, release_date, rating from movies order by rating DESC LIMIT 0,3")
								.all();

	return c.json(movies.results)
})

// PUT - to rerate movies

app.put("/movies/:id", async c => {
	const body = await c.req.json()

	const resp = await c.env.DB
		.prepare("UPDATE movies SET rating = ?1 WHERE id = ?2 RETURNING *")
		.bind(body.rating, c.req.param("id"))
		.run()

	const ok = resp.success
	return c.json({ ok })
})

// curl -X PUT  http://localhost:8787/movies/1 -d'{"rating":10}' - run this is terminal to execute PUT

export default app