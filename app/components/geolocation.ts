export const ParseDMS= (latitude:number[],longitude:number[])=>{

    var lat = ConvertDMStoDD(latitude[0], latitude[1], latitude[2]);
    var lng = ConvertDMStoDD(longitude[0], longitude[1], longitude[2]);
    return [lat,lng]
}

const ConvertDMStoDD = (graden:number,minuten:number,seconden:number) =>{
    return graden + (minuten/60) + seconden/3600

}