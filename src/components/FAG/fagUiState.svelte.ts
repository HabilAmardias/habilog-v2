import { CallAPIJSON, type JSONServerResponse } from "../../adapters/api"

interface FAGServerResponse {
    probability: number
    age_range: string
}

interface FAGResult extends FAGServerResponse{
    url: string
}

export interface FAGUploadState{
    setResult : (newData: FAGResult) => void
    files : FileList | null
    isError : Error | null
    isLoading: boolean
    downUrl : string
    handleUploadFile: (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => Promise<JSONServerResponse<FAGServerResponse>>
    getFileName : () => void
    setIsError : (newErr : Error) => void
    stopLoading: () => void
}

export interface FAGCameraState{
    setResult : (newData: FAGResult) => void
    canvas : HTMLCanvasElement | null
    videoSource : HTMLVideoElement | null
    isError : Error | null
    isLoading: boolean
    downUrl : string
    handleUploadCamera: (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => Promise<JSONServerResponse<FAGServerResponse>>
    setIsError : (newErr : Error) => void
    stopLoading: () => void
    getVideo: () => () => void
}

type UploadOption = "camera" | "upload"

class fagUiState{
    result = $state<FAGResult | null>(null)
    uploadOption = $state<UploadOption>("upload")

    files = $state<FileList | null>(null);
    isError = $state<Error | null>(null);
    isLoading = $state<boolean>(false);
    videoSource = $state<HTMLVideoElement | null>(null);
    canvas = $state<HTMLCanvasElement | null>(null);
    downUrl = $state<string>("");

    getVideo(){
        navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((val) => {
            if (this.videoSource) {
                this.videoSource.srcObject = val;
                this.videoSource.play();
            }
        })
        .catch((err: Error) => (this.isError = err));
        return () => {
            (this.videoSource!.srcObject! as MediaStream)
            .getTracks()
            .forEach((t) => t.stop());
        };
    }

    setResult(newData : FAGResult){
        this.result = newData
    }

    async handleUploadCamera(
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ){
        e.preventDefault()
        this.isLoading = true
        this.isError = null

        if (this.canvas && this.videoSource) {
            this.canvas.width = this.videoSource.videoWidth;
            this.canvas.height = this.videoSource.videoHeight;
            const context = this.canvas.getContext("2d")
            if (context){
                context.drawImage(
                    this.videoSource as CanvasImageSource,
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                )
            }
        }
        const formData = new FormData()
        const blob = await new Promise<Blob>((resolve, reject)=>{
            this.canvas?.toBlob((b)=>{
                if (b){
                    resolve(b)
                    return
                }
                reject("Failed to upload image")
            }, "image/png")
        })
        this.downUrl = window.URL.createObjectURL(blob)
        formData.append("file", blob)

        const url = `${import.meta.env.VITE_BACKEND_URL}/fag/upload`;
        const res = await CallAPIJSON<FAGServerResponse>(url, "POST", formData)
        return res
    }

    async handleUploadFile(
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ){
        e.preventDefault()
        this.isLoading = true
        this.isError = null

        if (!this.files){
            throw new Error("No file uploaded")
        }

        const file = this.files[0]
        this.downUrl = window.URL.createObjectURL(file);
        const url = `${import.meta.env.VITE_BACKEND_URL}/fag/upload`;
        const formData = new FormData();
        formData.append("file", file);

        const res  = await CallAPIJSON<FAGServerResponse>(url, "POST", formData)
        return res
    }
    getFileName(){
        return this.files ? this.files[0].name : "Upload your image here"
    }
    setIsError(newErr: Error){
        this.isError = newErr
    }
    stopLoading(){
        this.isLoading = false
    }
    removeResult(){
        this.result = null
    }
}

export const uiState = new fagUiState()