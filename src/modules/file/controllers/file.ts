import { User } from "@db/schemas/user";
import { onUpload } from "@file/services/file";
import { UploadFileReq } from "@file/types/file";
import ApiError from "@libs/response/error";

export const handleUploadFile = async ({ body, user }: {
  body: UploadFileReq,
  user: User
}) => {
  try {
    const file = body.file;

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new ApiError('File too large (max 5MB)', 400);
    }

    const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowed.includes(file.type)) {
      throw new ApiError('Invalid file type', 400);
    }

    const result = await onUpload(file);

    return {
      success: true,
      filename: result.filename,
      path: result.path,
    };
  } catch (err: any) {
    throw err;
  }
}