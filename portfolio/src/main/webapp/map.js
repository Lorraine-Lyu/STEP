/** 
 *  The coordinate class which registers information for 
 *  each marker. 
 */
class Coordinate {
  
  constructor(latitude, longitude, title, id) {
    /** @member {float} latitude */
    this.latitude = latitude;
    /** @member {float} longitude */
    this.longitude = longitude;
    /** @member {String} title the note on the marker*/
    this.title = title;
    /** @member {id} id the div id associated with this Coordinate*/
    this.id = id;
  }
}

class MapHandler {

  // The coordinates for map center.
  static MAP_CENTER = new Coordinate(43, 169, '', '');
  // The coordinates for Suzhou, related div id and marker title.
  static SUZHOU_COORD = 
      new Coordinate(31.293463, 120.666522, 'My Hometown', 'suzhou');
  // The coordinates for Smith College, related div id and marker title.
  static SMITH_COORD = 
      new Coordinate(42.319266, -72.642447, 'Smith College', 'smith');
  // The coordinates for Rice University, related div id and marker title.
  static RICE_COORD = 
      new Coordinate(29.717296, -95.399418, 'Rice University', 'rice');

  constructor(document) {
    /** @member {String} previousSection_ the id of the div on display */
    this.previousSection_ = undefined;
    /** @member {HTML document} document_ the current html document */
    this.document_ = document;

    // The embedded Google Map for my introduction page.
    const map = new google.maps.Map(this.document_.getElementById('map'), {
      center: {
                 lat: MapHandler.MAP_CENTER.latitude, 
                 lng: MapHandler.MAP_CENTER.longitude,
               },
      zoom: 2,
    }); 

    // All markers for locations meaningful to me.
    // Each marker has corresponding onclick event
    // which updates html content in 'intro-by-location' div.
    const hometownMarker = new google.maps.Marker({
      position: {
                  lat: MapHandler.SUZHOU_COORD.latitude, 
                  lng: MapHandler.SUZHOU_COORD.longitude,
                },
      map: map,
      title: MapHandler.SUZHOU_COORD.title,
    });

    const smithCollegeMarker = new google.maps.Marker({
      position: {
                  lat: MapHandler.SMITH_COORD.latitude, 
                  lng: MapHandler.SMITH_COORD.longitude,
                },
      map: map,
      title: MapHandler.SMITH_COORD.title,
    });

    const riceUnivMarker = new google.maps.Marker({
      position: {
                  lat: MapHandler.RICE_COORD.latitude, 
                  lng: MapHandler.RICE_COORD.longitude,
                },
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
    if (this.previousSection_ != undefined) {
      this.document_.getElementById(this.previousSection_)
                    .classList
                    .remove("show-intro");
    }
    this.document_.getElementById(id)
                  .classList
                  .add('show-intro');
    this.previousSection_ = id;
  };
}

window.onload = () => {
  const mapHandler = new MapHandler(document);
}

