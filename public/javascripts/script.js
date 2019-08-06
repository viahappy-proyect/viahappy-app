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

        axios.get('http://localhost:3000/auth/api/search', { params: { city, business } })

            .then(response => {
                //console.log(response.data)
                let locations = extractCoordinates(response.data)

                let center = findCenter(response.data)
                //console.log(locations)
                // console.log('center: ', center)
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


                let markerCluster = new MarkerClusterer(map, markers,
                    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


            })
            .catch(err => console.log(err))

    }

    searchPrevBtn.onclick = () => {
        const city = document.getElementById("select-prev-cit").value
        const business = document.getElementById('select-prev-business').value
        console.log(city, busines, 'Aqui modafuka')
        axios.get('http://localhost:3000/auth/api/search', { params: { city, business } })

            .then(response => {
                //console.log(response.data)
                let locations = extractCoordinates(response.data)

                let center = findCenter(response.data)
                //console.log(locations)
                // console.log('center: ', center)
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

    function findCenter(hotels_found) {
        center = {
            lat: hotels_found.region.center.latitude,
            lng: hotels_found.region.center.longitude
        }
        return center
    }
}


