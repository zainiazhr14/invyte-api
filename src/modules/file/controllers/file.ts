import { User } from "@db/schemas/user";
import { onUpload } from "@file/services/file";
import { UploadFileReq } from "@file/types/file";
import ApiError from "@libs/response/error";
import _ from 'lodash'


export const handleUploadFile = async ({ body, user }: {
  body: UploadFileReq,
  user: User
}) => {
  try {
    const file = body.file;
    const files = body.files;

    const MAX_SIZE = 5 * 1024 * 1024;

    const allFiles = [file, ...files]
                      .filter((file: File) => file)

    
    const hasLargeFile = files.some(f => f.size > MAX_SIZE);

    if (hasLargeFile) {
      throw new ApiError('File too large (max 5MB)', 400);
    }

    const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    const hasInvalidType = files.some(f => !allowed.includes(f.type));

    if (hasInvalidType) {
      throw new ApiError('Invalid file type', 400);
    }

    const result = await onUpload(allFiles);

    return {
      success: true,
      filename: result.filename,
      path: result.path,
    };
  } catch (err: any) {
    throw err;
  }
}
