export default class Api{
    getAppData(){
        const promises = [
            this._getVOD()
        ];
        return Promise.all(promises);
    }

    _getVOD(){
        return fetch("./static/vod-dummydata.json").then((response)=>{
            return response.json();
        }).then((data)=>{
            return {ref:"VOD", data};
        });
    }
}

