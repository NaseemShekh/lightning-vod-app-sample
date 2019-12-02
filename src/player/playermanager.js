import App from "../App.js";
const events = ['timeupdate',
    'error',
    'ended',
    'loadeddata',
    'canplay',
    'play',
    'playing',
    'pause',
    'loadstart',
    'seeking',
    'seeked',
    'encrypted'];

export default class Player extends lng.Component {

    static _template() {
        return {
            ProgressBar: {
                // player control
                rect: true, w: 800, h: 10, x: 100, y: 600, color: 0xff000000
            },
            Play: {
                // player control
                x: 200, y: 550, flex:{direction:"row"}, w: 100
            },
            Stop: {
                // player control
                x: 300, y: 550, flex:{direction:"row"}, w: 100
            }
        }
    }

    _init(){
        this.signal("playerLoaded");
    }

    _handleEnter(){
        this.fireAncestors("$onSelected",{item:this.active.item});
    }

    getMediaplayerSettings() {
        return {
            stream: { src: "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8" }
        }
    }

    // getMediaplayerSettings can return an object
    // the mediaplayer expects an object with a stream property
    // this method will be invoked on every focus path change or you can force it
    // via: this.application.updateFocusSettings()


    // this will be invoked on timeupdate
    $mediaplayerProgress({ currentTime, duration }) {

    }

    // this will be invoked when the video ends
    $mediaplayerEnded() {

    }

    // this will be invoked when the video starts playing
    $mediaplayerPlay() {

    }

    // this will be invoked when the video pauses
    $mediaplayerPause() {

    }

    // this will be invoked when the video stops
    $mediaplayerStop() {

    }

    // this will be invoked when the video raises an error
    $mediaplayerError() {

    }
}