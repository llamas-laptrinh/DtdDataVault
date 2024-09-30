import { Buffer } from "buffer";

export const stringToBytes = (data: any) => {
    const jsonString = JSON.stringify(data);
    const hexString = '0x' + Buffer.from(jsonString).toString('hex');
    return hexString
}