//load our app server using express

const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
app.use(morgan('short'))

const sequelize  = new Sequelize('boxing247_mysql', 'root', 'boxing', {
	host: 'localhost',
	dialect: 'mysql'
})

const Belts = sequelize.define('Belts', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true
	}
}, {
		timestamps: false
})

const Organization = sequelize.define('Organization', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true
	}
}, {
		freezeTableName: true,
		timestamps: false
})

app.get('/user/:id', (req, res) => {

	let results = {}

	Belts.findAll().then((belts) => {
		results["belts"] = belts
	}).then( Organization.findAll().then( (org) => {
		results["organizations"] = org
		console.log(results["belts"])
		res.json(results)
	})
	)

	//console.log(results)
})

// 	const connection = mysql.createConnection({
// 		host: 'localhost',
// 		user: 'root',
// 		password: 'boxing',
// 		database: 'boxing247_mysql'
// 	})

// 	connection.query("SELECT Boxers.id, Boxers.firstName,(select GROUP_CONCAT( JSON_OBJECT('belts_id',belts_id)) from Boxer_Has_Belts where boxer_id = Boxers.id) AS belts FROM Boxers LEFT JOIN Boxer_has_Belts ON Boxers.id = Boxer_has_Belts.boxer_id LEFT JOIN Belts ON Belts.id = Boxer_has_Belts.belts_id GROUP BY Boxers.id;", (err, rows, fields) => {
// 		console.log("fetched users successfully")

// 		if (err) {
// 			return res.status(err.statusCode || 500).send(err.message)
// 		}

// 		res.json(rows)
// 	})

// 	//console.log("Fetching user with id: " + req.params.id)
// // 	//res.end
// })

app.get("/", (req, res) => {
	console.log("Respoding to route")
	res.send("Hello from root")
})

app.get("/users", (req, res) => {

	var user1 = { firstName: "Stephen", lastName: "Curry" }
	var user2 = { firstName: "Omar", lastName: "Amoako" }
	res.json([user1, user2])
	// res.send("Nodeman updates when a save this file!")
})

app.listen(3004, () => {
	console.log("Server is listening on 3003...")
})

