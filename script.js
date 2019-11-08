const apiKey = "eddb21f0faa0bf30058e9d2ad6796fe6";

const cityId = 260;
const cuisineId = 168;

const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`;

const restaurants = []
const container = document.querySelector('.container')


fetch(url, { headers: { "user-key": apiKey } })
  .then(res => res.json())
  .then(json => {
    console.log(json);

    // let restaurant = json.restaurants

   


//     json.restaurants.forEach(el => {
        

//         const price = el.restaurant.average_cost_for_two
//         const showLowPrice = () => {
//             if (price <= 40) {
//                 document.querySelector('.container').innerHTML += `<div class="boxes"><h2>${el.restaurant.name}</h2><p>${el.restaurant.average_cost_for_two}</p><p>${el.restaurant.user_rating.aggregate_rating}</p><img src="${el.restaurant.featured_image}"><p>${el.restaurant.location.address}</p></div>`
//             }
//         }
//         const showMediumPrice = () => {
//             if (price >= 41 && price <= 59) {
//                 document.querySelector('.container').innerHTML += `<div class="boxes"><h2>${el.restaurant.name}</h2><p>${el.restaurant.average_cost_for_two}</p><p>${el.restaurant.user_rating.aggregate_rating}</p><img src="${el.restaurant.featured_image}"><p>${el.restaurant.location.address}</p></div>`
//             }
//         }
//         const showHighPrice = () => {
//             if (price >= 60 ) {
//                 document.querySelector('.container').innerHTML += `<div class="boxes"><h2>${el.restaurant.name}</h2><p>${el.restaurant.average_cost_for_two}</p><p>${el.restaurant.user_rating.aggregate_rating}</p><img src="${el.restaurant.featured_image}"><p>${el.restaurant.location.address}</p></div>`
//             }
//         }
// document.getElementById("lowPrice").addEventListener("click", showLowPrice)
// document.getElementById("mediumPrice").addEventListener("click", showMediumPrice)
// document.getElementById("highPrice").addEventListener("click", showHighPrice)

        // console.log(el.restaurant.price_range, el.restaurant.average_cost_for_two)
    // })
    

    
  });