(function() {
  
  let myMap;
   
  const init = () => {
   myMap = new ymaps.Map("map", {
     center: [55.796289, 49.108795],
     zoom: 14,
     controls: []
   });
  
   const coords = [
    [55.780809, 49.132161],
    [55.791420, 49.133837],
    [55.786976, 49.113330],
    [55.806137, 49.190331],
  ];
  
    const myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: 'images/marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });
  
    for (let i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i]));
    }
    
    myMap.geoObjects.add(myCollection);
    
    myMap.behaviors.disable('scrollZoom');
  };
   
  ymaps.ready(init);
})()