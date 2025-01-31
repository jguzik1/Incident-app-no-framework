function navigateTo(page) {
    const content = document.getElementById('content');
    switch (page) {
        case 'home':
            content.innerHTML = `
                <div class="container-fluid">
                    <div class="row flex-grow-1">
                        <!-- Section 1 -->
                        <div class="col-md-6 d-flex flex-column justify-content-center align-items-start bg-light p-4">
                            <h2>About Application</h2>
                            <p>
                                The application allows users to report road events and visualize them on a map. Users can submit details
                                of various incidents, which are then displayed with precise locations using geocoding technology. The app
                                integrates with a Geocoding API to determine and plot the locations of reported events on an interactive
                                map.
                                Built with Angular, the application offers a responsive and user-friendly interface, ensuring seamless
                                interaction across different devices. Its core functionality includes submitting event details, real-time
                                map visualization, and location management powered by geospatial APIs. This tool is designed to improve
                                awareness and enhance road safety by providing an intuitive platform for reporting and tracking road events.
                            </p>
                            <button class="btn btn-primary" onclick="navigateTo('addRequest')">Create a request</button>
                        </div>
                        <!-- Section 2 -->
                        <div class="col-md-6 p-0">
                            <img src="https://hips.hearstapps.com/roa.h-cdn.co/assets/16/39/1600x1070/gallery-1475251666-00-lead-gettyimages-523821065.jpg?resize=640:*"
                                alt="Photo cars" class="img-fluid rounded img-full">
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'addRequest':
            content.innerHTML = '<h1>Request an Incident</h1>';
            break;
        case 'map':
            content.innerHTML = `<div class="container-fluid">
                            <div id="map" style="height: 500px; width: 100%"></div>
                        </div>`;
            loadMap();
            break;
        case 'contact-us':
            content.innerHTML = '<h1>Contact Us</h1>';
            break;
        default:
            content.innerHTML = '<h1>Page Not Found</h1>';
    }
}

function loadMap() {
    // Wczytaj mapę po załadowaniu zawartości strony
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLs4RNEDm-xf2PmVnPYgN0Y0qJZcifUuk&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
}

function initMap() {
    // Inicjalizacja mapy
    const mapOptions = {
        center: { lat: 50.065200, lng: 19.96500 }, // Przykładowa lokalizacja - centrum
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Wczytaj dane markerów z pliku JSON
    fetch('markers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(markerData => {
                const marker = new google.maps.Marker({
                    position: { lat: markerData.latitude, lng: markerData.longitude },
                    map: map,
                    title: markerData.title
                });

                // Dodaj info window do markera, które wyświetli szczegóły
                const infoWindowContent = `
                    <div>
                        <h3>${markerData.title}</h3>
                        <p><strong>Incident Name:</strong> ${markerData.incidentName}</p>
                        <p><strong>Priority:</strong> ${markerData.priority}</p>
                        <p><strong>Requested By:</strong> ${markerData.requestedBy}</p>
                        <p><strong>Date:</strong> ${markerData.date}</p>
                        <p><strong>Time:</strong> ${markerData.time}</p>
                        <p><strong>Description:</strong> ${markerData.description}</p>
                        <p><strong>Resolved:</strong> ${markerData.isResolved ? 'Yes' : 'No'}</p>
                    </div>
                `;
                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                // Otwórz info window po kliknięciu w marker
                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Error loading markers:', error));
}