// 'use server';
import dotenv from "dotenv";
import { GoogleDriveService } from "./utils/googleDriveService";

dotenv.config();

export async function uploadImageToGgDrive({
  fileName,
  folderName,
  image,
  contentType,
  ...rest
}) {
  const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || "";
  const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || "";
  const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
  const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";

  const googleDriveService = new GoogleDriveService(
    driveClientId,
    driveClientSecret,
    driveRedirectUri,
    driveRefreshToken
  );

  let folder = await googleDriveService
    .searchFolder(folderName)
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!folder) {
    folder = await googleDriveService.createFolder(folderName);
  }

  const res = await googleDriveService
    .saveFile(fileName, image, contentType, folder.id)
    .catch((error) => {
      console.error(error);
    });
  console.info("Image uploaded successfully!");

  return res.data;
}
