mapboxgl.accessToken = 'pk.eyJ1IjoibWhhdGlrb3YiLCJhIjoiY2t1b25ob2NhMWVwMzJubW9obTUzYm8wZCJ9.qImPGvgoZEKNXInteRyqkQ';
		const map = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/light-v10', // style URL
		center: [2.3364, 48.86091], // starting position [lng, lat]
		zoom: 15.75 // starting zoom
		});
        
        const marker1 = new mapboxgl.Marker({
            color: "#171717",
            draggable: false
          })
            .setLngLat([2.3364, 48.86091])
            .addTo(map);
        const marker2 = new mapboxgl.Marker({
            color: "#464646",
            draggable: false
            })
            .setLngLat([2.3333, 48.8602])
            .addTo(map);
        const marker3 = new mapboxgl.Marker({
            color: "#464646",
            draggable: false
            })
            .setLngLat([2.3397, 48.8607])
            .addTo(map);
        const marker4 = new mapboxgl.Marker({
            color: "#464646",
            draggable: false
            })
            .setLngLat([2.3330, 48.8619])
            .addTo(map);
        const marker5 = new mapboxgl.Marker({
            color: "#464646",
            draggable: false
            })
            .setLngLat([2.3365, 48.8625])
            .addTo(map);

map.addControl(new mapboxgl.NavigationControl());