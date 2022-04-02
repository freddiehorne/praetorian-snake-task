import { axios } from "axios";

export const getApiData = async () => {
	try {
		const result = await axios.get(
			"https://612e9e1ed11e5c001755865e.mockapi.io/api/v1/results"
		);
		console.log(result.data);
	} catch (error) {
		console.log(error);
	}
};
