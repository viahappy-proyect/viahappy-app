const searchBtn = document.getElementById('search')
const searchPrevBtn = document.getElementById('previous-search')

window.onload = () => {
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 40.3922949, lng: -3.6985541000000004 }

    });

    searchBtn.onclick = () => {
        const city = document.getElementById("place-input").value
        const business = document.getElementById('select-option').value
       
        axios.get('https://viahappy.herokuapp.com/auth/api/search', { params: { city, business } })

            .then(response => {
                console.log("hollllaaaa")
                console.log('yelp response.data',response.data)

                let locations = extractCoordinates(response.data)

                let center = findCenter(response.data)

                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: center

                });
                //{ lat: 40.3922949, lng: -3.6985541000000004 }
                let markers = locations.map(function (location, i) {
                    return new google.maps.Marker({
                        position: location,

                    });
                });

                let names = extractNames(response.data)
                
                let markerCluster = new MarkerClusterer(map, markers,
                    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

            })
            .catch(err => console.log(err))

    }

    function extractCoordinates(hotels_found) {
        let locationsCoordenates = []
        let latitude
        let longitude
        let count = 0
        let name
        for (let i = 0; i < hotels_found.businesses.length; i++) {
            let marker = {}
            marker.lat = hotels_found.businesses[i].coordinates.latitude
            marker.lng = hotels_found.businesses[i].coordinates.longitude
            marker.title = hotels_found.businesses[i].name
            locationsCoordenates.push(marker)
            count++
        }
        //console.log(`A total of ${count} were found!!`)
        //console.log(locations)
        return locationsCoordenates
    }

    function extractNames(hotels_found) {
        let locationsNames = []
        let count = 0
        let name
        for (let i = 0; i < hotels_found.businesses.length; i++) {
            locationsNames.push(hotels_found.businesses[i].name)
            count++
        }
        //console.log(`A total of ${count} were found!!`)
        //console.log(locations)
        return locationsNames
    }

    function findCenter(hotels_found) {
        center = {
            lat: hotels_found.region.center.latitude,
            lng: hotels_found.region.center.longitude
        }
        return center
    }
}


