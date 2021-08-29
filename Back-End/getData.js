//Consulta datos a API COVID
const getDataCovid = async (country) => {
  const requestConfirmed = axios.get(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=confirmed`);
  const requestDeaths = axios.get(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=deaths`);
  const requestRecovery = axios.get(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=recovered`);

  return await axios.all([requestConfirmed, requestDeaths, requestRecovery])
    .then(responseAll => {
      return responseAll;
    });
};
