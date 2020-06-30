class AccuWeather {
  constructor() {
    this.key = 'sMXhTGaGMu5lzHktIt6SDr9CY19TtDZm';
    this.gradURL =
      'http://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherURL =
      'http://dataservice.accuweather.com/currentconditions/v1/';
  }
  //asinkrona metoda za input
  async update(inputValue) {
    const city = await this.getGrad(inputValue);
    const weather = await this.getWeather(city.Key);
    return { city, weather }; //ovo su objekti, mogli smo staviti grad: city, vrijeme: weather, ali onda ne bismo mogli te objekte pozvati u funkciju updateUI
  }
  async getGrad(grad) {
    const query = `?apikey=${this.key}&q=${grad}`;
    const response = await fetch(this.gradURL + query);
    const data = await response.json();
    return data[0];
  }
  async getWeather(idKey) {
    const query = `${idKey}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
    return data[0];
  }
}
