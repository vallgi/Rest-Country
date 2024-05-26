document.addEventListener('DOMContentLoaded', () => {
    const mainDiv = document.getElementById('main-section');
    const CountyDet =document.getElementById('count-det');
    const buttDiv =document.getElementById('back-button');
    const searchInput = document.getElementById('search-input');
    const myView = document.getElementById('myview');
    const themeToggle = document.getElementById('theme-toggle');
    let countriesData = [];

    async function fetchData() {
        try {
            const response = await fetch("./data.json");
            countriesData = await response.json();
            renderCountries(countriesData);

        } catch (error) {
            console.log(error);
        }
    }
// Render the list of countries
    function renderCountries(countries) {
        mainDiv.innerHTML = "";
        countries.forEach(country => {
            const newDiv = document.createElement('div');
            newDiv.className = 'country';
            newDiv.innerHTML = `
                <img src="${country.flags.png}" alt="flag pic"/> 
                <h2>${country.name}</h2>
                <p>Population: ${country.population}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital}</p>
            `;
            mainDiv.appendChild(newDiv);
            newDiv.addEventListener('click', () => showCountyDetail(country));

        });
    }

// county details
        function showCountyDetail(country) {
        CountyDet.innerHTML="";
      
            const newDetail =document.createElement('div');
            newDetail.className="details";
            newDetail.innerHTML =`
            <h1>${country.name}</h1>
            <img src="${country.flag}" alt="flag pic"/> 

            <p>Native:${country.nativeName}</p>
            <p>Population:${country.population}</p>
            <p>Region:${country.region}</p>
            <p>SubRegion:${country.subRegion}</p>
            <p>Capital:${country.capital}</p>
            <p> TopLevelDomain:${country.topLevelDomain}</p>
            <p>Currencies:${country.currencies ? Object.values(country.currencies).map(c=>c.name).join(','):"N/A"}</p>
            <p>Language:${country.language ? Object.values(country.language).join(","):"none"}</p>
            <p><strong>Border Countries:</strong> ${country.borders ? country.borders.join(', ') : 'None'}</p>


            `;
             CountyDet.appendChild(newDetail);
             mainDiv.style.display = 'none';
             CountyDet.style.display = 'block';

        
         }


     


            
            
        buttDiv.addEventListener('click', () => {
        mainDiv.style.display = 'grid';
        CountyDet.style.display = 'none';
    });

                
      


 // Search input handler
        searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(query)); 
        renderCountries(filteredCountries);
        });

        //region filter

        myView.addEventListener('change',(e)=>{
            const region = e.target.value;
            const filteredCountries = region ? countriesData.filter(country => country.region === region) : countriesData;
            renderCountries(filteredCountries);



        });


        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
        });


     fetchData();
});

