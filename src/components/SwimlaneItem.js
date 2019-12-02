import App from "../App.js";

export default class SwimlaneItem extends lng.Component{
    static _template(){
        return {
            rect: true, color: 0xffffffff, w: 350, h: 200, scale:1,
            transitions:{scale:{duration:0.3, delay:0.05}}
        }
    }

    set item(v){
        this._item = v;
        this.patch({
            src:App.getPath(`${v.path}`)
        });
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1.05);
    }

    _unfocus(){
        this.setSmooth("scale",0.95);
    }

    static _states(){
        return [

        ]
    }

    static get width(){
        return 350;
    }

    static get height(){
        return 200;
    }
}