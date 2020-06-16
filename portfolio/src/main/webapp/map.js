/** 
 *  The coordinate class which stores information for 
 *  each marker. 
 */
class Coordinate {
  
  constructor(latitude, longitude, title, id) {
    /** @private @const {float} latitude */
    this.latitude_ = latitude;
    /** @private @const {float} longitude */
    this.longitude_ = longitude;
    /** @private @const {String} title the note on the marker*/
    this.title_ = title;
    /** 
     * @private @const {id} id the div id associated with this Coordinate */
    this.id_ = id;
  }

  /** @returns the latitude. */
  getLatitude() {
    return this.latitude_;
  }

  /** @returns the longitude. */
  getLongitude() {
    return this.longitude_;
  }

  /** @returns the title of marker. */
  getTitle() {
    return this.title_;
  }

  /** @returns the id of HTML div related to this coordinate */
  getId() {
    return this.id_;
  }
}

class MapHandler {

  /** The coordinates for map center. */
  static MAP_CENTER = new Coordinate(43, 169, '', '');
  /** The coordinates for Suzhou, related div id and marker title. */
  static SUZHOU_COORD = 
      new Coordinate(31.293463, 120.666522, 'My Hometown', 'suzhou');
  /** The coordinates for Smith College, related div id and marker title. */
  static SMITH_COORD = 
      new Coordinate(42.319266, -72.642447, 'Smith College', 'smith');
  /** The coordinates for Rice University, related div id and marker title. */
  static RICE_COORD = 
      new Coordinate(29.717296, -95.399418, 'Rice University', 'rice');

  constructor(document) {

    /** @private {String} previousSection_ the id of the div on display */
    this.previousSection_ = undefined;
    /** @private {HTML document} document_ the current html document */
    this.document_ = document;

    /** The embedded Google Map for my introduction page. */
    const map = new google.maps.Map(this.document_.getElementById('map'), {
      center: {
                 lat: MapHandler.MAP_CENTER.getLatitude(), 
                 lng: MapHandler.MAP_CENTER.getLongitude(),
               },
      zoom: 2,
    }); 

    /** The marker for Suzhou, Jiangsu, China. */
    const hometownMarker = new google.maps.Marker({
      position: {
                  lat: MapHandler.SUZHOU_COORD.getLatitude(), 
                  lng: MapHandler.SUZHOU_COORD.getLongitude(),
                },
      map: map,
      title: MapHandler.SUZHOU_COORD.getTitle(),
    });

    /** The marker for Smith College. */
    const smithCollegeMarker = new google.maps.Marker({
      position: {
                  lat: MapHandler.SMITH_COORD.getLatitude(), 
                  lng: MapHandler.SMITH_COORD.getLongitude(),
                },
      map: map,
      title: MapHandler.SMITH_COORD.getTitle(),
    });

    /** The marker for Rice University. */
    const riceUnivMarker = new google.maps.Marker({
      position: {
                  lat: MapHandler.RICE_COORD.getLatitude(), 
                  lng: MapHandler.RICE_COORD.getLongitude(),
                },
      map: map,
      title: MapHandler.RICE_COORD.getTitle(),
    });

    hometownMarker.addListener('click', 
                               () => this.changeContent(MapHandler.SUZHOU_COORD.getId()));

    smithCollegeMarker.addListener('click', 
                                   () => this.changeContent(MapHandler.SMITH_COORD.getId()));

    riceUnivMarker.addListener('click', 
                               () => this.changeContent(MapHandler.RICE_COORD.getId()));
  }

  /**
   * The onclick event handler for all markers,
   * which sends request to backend and for corresponding html.
   * @param {String} id the id of the next div element to be displayed.
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

