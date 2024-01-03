import axios from 'axios'
import { RegexContentTypeImage } from './regex'

export const RemoveProcotol = (url: string) => {
    return url.replace('http://', '').replace('https://', '')
}

export const GetDomain = (subdomain: string, domain: string) => {
    domain = RemoveProcotol(domain)
    return `${subdomain}.${domain}`
}

export const GetImageUrl = async (url: string) => {
    try {
        const { data, status, headers } = await axios(url, {
            responseType: 'arraybuffer',
        })
        const contentType = headers['content-type'] || ''

        if (status === 200 && !RegexContentTypeImage.test(contentType)) return

        return {
            data: data,
            content_type: contentType,
        }
    } catch (error) {
        return
    }
}
