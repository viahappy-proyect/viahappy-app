

window.onload = () => {
    let locations = []
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 40.3922949, lng: -3.6985541000000004 }

    });

    axios.get('http://localhost:3000/auth/api/search')
        .then(response => {

            locations = extractCoordinates(response.data)
        })
        .catch(err => console.log(err))


    function extractCoordinates(hotels_found) {
        let locations = []
        let latitude
        let longitude
        let count = 0
        let name
        for (let i = 0; i < hotels_found.businesses.length; i++) {
            let marker = {}
            marker.lat = hotels_found.businesses[i].coordinates.latitude
            marker.lng = hotels_found.businesses[i].coordinates.longitude
            marker.title = hotels_found.businesses[i].name
            locations.push(marker)
            count++
        }
        console.log(`A total of ${count} were found!!`)
        return locations
    }


    // if (navigator.geolocation) {

    //     navigator.geolocation.getCurrentPosition(function (position) {

    //         const center = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         //console.log('center: ', center)

    //         let map = new google.maps.Map(document.getElementById('map'), {
    //             zoom: 13,
    //             center: center

    //         });

    //         let markers = locations.map(function (location, i) {
    //             return new google.maps.Marker({
    //                 position: location,
    //                 label: 'H'
    //             });
    //         });


    //         let markerCluster = new MarkerClusterer(map, markers,
    //             { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    //     },
    //         function () {
    //             // If something goes wrong
    //             console.log('Error in the geolocation service.');
    //         });
    // } else {

    //     // console.log('center: ', center)
    //     let map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 13,
    //         center: { lat: 40.3922949, lng: -3.6985541000000004 }

    //     });

    //     let markers = locations.map(function (location, i) {
    //         return new google.maps.Marker({
    //             position: location,
    //             label: 'H'
    //         });
    //     });


    //     let markerCluster = new MarkerClusterer(map, markers,
    //         { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    // }
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



