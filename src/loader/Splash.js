import App from "../App.js";

export default class Splash extends lng.Component{

    static _template(){
        return {
            Background:{
                src:App.getPath("background.png")
            },
        };
    }

    _init(){
        this._setState("Loading");
        this._createAnimations();
        this._register();
    }

    _createAnimations(){
        this._reveal = this.animation({
            duration:0.5, repeat: 0, delay:0.5, actions:[
                {t:'Background', p:'y', v:{0.20:0,1:0}},
            ]
        });
    }

    _register(){
        this._reveal.on("finish",()=>{
            this.signal("animationFinished");
        });
    }

    startAnimation(){
        this._start();
    }

    static _states(){
        return [
            class Loading extends this{
                _start(){
                    this._reveal.start();
                }
            },
            class Error extends this{
                $enter(){
                    // signal error & retry
                }
                $exit(){
                    // signal that we exit Error state
                }
            }
        ];
    }
}