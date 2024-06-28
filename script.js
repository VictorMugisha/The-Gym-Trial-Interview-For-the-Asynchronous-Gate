

const apiCountry = "https://restcountries.com/v3.1/name/"

async function getCountry(country) {
    try {
        const response = await fetch(apiCountry + country)
        if (!response.ok) {
            throw new Error("Response is not ok")
        }
        const [data] = await response.json()
        const capital = data.capital[0]
        const name = data.name.common
        const [latitude, longitude] = data.latlng
        getWeather(name, capital, latitude, longitude)
    } catch(err) {
        console.log("ERROR: ", err)
    }
}

async function getWeather (country, capital, latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        if(!response.ok) {
            throw new Error("Response is not ok")
        }
        const data = await response.json()
        const temp = data.current_weather.temperature
        const unit = data.current_weather_units.temperature
        
        console.log("Country: ", country)
        console.log("Capital: ", capital)
        console.log(`Current Temperature: ${temp}${unit}`)
    } catch (error) {
        console.log("ERROR: ", err)
    }
}


getCountry("Rwanda")
getCountry("Burundi")
getCountry("Kenya")