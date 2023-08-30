import EasyYandexS3 from 'easy-yandex-s3'


export default new EasyYandexS3({
    auth: {
      accessKeyId: 
      secretAccessKey: 
    },
    Bucket: 'chat-mongo', // например, "my-storage",
    debug: false, // Дебаг в консоли, потом можете удалить в релизе
  });