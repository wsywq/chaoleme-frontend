/** 图片压缩，默认同比例压缩
 *  @param {Object} fileObj
 *  图片对象
 *  回调函数有一个参数，base64的字符串数据
 */
export function compress(fileObj, callback) {
    try {
        const image = new Image()
        image.src = URL.createObjectURL(fileObj)
        image.onload = function () {
            const that = this
            // 默认按比例压缩
            const targetWidth = 172;
            const targetHeight = 172;
            let quality = 0.7 // 默认图片质量为0.7
            // 生成canvas
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // ctx.drawImage(that, 0, 0, w, h)
            ctx.drawImage(that, 0, 0, targetWidth, targetHeight);
            // 图像质量
            if (fileObj.quality && fileObj.quality <= 1 && fileObj.quality > 0) {
                quality = fileObj.quality
            }
            // quality值越小，所绘制出的图像越模糊
            const data = canvas.toDataURL('image/jpeg', quality)
            // 压缩完成执行回调
            const newFile = convertBase64UrlToBlob(data)
            callback(newFile)
        }
    } catch (e) {
        console.log('压缩失败!')
    }
}

function convertBase64UrlToBlob(urlData) {
    const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
    // 处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ab], {type: 'image/png'})
}
