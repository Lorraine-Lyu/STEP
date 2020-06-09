// The embedded Google Map for my introduction page
const map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 43, lng: 169},
  zoom: 2,
});

// All markers for locations meaningful to me.
// Each marker has corresponding onclick event
// which updates html content in 'intro-by-location' div
const hometownMarker = new google.maps.Marker({
  position: {lat: 31.293463, lng: 120.666522},
  map: map,
  title: 'My Hometown',
});

hometownMarker.addListener('click', async () => {
  changeContent("/suzhou");
});

const smithCollegeMarker = new google.maps.Marker({
  position: {lat: 42.319266, lng: -72.642447},
  map: map,
  title: 'Smith College',
});

smithCollegeMarker.addListener('click', async () => {
  changeContent("/smith")
});

const RiceUnivMarker = new google.maps.Marker({
  position: {lat: 29.717296, lng: -95.399418},
  map: map,
  title: 'Rice University'
});

RiceUnivMarker.addListener('click', async () => {
  changeContent("/rice")
});

/**
 * The onclick event handler for all markers
 * which sends request to backend and for corresponding html.
 */
const changeContent = async (path) => {
  let introByPlace;
  try {
    introByPlace = await fetch(path);
  } catch (e) {
    alert("Can't get requested content from server");
    console.log(e);
    return;
  }  
  let content;
  try {
    content = await introByPlace.text();
    document.getElementById('intro-by-place').innerHTML = content;
  } catch (e) {
    alert("Cannot parse reponse from server.");
    console.log(e);
  }
}
