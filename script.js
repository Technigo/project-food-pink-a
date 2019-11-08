//API data
const apiKey = "aebd3e610b0618da2a7206a1c7ae40e2"
const cityId = 260
const cuisineId = 168

const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`

//local data storage
const restaurants = []
const container = document.querySelector(".container")

const showPrice = selectedPrice => {
  container.innerHTML = ""
  restaurants.filter(item => {
    if (item.priceRange === selectedPrice) {
      container.innerHTML += `<div class="boxes"><h2>${item.name}</h2><p>${item.cost}</p><p>${item.rating}</p><img src="${item.image}"><p>${item.address}</p></div>`
    }
  })
}

//Fetching data from ZAMATO API and creating local copy of used only inforamtions for every restaurant
fetch(url, { headers: { "user-key": apiKey } })
  .then(res => res.json())

  .then(json => {
    json.restaurants.forEach(el => {
      const dollar = el.restaurant.price_range

      const myDelivery = el.restaurant.R.has_menu_status.delivery

      /*  */

      // delivery
      // ${el.restaurant.R.has_menu_status.delivery}

      let range = el.restaurant.price_range
      if (range <= 2) {
        range = "low"
      }
      if (range === 3) {
        range = "medium"
      }
      if (range > 3) {
        range = "high"
      }
      restaurants.push({
        name: el.restaurant.name,
        cost: el.restaurant.average_cost_for_two,
        rating: el.restaurant.user_rating.aggregate_rating,
        image: el.restaurant.featured_image,
        address: el.restaurant.location.address,
        delivery: el.restaurant.has_online_delivery,
        booking: el.restaurant.has_table_booking,
        priceRange: range,
        dollar
      })
    })

    console.log(restaurants)

    //FILTER ON PRICE RANGE

    lowPrice.addEventListener("click", () => {
      showPrice("low")
    })
    mediumPrice.addEventListener("click", () => {
      showPrice("medium")
    })
    highPrice.addEventListener("click", () => {
      showPrice("high")
    })

    //json.restaurants.forEach(el => {
    /* 'const showLowPrice = () => {
  if (price <= 40) {
    document.querySelector(
      ".container"
    ).innerHTML += `<div class="boxes"><h2>${el.restaurant.name}</h2><p>${el.restaurant.average_cost_for_two}</p><p>${el.restaurant.user_rating.aggregate_rating}</p><img src="${el.restaurant.featured_image}"><p>${el.restaurant.location.address}</p></div>`
  }
} */
    /* const showMediumPrice = () => {
  if (price >= 41 && price <= 59) {
    document.querySelector(
      ".container"
    ).innerHTML += `<div class="boxes"><h2>${el.restaurant.name}</h2><p>${el.restaurant.average_cost_for_two}</p><p>${el.restaurant.user_rating.aggregate_rating}</p><img src="${el.restaurant.featured_image}"><p>${el.restaurant.location.address}</p></div>`
  }
} */
    /* const showHighPrice = () => {
  if (price >= 60) {
    document.querySelector(
      ".container"
    ).innerHTML += `<div class="boxes"><h2>${el.restaurant.name}</h2><p>${el.restaurant.average_cost_for_two}</p><p>${el.restaurant.user_rating.aggregate_rating}</p><img src="${el.restaurant.featured_image}"><p>${el.restaurant.location.address}</p></div>`
  }
} */
    /* document.getElementById("lowPrice").addEventListener("click", showLowPrice)
document
  .getElementById("mediumPrice")
  .addEventListener("click", showMediumPrice)
document.getElementById("highPrice").addEventListener("click", showHighPrice)' */

    //})

    // Adding event listeners to buttons
    document.getElementById("priceUp").addEventListener("click", () => {
      sortUp("cost")
    })
    document.getElementById("priceDown").addEventListener("click", () => {
      sortDown("cost")
    })
    document.getElementById("nameUp").addEventListener("click", () => {
      sortUp("name")
    })
    document.getElementById("nameDown").addEventListener("click", () => {
      sortDown("name")
    })
    document.getElementById("rateUp").addEventListener("click", () => {
      sortUp("rating")
    })
    document.getElementById("rateDown").addEventListener("click", () => {
      sortDown("rating")
    })
    document.getElementById("delivery").addEventListener("click", () => {
      filterOptions("delivery")
    })
    document.getElementById("bookOnline").addEventListener("click", () => {
      filterOptions("booking")
    })
    document.getElementById("clearFilters").addEventListener("click", () => {
      printRestaurants()
    })
    printRestaurants()
  })

//Universal filter function for boolean values (0/1 options)
const filterOptions = option => {
  printRestaurants(
    restaurants.filter(el => {
      return el[option] === 1
    })
  )
}

//Universal incr sorting function
const sortUp = key => {
  restaurants.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0))
  printRestaurants()
}

//Universal decr sorting function
const sortDown = key => {
  restaurants.sort((a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0))
  printRestaurants()
}

//Universal rendering function with default parameter asign to local restaurants array
const printRestaurants = (arr = restaurants) => {
  container.innerHTML = ""
  arr.forEach(el => {
    console.log(el)
    container.innerHTML += `<div class="boxes"><img src="${el.image}">
    <h2>${el.name}</h2> 
 
    <div class="vendor-info">
   <img id="dollar" src="./Images/${el.dollar}.png">

   <div><img id="star" src="./Images/rating.png">${el.rating}/5</div>
    </div>
    Average Price for two $${el.cost}
    <p>${el.address}</p>
</div>`

    // container.innerHTML += `
    //   <div class="boxes">
    //     <h2>${el.name}</h2>
    //     <p>${el.cost}</p>
    //     <p>${el.rating}</p>
    //     <img src="${el.image}">
    //     <p>${el.address}</p>
    //   </div>`
  })
}
