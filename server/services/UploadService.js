import { v4 as uuidv4 } from 'uuid';


class UploadService{
    async imageUpload(file, userId, s3){
        const fileName = `${uuidv4()}_${file.filename}`
        const url = await s3.Upload({
          buffer: file._buf,
          name: fileName
        },
        `/${userId}/`
        )
        return url.Location
      }
}

export default new UploadService()