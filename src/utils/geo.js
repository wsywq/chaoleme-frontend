// 获取用户位置的函数
export function getUserLocation() {
    return new Promise((resolve, reject) => {
        let userGeo = {
            // 默认返回合肥
            longitude: "117.22",
            latitude: "31.82"
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // 成功获取位置
                    const {latitude, longitude} = position.coords;
                    // 保留小数点后两位
                    const formattedLatitude = latitude.toFixed(2);
                    const formattedLongitude = longitude.toFixed(2);
                    console.log(`Latitude: ${formattedLatitude}, Longitude: ${formattedLongitude}`);
                    userGeo.longitude = formattedLongitude;
                    userGeo.latitude = formattedLatitude;
                    resolve(userGeo);
                },
                (error) => {
                    // 处理错误
                    console.error(`Geolocation error: ${error.message}`);
                    resolve(userGeo);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            resolve(userGeo);
        }
    });
}
