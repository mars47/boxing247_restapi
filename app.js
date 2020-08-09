//load our app server using express

const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const morgan = require('morgan')
app.use(morgan('short'))

const sequelize  = new Sequelize('boxing247_mysql', 'root', 'boxing', {
	host: 'localhost',
	dialect: 'mysql'
})

const Belts = sequelize.define('Belts', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
	}, 
	name: {
		field: 'name',
		type: Sequelize.STRING,
	}, 
	organizationId: {
		field: 'organization_id',
		type: Sequelize.INTEGER,
		primaryKey: true
	}, 
	weightClassId: {
		field: 'weightClass_id',
		type: Sequelize.INTEGER,
		primaryKey: true
	}, 
	boxerId: {
		field: 'boxer_id',
		type: Sequelize.INTEGER,
	}
}, {
		timestamps: false
})

const Organization = sequelize.define('Organization', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	shortName: {
		field: 'shortName',
		type: Sequelize.STRING,
	},
	fullName: {
		field: 'fullName',
		type: Sequelize.STRING,
	}
}, {
		freezeTableName: true,
		timestamps: false
})

const Boxers = sequelize.define('Boxers', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	firstName: {
		field: 'firstName',
		type: Sequelize.STRING,
	},
	lastName: {
		field: 'lastName',
		type: Sequelize.STRING,
	},
	dateOfBirth: {
		field: 'dateOfBirth',
		type: Sequelize.STRING,
	},
	weightClassId: {
		field: 'weight_id',
		type: Sequelize.INTEGER,
	},
	thumbnailUrl: {
		field: 'thumbnailUrl',
		type: Sequelize.STRING,
	}
}, {
		freezeTableName: true,
		timestamps: false
})

const Events = sequelize.define('Events', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	title: {
		field: 'title',
		type: Sequelize.STRING,
	},
	date: {
		field: 'date',
		type: Sequelize.STRING,
	},
	venue: {
		field: 'venue',
		type: Sequelize.STRING,
	},
	country: {
		field: 'country',
		type: Sequelize.STRING,
	},
	weightClassId: {
		field: 'weight_id',
		type: Sequelize.INTEGER,
	},
	mainEventId: {
		field: 'mainEvent_id',
		type: Sequelize.INTEGER,
	},
	boxer1Id: {
		field: 'boxer1_id',
		type: Sequelize.INTEGER,
	},
	boxer2Id: {
		field: 'boxer2_id',
		type: Sequelize.INTEGER,
	}
}, {
		freezeTableName: true,
		timestamps: false
})

const WeightClass = sequelize.define('WeightClass', {
	id: {
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	weight: {
		field: 'weight',
		type: Sequelize.STRING,
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
	})).then(Boxers.findAll().then( (boxer) => {
		results["boxers"] = boxer
	})).then(Events.findAll().then( (event) => {
		results["events"] = event
	})).then(WeightClass.findAll().then( (weight) => {
		results["weight"] = weight
		res.json(results)
	}))
	//console.log(results["belts"])
})


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

