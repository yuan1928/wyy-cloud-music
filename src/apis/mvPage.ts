import request from "./request";

//video
export function getVideoInfo(id:string){
    return request({
        url:"/video/detail?id="+id,
        method:"get",
    })
}

export function getVideoUrl(id:string){
    return request({
        url:"/video/url?id="+id,
        method:"get",
    })
}

export function getVideoComments(id:string,offset:number){
    return request({
        url:"/comment/video?limit=10&id="+id+"&offset="+offset,
        method:"get",
    })
}

export function getSimilarVideo(id:string){
    return request({
        url:"/related/allvideo?id="+id,
        method:"get",
    })
}

//mv
export function getMvInfo(id:number){
    return request({
        url:"/mv/detail?mvid="+id,
        method:"get",
    })
}

export function getMvUrl(id:string){
    return request({
        url:"/mv/url?id="+id,
        method:"get",
    })
}

export function getMvComments(id:string,offset:number){
    return request({
        url:"/mv/detail/info?limit=20&mvid="+id+"&offset="+offset,
        method:"get",
    })
}

export function getRecommendMv(){
    return request({
        url:"/personalized/mv",
        method:"get",
    })
}