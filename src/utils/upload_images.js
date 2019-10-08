import Taro from "@tarojs/taro"
import siteConfig from "@/utils/index"

export async function uploadImages(localImages = []) {
  let auth_token = Taro.getStorageSync('auth_token')
  let upload_url = `${siteConfig.api_port()}/api/v1/photos.json?auth_token=${auth_token}`;

  const images = localImages.map((file) => {
    return new Promise((resolve, reject) => {
      return Taro.uploadFile({
        url: upload_url,
        filePath: file,
        name: "file",
        formData: {},
        success(res) {
          resolve(res.data);
        },
        fail(error) {
          reject(error);
        }
      });
    });
  });

  let result = await Promise.all(images);
  let assets = result.map((res) => {    
    return JSON.parse(res).image_url   
  });
  console.log(assets)
  assets = assets.filter(img_url => img_url.toString().length > 3)
  return assets 
}

export async function uploadVideo(videoFile) {
  let auth_token = Taro.getStorageSync('auth_token')
  let upload_url = `${siteConfig.api_port()}/api/v1/photos/video.json?auth_token=${auth_token}`;
  let isLocalVideo = videoFile.indexOf("meirixinxue") < 0;
  if (isLocalVideo) {
    const res = await Taro.uploadFile({
      url: upload_url,
      filePath: videoFile,
      name: "file",
      formData: {}
    });
    console.log('res', res)
    return JSON.parse(res.data).video_url
  }
}
