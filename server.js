const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
app.set('view engine', 'hbs');
// app.set('views', __dirname + '/views'); views are default
// value


app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', err => {
		if (err) {
			console.log('Uable to append to server.log.', err)
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance'), {
		pageTitle: 'Maintenance'
	};
});

app.use(express.static(__dirname + '/public_html'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', text => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Hello this is the home page',
	})
});


app.get('/json', (req, res) => {
	res.send({
		name: 'akim',
		age: 23
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
})

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
