import AdmZip from 'adm-zip';

export const zipFile = (fileName, fileBuffer) => {
    const zip = new AdmZip();
    zip.addFile(fileName, fileBuffer);

    return zip.toBuffer();
};