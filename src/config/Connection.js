'use strict';
const localhost       = "10.20.3.227:8283",
      staging         = "delgate.mobilytedev.com",
      akanksha        = "10.20.3.223:8283",
      live            = "dgwus2devapi01.westus2.cloudapp.azure.com:8283";

const running_url   = staging,
    http_url        = `http://${running_url}`,
    socket_url      = `ws://${running_url}/websocket`,
    apiBase_url     = `http://${running_url}/api/`,
    staticPagesUrl  = `http://${running_url}/`,
    mediaBase_url   = `http://${running_url}/`;

export default class Connection {
    static getResturl() {
        return apiBase_url;
    };

    static getSocketResturl() {
        return socket_url;
    };

    static getBaseUrl() {
        return http_url;
    };

    static getMedia(_id) {
        return mediaBase_url;
    }

    static getStaticPage(url){
        return staticPagesUrl + url;
    }
}