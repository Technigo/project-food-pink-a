const apiKey = "eddb21f0faa0bf30058e9d2ad6796fe6";

const cityId = 260;
const cuisineId = 168;

const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`;

const restaurants = []

fetch(url, { headers: { "user-key": apiKey } })
  .then(res => res.json())
  .then(json => {
    console.log(json);

    json.restaurants.forEach(el => {
        document.querySelector('.container').innerHTML += `<div class="boxes"><img src="${el.restaurant.featured_image}"><h2>${el.restaurant.name}</h2><p>Average cost ${el.restaurant.average_cost_for_two}</p><p>Rating ${el.restaurant.user_rating.aggregate_rating}</p><p>${el.restaurant.location.address}</p></div>`
    })
    
  });