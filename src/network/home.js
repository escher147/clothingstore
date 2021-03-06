import { request, requestNPS } from "./request";

export function getHomeMutidata() {
    return request({
        url: "/home/multidata"
    })
}

export function getHomeGoods(type, page) {
    return requestNPS({
        url: 'home/data',
        params: {
            type,
            page
        }
    })
}