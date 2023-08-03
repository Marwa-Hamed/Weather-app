/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
let htmlDate = document.getElementById('date')
let htmlTemp = document.getElementById('temp')
let htmlFeel = document.getElementById('content')

// Personal API key for OpenWeatherMap
let apiKey = '&appid=bdf8328508f0dfdca041078682105528&units=imperial';
let baseURL = `https://api.openweathermap.org/data/2.5/forecast?zip=`
// Adding an event listener to an existing HTML button from DOM
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, newZip, apiKey)

        .then(function (data) {
            // Add data
            postData('http://localhost:8000/addData', { date: newDate, temp: data.list[0].main.temp, content: feelings })
            .then(function(resData){
                if(resData === 'OK'){
                       updateUI()
                }
         
            });
        })

};



/* function to Get Web API Data */
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }

}
/* function to Post data */

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'Post',
        credentails: 'same-origin',
        headers: {
            'content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData.status;
    } catch (error) {
        console.log("error", error);
    }
}


/* function to Get Project Data */

const updateUI = async () => {
    const request = await fetch('http://localhost:8000/allData');
    try {
        const allData = await request.json();
        if (allData !== undefined) {
           
            htmlDate.innerHTML = `Date: ${allData.date}`;
            htmlTemp.innerHTML = `Temperature: ${allData.temp}` + ' F';
            htmlFeel.innerHTML = `Feeling: ${allData.content}`;
        }
       

    }
    catch (error) {
        console.log("error", error);
    }
}