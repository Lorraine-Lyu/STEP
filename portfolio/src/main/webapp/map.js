// The coordinates for all markers and their related properties
const MAP_CENTER = {
  lat: 43,
  lng: 169,
};

const SUZHOU_COORD = {
  lat: 31.293463,
  lng: 120.666522,
  title: 'My Hometown',
  path: '/suzhou',
};

const SMITH_COORD = {
  lat: 42.319266,
  lng: -72.642447,
  title: 'Smith College',
  path: '/smith',
};

const RICE_COORD = {
  lat: 29.717296,
  lng: -95.399418,
  title: 'Rice University',
  path: '/rice',
};

// The embedded Google Map for my introduction page
const map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: MAP_CENTER.lat, lng: MAP_CENTER.lng},
  zoom: 2,
});

// All markers for locations meaningful to me.
// Each marker has corresponding onclick event
// which updates html content in 'intro-by-location' div
const hometownMarker = new google.maps.Marker({
  position: {lat: SUZHOU_COORD.lat, lng: SUZHOU_COORD.lng},
  map: map,
  title: SUZHOU_COORD.title,
});

hometownMarker.addListener('click', async () => {
  changeContent(SUZHOU_COORD.path);
});

const smithCollegeMarker = new google.maps.Marker({
  position: {lat: SMITH_COORD.lat, lng: SMITH_COORD.lng},
  map: map,
  title: SMITH_COORD.title,
});

smithCollegeMarker.addListener('click', async () => {
  changeContent(SMITH_COORD.path);
});

const RiceUnivMarker = new google.maps.Marker({
  position: {lat: RICE_COORD.lat, lng: RICE_COORD.lng},
  map: map,
  title: RICE_COORD.title,
});

RiceUnivMarker.addListener('click', async () => {
  changeContent(RICE_COORD.path);
});

/**
 * The onclick event handler for all markers
 * which sends request to backend and for corresponding html.
 */
const changeContent = async (path) => {
  let content = await fetch(path);
  document.getElementById('intro-by-place').innerHTML = content;
};
