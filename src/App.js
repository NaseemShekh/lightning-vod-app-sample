import Api from "../lib/Api.js";
import Splash from "./loader/Splash.js";
import Loader from "./loader/Loader.js";
import Browse from "./browse/Browse.js";
import Player from "./player/playermanager.js"
import Menu from "./menu/Menu.js";

export default class App extends ux.App {

    static getFonts() {
        return [
            {family: 'RobotoBold', url: App.getPath('fonts/Roboto-Bold.ttf'), descriptors: {}},
            {family: 'RobotoRegular', url: App.getPath('fonts/Roboto-Regular.ttf'), descriptors: {}}
        ];
    }

    static _template() {
        return {
            Splash:{
                type: Splash, signals:{animationFinished: true}, alpha: 0
            },
            VOD:{
                type: Browse, x: 100, y: 150, alpha: 0
            },
            Menu:{
                type: Menu, x: 0, y: 50, w: 1180, alpha: 1, flex:{ direction: 'row', paddingTop: 35, paddingBottom: 30, paddingLeft: 100}, rect: true, color:  0xFF000000, signals:{select: true}
            },
            Player: {
                type: Player, signals:{playerLoaded:"_loaded"}, alpha: 0.001
            },
            Loader:{
                type: Loader, alpha: 0
            }
        };
    }

    _construct(){
        this._api = new Api();
    }

    _init(){
        this._setState("Splash");
    }

    $api(){
        return this._api;
    }

    _setFocusSettings(settings) {
        if(this.state === "Playing") {
            settings.mediaplayer.consumer = this.tag("Player")
        }
    }

    $onSelected({item}){
        console.log("Enter clicked");
            this._setState("Playing");
            this.tag("Player").asset = item;
    }

    _populate(data){
        data.forEach((props)=>{
            this.tag(props.ref).data = props.data;
        });
    }

    _handleUp(){
        this._setState("Menu");
    }

    static _states(){
        return [
            class Splash extends this{
                $enter(){
                    this.tag("Splash").setSmooth("alpha",1);
                    this._api.getAppData().then((data)=>{
                        this.tag("Splash").startAnimation();
                        this._populate(data);
                    })
                }
                animationFinished(){
                    this._setState("VOD");
                    this.tag("Menu").setSmooth("y", 0);
                }
            },
            class Loading extends this {
                _captureKey(){
                    // capture
                }
                $enter({prevState}){
                    this._appReturnState = prevState;
                    this.tag("Loader").setSmooth("alpha",1);
                }
                $exit(){
                    this.tag("Loader").setSmooth("alpha",0);
                }
                _loaded(){
                    setTimeout(()=>{
                        this._setState("Player");
                    },2000);
                }
            },
            class Menu extends this {
                $enter({prevState}){
                    this._menuReturnState = prevState;
                    this.tag("Menu").setSmooth("alpha",1);
                }
                $exit(){
                    this.tag("Menu").setSmooth("alpha",1);
                }
                _getFocused(){
                    return this.tag("Menu");
                }
                _handleDown(){
                    this._setState(this._menuReturnState);
                }
                select({item}){
                    const {ref} = item;
                    if(this.tag(ref)){
                        this.tag(this._menuReturnState).setSmooth("alpha",1);
                        this._setState(ref);
                    }
                }
            },
            class VOD extends this{
                $enter(){
                    this.tag("VOD").setSmooth("alpha",1);
                }
                $exit({newState}){
                    this.tag("VOD").setSmooth("alpha",newState==="Menu"?1:1);
                }
                _getFocused(){
                    return this.tag("VOD");
                }
            },
            class Playing extends this {
                $enter(){
                    this.tag("Player").setSmooth("alpha", 1);
                }
                $exit(){
                    this.tag("Player").setSmooth("alpha", 0.001);
                }
                _handleBack(){
                    this._setState(this._appReturnState);
                }
                // delegate focuspath to the player
                _getFocused() {
                    return this.tag("Player")
                }
            }
        ]
    }
}






