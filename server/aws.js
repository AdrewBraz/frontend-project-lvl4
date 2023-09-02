import EasyYandexS3 from 'easy-yandex-s3'
import dotenv from 'dotenv'

dotenv.config()

export default new EasyYandexS3({
    auth: {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY
    },
    Bucket: 'chat-mongo', // например, "my-storage",
    debug: false, // Дебаг в консоли, потом можете удалить в релизе
  });