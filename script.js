//API data
const apiKey = "eddb21f0faa0bf30058e9d2ad6796fe6";
const cityId = 260;
const cuisineId = 168;

const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`;

//local data storage
const restaurants = [];

const container = document.querySelector(".container");

//Fetching data from ZAMATO API and creating local copy of used only inforamtions for every restaurant
fetch(url, { headers: { "user-key": apiKey } })
  .then(res => res.json())
  .then(json => {
    json.restaurants.forEach(el => {
      let range = el.restaurant.price_range;
      if (range <= 2) {
        range = "low";
      }
      if (range === 3) {
        range = "medium";
      }
      if (range > 3) {
        range = "high";
      }
      restaurants.push({
        name: el.restaurant.name,
        cost: el.restaurant.average_cost_for_two,
        rating: el.restaurant.user_rating.aggregate_rating,
        image: el.restaurant.featured_image,
        address: el.restaurant.location.address,
        delivery: el.restaurant.has_online_delivery,
        booking: el.restaurant.has_table_booking,
        priceRange: range
      });
    });
    // Adding event listeners to buttons
    document.getElementById("priceUp").addEventListener("click", () => {
      sortUp("cost");
    });
    document.getElementById("priceDown").addEventListener("click", () => {
      sortDown("cost");
    });
    document.getElementById("nameUp").addEventListener("click", () => {
      sortUp("name");
    });
    document.getElementById("nameDown").addEventListener("click", () => {
      sortDown("name");
    });
    document.getElementById("rateUp").addEventListener("click", () => {
      sortUp("rating");
    });
    document.getElementById("rateDown").addEventListener("click", () => {
      sortDown("rating");
    });
    document.getElementById("delivery").addEventListener("click", () => {
      filterOptions("delivery");
    });
    document.getElementById("bookOnline").addEventListener("click", () => {
      filterOptions("booking");
    });
    document.getElementById("clearFilters").addEventListener("click", () => {
      printRestaurants();
    });
    lowPrice.addEventListener("click", () => {
      showPrice("low");
    });
    mediumPrice.addEventListener("click", () => {
      showPrice("medium");
    });
    highPrice.addEventListener("click", () => {
      showPrice("high");
    });
    printRestaurants();
  });

//Universal filter function for boolean values (0/1 options)
const filterOptions = option => {
  printRestaurants(
    restaurants.filter(el => {
      return el[option] === 1;
    })
  );
};

//Universal incr sorting function
const sortUp = key => {
  restaurants.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
  printRestaurants();
};

//Universal decr sorting function
const sortDown = key => {
  restaurants.sort((a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0));
  printRestaurants();
};
const showPrice = (selectedPrice) => {
  printRestaurants(restaurants.filter(item => {
      return item.priceRange === selectedPrice
}))}

//Universal rendering function with default parameter asign to local restaurants array
const printRestaurants = (arr = restaurants) => {
  container.innerHTML = "";
  arr.forEach(el => {
    container.innerHTML += `
      <div class="boxes">
        <h2>${el.name}</h2>
        <p>${el.cost}</p>
        <p>${el.rating}</p>
        <img src="${el.image}">
        <p>${el.address}</p>
      </div>`;
  });
};
