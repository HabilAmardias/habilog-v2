import { CallAPIBlob } from "../../adapters/api"

class sisrUIState{
    files = $state<FileList | null>(null)
    isError = $state<Error | null>(null)
    downUrl = $state<string>("")
    isLoading = $state<boolean>(false)

    async handleUpload(
        e: SubmitEvent & {currentTarget: EventTarget & HTMLFormElement}
    ){
        e.preventDefault()

        this.isError = null
        this.isLoading = true

        if (!this.files){
            throw new Error("There is no file uploaded")
        }
        const imgTypes = ["image/png", "image/jpeg", "image/bmp"];
        
        const file = this.files[0]
        if (!imgTypes.includes(file.type)){
            throw new Error("Invalid file type")
        }

        const formData = new FormData()
        formData.append("file", file)

        const url = `${import.meta.env.VITE_BACKEND_URL}/sisr/upload`;
        const blob = await CallAPIBlob(url, "POST", formData)
        return window.URL.createObjectURL(blob) 
    }
    setDownUrl(newUrl: string){
        this.downUrl = newUrl
    }
    setIsError(newErr: Error){
        this.isError = newErr
    }
    stopLoading(){
        this.isLoading = false
    }
    removeURL(){
        this.downUrl = ""
    }
    getFileName(){
        return this.files ? this.files[0].name : "Upload your image here"
    }
}

export const uiState = new sisrUIState()