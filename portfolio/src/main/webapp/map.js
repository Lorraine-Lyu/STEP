class MapHandler {
  // The coordinates for all markers and their related properties.
  static MAP_CENTER = {
    lat: 43,
    lng: 169,
  };

  static SUZHOU_COORD = {
    lat: 31.293463,
    lng: 120.666522,
    title: 'My Hometown',
    id: 'suzhou',
  };

  static SMITH_COORD = {
    lat: 42.319266,
    lng: -72.642447,
    title: 'Smith College',
    id: 'smith',
  };

  static RICE_COORD = {
    lat: 29.717296,
    lng: -95.399418,
    title: 'Rice University',
    id: 'rice',
  };

  constructor(document) {
    this.previousSection = undefined;
    this.document = document;

    // The embedded Google Map for my introduction page.
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: MapHandler.MAP_CENTER.lat, lng: MapHandler.MAP_CENTER.lng},
      zoom: 2,
    }); 

    // All markers for locations meaningful to me.
    // Each marker has corresponding onclick event
    // which updates html content in 'intro-by-location' div.
    const hometownMarker = new google.maps.Marker({
      position: {lat: MapHandler.SUZHOU_COORD.lat, lng: MapHandler.SUZHOU_COORD.lng},
      map: map,
      title: MapHandler.SUZHOU_COORD.title,
    });

    const smithCollegeMarker = new google.maps.Marker({
      position: {lat: MapHandler.SMITH_COORD.lat, lng: MapHandler.SMITH_COORD.lng},
      map: map,
      title: MapHandler.SMITH_COORD.title,
    });

    const riceUnivMarker = new google.maps.Marker({
      position: {lat: MapHandler.RICE_COORD.lat, lng: MapHandler.RICE_COORD.lng},
      map: map,
      title: MapHandler.RICE_COORD.title,
    });

    hometownMarker.addListener('click', 
                               () => this.changeContent(MapHandler.SUZHOU_COORD.id));

    smithCollegeMarker.addListener('click', 
                                   () => this.changeContent(MapHandler.SMITH_COORD.id));

    riceUnivMarker.addListener('click', 
                               () => this.changeContent(MapHandler.RICE_COORD.id));
  }

  /**
   * The onclick event handler for all markers,
   * which sends request to backend and for corresponding html.
   */
  changeContent(id) {
    if (this.previousSection != undefined) {
      this.document.getElementById(this.previousSection)
                   .classList
                   .remove("show-intro");
    }
    this.document.getElementById(id)
                 .classList
                 .add('show-intro');
    this.previousSection = id;
  };
}

window.onload = () => {
  const mapHandler = new MapHandler(document);
}

