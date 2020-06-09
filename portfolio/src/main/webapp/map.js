const map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 43, lng: 169},
  zoom: 2,
});

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

const changeContent = async (path) => {
  let content = await fetch(path);
  document.getElementById('intro-by-place').innerHTML = content;
}
