import {ImageTyp} from "@/context/ApplicationContext";
import {axiosClient} from "@/api/httpClient";
import { v4 as uuid } from "uuid";
import {AxiosRequestConfig} from "axios";

export const combineImagesFromCanvasApi = async (underlyingCanvas: HTMLCanvasElement, onTopCanvas: HTMLCanvasElement): Promise<ImageTyp> => {
    const requestPayload = {
        underlyingPicture: {
            id: uuid(),
            source: underlyingCanvas.toDataURL(),
        },
        onTopPicture: {
            id: uuid(),
            source: onTopCanvas.toDataURL(),
        }
    };

    const requestConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload)
    };

    console.log("Payload: ", {
        underlyingPicture: {
            id: uuid(),
            source: underlyingCanvas.toDataURL(),
        },
        onTopPicture: {
            id: uuid(),
            source: onTopCanvas.toDataURL(),
        }
    });
    const response = await fetch("http://localhost:3002/combine", requestConfig);

    return response.json();
}

export const printImageApi = async (image: ImageTyp) => {
    const requestConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
    };
    await fetch("http://localhost:3002/print", requestConfig);
}