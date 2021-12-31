import ReactMapGl, {Marker, Popup} from "react-map-gl"
import {useState} from "react";
import getCenter from 'geolib/es/getCenter';

function Map({searchResults}) {

    const coordinates = searchResults.map( (item) => (
        {
            longitude: item.long,
            latitude: item.lat,
        }
    ))

    const center = getCenter(coordinates);

    const [viewPort, setViewPort] = useState({
        width: '100%',
        height: '100%',
        zoom: 11,
        latitude: center.latitude,
        longitude: center.longitude
    });

    const [selectedLocation, setSelectedLocation] = useState("");

    return (
        <ReactMapGl mapStyle='mapbox://styles/surajbisht/ckxot45yrded214pbtb3wklop'
                    mapboxApiAccessToken={process.env.map_key}
                    {...viewPort}
                    onViewportChange={ (nextViewPort) => setViewPort(nextViewPort) 
                    }>
                        {
                            searchResults.map( (item) => (
                                <div>
                                    <Marker onClick={ () => setSelectedLocation(item.title)} latitude={item.lat} longitude={item.long} offsetLeft={-10} offsetTop={-20}>
                                        <img className="h-5 cursor-pointer animate-bounce" src="https://i.dlpng.com/static/png/7187770_preview.png" />
                                    </Marker>

                                    { selectedLocation === item.title && 
                                        <Popup latitude={item.lat} longitude={item.long}
                                                closeOnClick={true}
                                                onClose={() => setSelectedLocation("") }>
                                            {item.title}
                                        </Popup>
                                    }
                                </div>
                            ))
                        }
                        
        </ReactMapGl>
    )
}

export default Map


