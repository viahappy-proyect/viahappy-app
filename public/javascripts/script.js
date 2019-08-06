const searchBtn = document.getElementById('search')

window.onload = () => {
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 40.3922949, lng: -3.6985541000000004 }

    });


    searchBtn.onclick = (e) => {
        const city = document.getElementById("place-input").value
        //console.log(city)
        axios.get('http://localhost:3000/auth/api/search', { params: city })

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
                        label: 'H'
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

    // let locations = [{ lat: 40.42038, lng: -3.70459, title: 'Hotel Atlántico' },
    // { lat: 40.41445, lng: -3.7014, title: 'Me  by Melia' },
    // {
    //     lat: 40.4148852730215,
    //     lng: -3.69513290822735,
    //     title: 'The Westin Palace, Madrid'
    // },
    // {
    //     lat: 40.4363447,
    //     lng: -3.6902144,
    //     title: 'InterContinental Madrid'
    // },
    // {
    //     lat: 40.4098896733336,
    //     lng: -3.69392753525492,
    //     title: 'hotel Paseo del Arte'
    // },
    // {
    //     lat: 40.4177785479465,
    //     lng: -3.68922696278787,
    //     title: 'Hotel Palacio del Retiro, Autograph Collection'
    // },
    // {
    //     lat: 40.4078192176343,
    //     lng: -3.70066864489544,
    //     title: 'IBIS BUDGET'
    // },
    // {
    //     lat: 40.420005,
    //     lng: -3.70375648140907,
    //     title: 'Hotel Hyatt Centric'
    // },
    // { lat: 40.42731, lng: -3.7141, title: 'Meliá  Princesa' },
    // {
    //     lat: 40.4518972,
    //     lng: -3.5859702,
    //     title: 'Hilton Madrid Airport'
    // },
    // { lat: 40.409005, lng: -3.6925688, title: '60 BALCONIES' },
    // { lat: 40.4071808, lng: -3.7000201, title: 'Artrip' },
    // {
    //     lat: 40.4152135955581,
    //     lng: -3.69677917729814,
    //     title: 'DoubleTree by Hilton Madrid - Prado'
    // },
    // {
    //     lat: 40.4266005313884,
    //     lng: -3.69648793825969,
    //     title: 'Petit Palace Santa Barbara'
    // },
    // {
    //     lat: 40.4394287,
    //     lng: -3.6321296,
    //     title: 'Holiday Inn Madrid - Calle Alcala'
    // },
    // { lat: 40.4284592, lng: -3.6861999, title: 'Hotel Único Madrid' },
    // { lat: 40.4338843, lng: -3.7166286, title: 'Hostal Moncloa' },
    // {
    //     lat: 40.4270262101329,
    //     lng: -3.69806852327883,
    //     title: 'Hotel & Spa Urso'
    // },
    // { lat: 40.4337317, lng: -3.7175435, title: 'Hotel Exe Moncloa' },
    // {
    //     lat: 40.4214310947474,
    //     lng: -3.72176870185547,
    //     title: 'Hotel Acta Madfor'
    // }]

}




    // initMap()



