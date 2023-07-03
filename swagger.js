const swaggerAutogen = require('swagger-autogen')()


const doc = {

	info: {
		version: '',      // by default: '1.0.0'
		title: '',        // by default: 'REST API'
		description: '',  // by default: ''
	},
	server: {
    url: "https://18b9-119-63-138-143.ngrok-free.app"
  },
	host: '',      // by default: 'localhost:3000'
	basePath: '',  // by default: '/'
	schemes: [],   // by default: ['http']
	consumes: [],  // by default: ['application/json']
	produces: [],  // by default: ['application/json']

	securityDefinitions: {
		bearerAuth: {
			name: "Authorization",
			type: "apiKey",
			in: "header"
		}
	}
	,  // by default: empty object
	definitions: {
		User: {
			id: 1,
			firstName: 'jon',
			lastName: 'khan',
			email: 'test@example.com',
			phoneNumber: '123456',
			otp: 12,
			dob: '12-10-1999',
			businessName: 'test business',
			cacNo: '12',
			location: 'online',
			address: 'test address',
			gender: 'male',
			nationality: 'pakistan',
			isVerified: '0',
			userType: 'CUSTOMER',
		},

	}
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
	require('.src/index')           // Your project's root file
})
