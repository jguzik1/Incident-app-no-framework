

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
                            <div id="map" style="height: 100%; width: 100%"></div>
                        </div>
                        `;
            console.log("siema")
            document.addEventListener('DOMContentLoaded', function () {
                const mapElement = document.getElementById('map');
                if (!mapElement) {
                    console.error('Map element not found!');
                    return;
                }

                const map = new google.maps.Map(mapElement, {
                    center: { lat: 50.065200, lng: 19.96500 },
                    zoom: 15
                });

                console.log("Map initialized");

                // Simulate fetching data from a service
                fetchMarkersData().then(markers => {
                    console.log('Markers fetched:', markers);
                    addMarkersToMap(map, markers);
                }).catch(error => {
                    console.error('Error fetching markers:', error);
                });
            });

            function fetchMarkersData() {
                // Simulate an HTTP request to fetch marker data
                return new Promise((resolve, reject) => {
                    // Replace this with actual data fetching logic
                    const markers = [
                        {
                            id: 1,
                            latitude: 50.065200,
                            longitude: 19.94500,
                            incidentName: 'Incident 1',
                            streetNumber: '123',
                            priority: 'High',
                            requestedBy: 'User A',
                            date: '2023-10-01',
                            time: '10:00',
                            isResolved: false
                        },
                        // Add more marker objects as needed
                    ];
                    resolve(markers);
                });
            }

            function addMarkersToMap(map, markers) {
                markers.forEach(markerData => {
                    const marker = new google.maps.Marker({
                        position: { lat: markerData.latitude, lng: markerData.longitude },
                        map: map,
                        title: markerData.incidentName,
                        icon: markerData.isResolved ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : undefined
                    });

                    const contentString = `
                                <div>
                                  <h3>${markerData.incidentName} (ID: ${markerData.id})</h3>
                                  <p><strong>Street Number:</strong> ${markerData.streetNumber}</p>
                                  <p><strong>Priority:</strong> ${markerData.priority}</p>
                                  <p><strong>Requested By:</strong> ${markerData.requestedBy}</p>
                                  <p><strong>Date:</strong> ${markerData.date}</p>
                                  <p><strong>Time:</strong> ${markerData.time}</p>
                                  <p><strong>Resolved:</strong> ${markerData.isResolved ? 'Yes' : 'No'}</p>
                                </div>
                              `;

                    const infoWindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });
                });
            }
            break;
        case 'contact-us':
            content.innerHTML = `
                <div class="container mt-5">
                <h2>Contact Us</h2>
                <form id="contact-form">
                <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter your email" required>
                </div>
                <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <select class="form-select" id="category" required>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Report Bug</option>
                </select>
                </div>
                <div class="mb-3">
                <label for="message" class="form-label">Your Message</label>
                <textarea class="form-control" id="message" rows="4" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </div>
            `;
            console.log("siema2")
            setTimeout(addEventListenerToForm, 100);
            break;
        default:
            content.innerHTML = '<h1>Page Not Found</h1>';
    }
}

function addEventListenerToForm() {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const category = document.getElementById('category').value;
        const message = document.getElementById('message').value;

        console.log({
            email,
            category,
            message
        });

        alert("Form submitted successfully!");
    });
}
