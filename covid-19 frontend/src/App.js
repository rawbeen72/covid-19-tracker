import React, { useEffect, useState } from "react";
import Chart from "./components/Chart/Chart";
// import { fetchTotal } from "./api";
import { barChartData } from "./api";
import { fetchDailyUpdate } from "./api";
import { fetchAllCountries } from "./api";
import Sidebar from "./components/sidebar/Sidebar";
import TopCards from "./components/TopCards";
import { fetchAllCases } from "./api";
import LineChart from "./components/Chart/LineChart";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [dailyData, setDailyData] = useState({});
	const [countries, setCountries] = useState([]);
	const [globalCases, setGlobalCases] = useState({});
	const [country, setCountry] = useState(
		localStorage.getItem("country") || "Nepal"
	);

	const countryValue = (country) => {
		console.log("object");
		localStorage.setItem("country", country);
		setCountry(localStorage.getItem("country"));
	};
	const countryHandler = async (country) => {
		try {
			const fetchedDailyUpdate = await fetchDailyUpdate(country);
			if (country === "Global") {
				return;
			} else {
				setDailyData(fetchedDailyUpdate);
			}
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		const fetchCountries = async () => {
			const fetchedCountries = await fetchAllCountries();
			setCountries(fetchedCountries);
		};
		fetchCountries();
	}, []);

	useEffect(() => {
		const barChartDataLoader = async () => {
			if (country) {
				const barChartDatas = await barChartData(country);
				setData(barChartDatas || 0);
			} else {
				const barChartDatas = await barChartData("Nepal");
				setData(barChartDatas || 0);
			}
		};
		barChartDataLoader();
	}, [country]);
	useEffect(() => {
		const fetchAllCase = async () => {
			const fetchedAllCases = await fetchAllCases();
			setGlobalCases(fetchedAllCases);
		};
		fetchAllCase();
	}, []);
	useEffect(() => {
		const fetchDailyUpdateFunc = async () => {
			const fetchedDailyUpdate = await fetchDailyUpdate("Nepal");
			setDailyData(fetchedDailyUpdate);
			setLoading(false);
		};
		fetchDailyUpdateFunc();
	}, []);

	if (loading) {
		return null;
	}
	return (
		<div className="bg-gray-900 min-h-screen">
			<div className="flex justify-center sm:mb-0 mb-5">
				<img
					className="sm:w-full mb-1  md:h-44 flex justify-center sm:placeholder:my-1 w-full h-20"
					src="https://www.cityofconcord.org/ImageRepository/Document?documentID=4265"
					alt="image"
				/>
			</div>
			<Sidebar data={data} />
			<TopCards
				barData={data}
				dailyData={dailyData}
				globalCases={globalCases}
				countryHandler={countryHandler}
				countryValue={countryValue}
				fetchedCountries={countries}
				data={data}
			/>
			<Chart barData={data} globalCases={globalCases} />
			<LineChart />
		</div>
	);
};

export default App;
