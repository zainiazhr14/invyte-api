import path from "path";

export const onUpload = async (files: File[])  => {
  const uploadDir = path.resolve("uploads");

  await Bun.write(path.join(uploadDir, '.keep'), '');

  const uploadPromises = files.map(async (file) => {
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
    const filepath = path.join(uploadDir, filename);

    await Bun.write(filepath, file);

    return {
      filename,
      path: `/uploads/${filename}`,
    };
  });

  return await Promise.all(uploadPromises);
}
