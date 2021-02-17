require('dotenv').config({ path: './../../../.env' });

const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

export const loadMapAPI = () => {
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API}`;
    const scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i += 1) {
        if (scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapsURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
};
