export const boysUrl = "/wechat/index"
export const girlsUrl = "/wechat/nvsheng"
export const publishingUrl = "/wechat/chuban"
export const sortUrl = "/wechat/category"
export const searchPageUrl = "/wechat/search"
export const searchUrl = "/wechat/search/do"
export const rankUrl = "/wechat/subrank"
export const topMan = "/wechat/subrank?sectionId=37988"
export const topWoman = "/wechat/subrank?sectionId=37989"
export const bookDetail = `/wechat/book/`
export const bookMulu = `/wechat/allcatalog/`
export const bookContent = `wechat/book/`
export const addShelf = `/wechat/bookshelf/`
export const bookshelf = '/wechat/bookshelf/myshelf?page=1&usr=j30059520&ku=j30059520&kt=a254d6aea3f2266c94cb447f0b9a3142'
export const deletebook='wechat/bookshelf/'
export function crossTalkUrl(key,size){
    return `keyword/albums?categoryId=12&keywordId=${key}&pageId=1&pageSize=${size}&excludedOffset=0&excludedAlbumIds=`
}
export function talkDetailUrl(albumId){
    return `v1/album?albumId=${albumId}&pageSize=1000&source=1`
}
export function playUrl(id){
    return `playpage/${id}`
}
export const login = '/book/login'
export const addhistory = '/book/addhistory'
export const history = '/book/history'
export const register = '/book/register'