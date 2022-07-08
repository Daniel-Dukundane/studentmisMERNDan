const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');



require('dotenv').config();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
		components: {
			securitySchemes: {
			  bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				in: 'header',
				bearerFormat: 'JWT',
			  }
			}
		  },
		  security: [{
			bearerAuth: []
		  }]
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
const app = express();
app.use("/vehiclemis-apis", swaggerUI.serve, swaggerUI.setup(specs));
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}
);

const usersRoute = require('./routes/users');
const vehiclesRoute = require('./routes/vehicle');
const ownersRoute = require('./routes/owner');

app.use("/users", usersRoute);
app.use("/vehicles", vehiclesRoute);
app.use("/owners", ownersRoute);

 


app.listen(port, () => console.log(`Server started on port ${port}`));