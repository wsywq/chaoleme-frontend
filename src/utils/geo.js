// 获取用户位置的函数
export function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // 成功获取位置
                const latitude = position.coords.latitude; // 纬度
                const longitude = position.coords.longitude; // 经度
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                return latitude + "," + longitude;
            },
            (error) => {
                // 处理错误
                console.error(`Geolocation error: ${error.message}`);
                return "101220101";
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        return "101220101";
    }
}
