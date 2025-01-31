document.addEventListener("DOMContentLoaded", function() {
    navigateTo('home');
});
function navigateTo(page) {
    const content = document.getElementById('content');
    switch (page) {
        case 'home':
            content.innerHTML = `
                <div class="container-fluid container mt-5">
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
            content.innerHTML = `
                <div class="container mt-5">
                    <h2>Report an Incident</h2>
                    <form id="incident-form">
                        <div class="mb-3">
                            <label for="incident-name" class="form-label">Incident Name</label>
                            <input type="text" class="form-control" id="incident-name" placeholder="Enter incident name" required>
                        </div>
                        <div class="mb-3">
                            <label for="priority" class="form-label">Priority</label>
                            <select class="form-select" id="priority" required>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="requested-by" class="form-label">Requested By</label>
                            <input type="text" class="form-control" id="requested-by" placeholder="Enter your name" required>
                        </div>
                        <div class="mb-3">
                            <label for="date" class="form-label">Date</label>
                            <input type="date" class="form-control" id="date" required>
                        </div>
                        <div class="mb-3">
                            <label for="time" class="form-label">Time</label>
                            <input type="time" class="form-control" id="time" required>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" rows="3" placeholder="Enter description"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                        
            `;

            setTimeout(addEventListenerToIncidentForm, 100);
            break;
        case 'map':
            content.innerHTML = `
                <div class="container mt-5 d-flex justify-content-center">
                    <div id="map" style="height: 500px; width: 50em"></div>
                </div>

                <div class="container mt-4">
                    <h2>Search Incidents</h2>
                    <form id="search-form">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="search-id" class="form-label">Search by ID</label>
                                <input type="number" class="form-control" id="search-id" placeholder="Enter incident ID">
                            </div>
                            <div class="col-md-6">
                                <label for="search-priority" class="form-label">Search by Priority</label>
                                <select class="form-select" id="search-priority">
                                    <option value="">Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3">Search</button>
                    </form>

                    <div id="search-results" class="mt-4"></div>
                </div>
            `;
            
            loadMap();
            setTimeout(addEventListenerToSearchForm, 100);
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
            console.log("siema2 router działa")
            setTimeout(addEventListenerToForm, 100);
            break;
        default:
            content.innerHTML = '<h1>Page Not Found</h1>';
    }
}

function loadMap() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLs4RNEDm-xf2PmVnPYgN0Y0qJZcifUuk&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
}

function initMap() {
    const mapOptions = {
        center: { lat: 50.065200, lng: 19.96500 },
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    let localMarkers = JSON.parse(localStorage.getItem('markers')) || [];

    if (localMarkers.length === 0) {
        console.log("No incidents in localStorage, loading from JSON...");

        fetch('markers.json')
            .then(response => response.json())
            .then(jsonMarkers => {
                console.log("Fetched markers from JSON:", jsonMarkers);
                localStorage.setItem('markers', JSON.stringify(jsonMarkers));
                addMarkersToMap(jsonMarkers, map);
            })
            .catch(error => console.error('Error loading markers.json:', error));
    } else {
        console.log("Loading incidents from localStorage.");
        addMarkersToMap(localMarkers, map);
    }
}


function addMarkersToMap(markers, map) {
    if (markers.length === 0) {
        console.warn("No markers to display.");
        return;
    }

    markers.forEach(markerData => {
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(markerData.latitude), lng: parseFloat(markerData.longitude) },
            map: map,
            title: markerData.title
        });

        const infoWindowContent = `
            <div>
                <h3>${markerData.title}</h3>
                <p><strong>Incident Name:</strong> ${markerData.incidentName}</p>
                <p><strong>Priority:</strong> ${markerData.priority}</p>
                <p><strong>Requested By:</strong> ${markerData.requestedBy}</p>
                <p><strong>Date:</strong> ${markerData.date}</p>
                <p><strong>Time:</strong> ${markerData.time}</p>
                <p><strong>Description:</strong> ${markerData.description || "No description available"}</p>
                <p><strong>Resolved:</strong> ${markerData.isResolved ? 'Yes' : 'No'}</p>
            </div>
        `;
        const infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    });
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

        const feedback = { email, category, message };

        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.push(feedback);

        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        console.log("Feedback saved:", feedback);
        alert("Feedback submitted successfully!");
    });
}


function addEventListenerToIncidentForm() {
    const form = document.getElementById('incident-form');
    if (!form) {
        console.error("Incident form not found!");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const incidentName = document.getElementById('incident-name').value;
        const priority = document.getElementById('priority').value;
        const requestedBy = document.getElementById('requested-by').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const description = document.getElementById('description').value;

        let markers = JSON.parse(localStorage.getItem('markers')) || [];
        let newId = markers.length > 0 ? markers[markers.length - 1].id + 1 : 1;

        const latitude = 50.065200 + (Math.random() * 0.02 - 0.01);
        const longitude = 19.965000 + (Math.random() * 0.02 - 0.01);

        const newMarker = {
            id: newId,
            latitude,
            longitude,
            title: incidentName,
            description: description || "No description provided",
            incidentName,
            priority,
            requestedBy,
            date,
            time,
            isResolved: false
        };

        markers.push(newMarker);
        localStorage.setItem('markers', JSON.stringify(markers));

        console.log("Incident and marker saved:", newMarker);
        alert("Incident submitted successfully!");
    });
}


function addEventListenerToSearchForm() {
    const form = document.getElementById('search-form');
    if (!form) {
        console.error("Search form not found!");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchId = document.getElementById('search-id').value.trim();
        const searchPriority = document.getElementById('search-priority').value.trim();

        let markers = JSON.parse(localStorage.getItem('markers')) || [];
        
        let filteredIncidents = markers;

        if (searchId) {
            filteredIncidents = filteredIncidents.filter(incident => incident.id == searchId);
        }

        if (searchPriority) {
            filteredIncidents = filteredIncidents.filter(incident => incident.priority === searchPriority);
        }

        displaySearchResults(filteredIncidents);
    });
}


function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
        resultsContainer.innerHTML = `<p class="text-danger">No incidents found.</p>`;
        return;
    }

    let resultsHTML = "<h3>Search Results:</h3><ul class='list-group'>";
    results.forEach(incident => {
        resultsHTML += `
            <li class="list-group-item">
                <strong>ID:</strong> ${incident.id} |
                <strong>Incident:</strong> ${incident.incidentName} |
                <strong>Priority:</strong> ${incident.priority} |
                <strong>Requested By:</strong> ${incident.requestedBy}
            </li>
        `;
    });
    resultsHTML += "</ul>";

    resultsContainer.innerHTML = resultsHTML;
}
