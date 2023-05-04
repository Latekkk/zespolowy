
const undefinedImages = (url, host, undefinedUrl = 'images/undefined/404.webp'): string => {
    return url === undefined? undefinedUrl : host + url;
}



export default undefinedImages;
