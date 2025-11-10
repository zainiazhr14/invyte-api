import fs from "fs/promises";
import path from "path";

export const onUpload = async (file: File)  => {
  const uploadDir = path.resolve("uploads");

  await fs.mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  const buffer = await file.arrayBuffer();
  await fs.writeFile(filepath, Buffer.from(buffer));

  return {
    filename,
    path: `/uploads/${filename}`,
  };
}
