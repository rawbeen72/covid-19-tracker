const express = require("express");
const app = express();
const path = require("path");
const request = require("postman-request");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

// total
app.get("/", (req, res) => {
	res.send("This is Covid-19 Tracker Server");
});
const options = {
	url: `https://covid-19-data.p.rapidapi.com/country`,
	headers: {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "8cd2881885msh9933f89c5aa2186p1d8076jsn7303d42b3c66",
	},
	json: true,
};

app.get("/api/v1/stat/total", (req, res) => {
	request(
		{
			...options,
			url: `https://covid-19-data.p.rapidapi.com/totals`,
		},
		(err, body) => {
			if (err) {
				return console.log(err);
			}
			res.send(
				JSON.stringify({
					body,
				})
			);
		}
	);
});

// new cases

var option = {
	method: "GET",
	url: `https://covid-193.p.rapidapi.com/statistics`,
	headers: {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8cd2881885msh9933f89c5aa2186p1d8076jsn7303d42b3c66",
	},
	json: true,
};
app.get("/api/v1/stat/daily", (req, res) => {
	request(
		{
			...option,
			url: `https://covid-193.p.rapidapi.com/statistics?country=${req.query.country}`,
		},

		(err, body) => {
			if (err) {
				return console.log(err);
			}
			res.send(
				JSON.stringify({
					body,
				})
			);
		}
	);
});

// individual country data api
const options_individual = {
	method: "GET",
	url: "https://covid-19-data.p.rapidapi.com/country",
	headers: {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "8cd2881885msh9933f89c5aa2186p1d8076jsn7303d42b3c66",
		useQueryString: true,
	},
	json: true,
};
app.get("/api/v1/stat/country", (req, res) => {
	request(
		{
			...options_individual,
			url: `https://covid-19-data.p.rapidapi.com/country?name=${req.query.name}`,
		},

		(err, body) => {
			if (err) {
				return console.log(err);
			}
			res.send(
				JSON.stringify({
					body,
				})
			);
		}
	);
});

// all countries fetch api
const country_options = {
	method: "GET",
	url: "https://covid-193.p.rapidapi.com/countries",
	headers: {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8cd2881885msh9933f89c5aa2186p1d8076jsn7303d42b3c66",
		useQueryString: true,
	},
	json: true,
};
app.get("/api/v1/stat/country/all", (req, res) => {
	request(country_options, (err, body) => {
		if (err) {
			return console.log(err);
		}
		res.send(
			JSON.stringify({
				body,
			})
		);
	});
});

// all countries individual data api
const country_option = {
	method: 'GET',
  url: '',
  headers: {
    'X-RapidAPI-Key': '55d459414fmsh32c0a06c0e3e34dp1f40a5jsn084fca18f5ea',
    'X-RapidAPI-Host': 'covid-19-tracking.p.rapidapi.com',
    // useQueryString: true
  },
	json:true
}

app.get("/api/v1/data/country/:country", (req, res) => {
	request(
		{
			...country_option,
			url: `https://covid-19-tracking.p.rapidapi.com/v1/${req.params.country}`,
		},
		(err, body) => {
			if (err) {
				return console.log(err);
			}
			res.send(
				JSON.stringify({
					body,
				})
			);
		}
	);
});



// global new cases api
const global_options = {
	method: "GET",
	url: "https://covid-193.p.rapidapi.com/statistics",
	headers: {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8cd2881885msh9933f89c5aa2186p1d8076jsn7303d42b3c66",
		useQueryString: true,
		
	},
	
	json: true,
};
app.get("/api/v1/stat/all", (req, res) => {
	request(global_options, (err, body) => {
		if (err) {
			console.log(err);
		}
		res.send(
			JSON.stringify({
				body,
			})
		);
	});
});

app.listen(PORT);
