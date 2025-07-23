export interface JSONServerResponse<T> {
    message: string
    data: T
}

type RequestBody = string | FormData | null
type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE"
interface ServerErrorResponse {
    detail: string
}

export async function CallAPIJSON<T>(
    url: string, 
    method: HTTPMethod, 
    body: RequestBody
) : Promise<JSONServerResponse<T>>{
    const res = await fetch(url, {
        method,
        body
    })
    if (!res.ok){
        const data : ServerErrorResponse = await res.json()
        throw new Error(data.detail)
    }
    const data : JSONServerResponse<T> = await res.json()
    return data
}

export async function CallAPIBlob(
    url: string,
    method: HTTPMethod,
    body: RequestBody
) : Promise<Blob>{
    const res = await fetch(url, {
        method,
        body
    })
    if (!res.ok){
        const data : ServerErrorResponse = await res.json()
        throw new Error(data.detail)
    }
    const data = await res.blob()
    return data
}