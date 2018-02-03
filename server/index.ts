import * as path 			from 'path'
import * as express 		from 'express'
import * as bodyParser 		from 'body-parser'
import chalk 				from 'chalk'
import { GLOBAL } 			from './global'
import { RouteBinder } 		from './routes/route-binder.route'
import { IOC } 				from './ioc'
import 'reflect-metadata'


/* ==========================================================================
	-- Utils
========================================================================== */


const port 				= process.env.PORT || GLOBAL.PORT
const environment 		= process.env.NODE_ENV || GLOBAL.PRODUCTION
const log 				= console.log
const success 			= chalk.green


/* ==========================================================================
	-- Configs
========================================================================== */

const app = express()
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* ==========================================================================
	-- Routes
========================================================================== */

const container = IOC.configureContainer()
RouteBinder.configureRoutes(app, container)

/* ==========================================================================
	-- Server
========================================================================== */

app.listen(port, (err:any) => {
	if(err) return console.log(err)
	log(success(`ts-node listening on port ${GLOBAL.PORT} in ${environment} mode`))
})