import axios from 'axios'
import { RegexContentTypeHtml } from './regex'
import error from '../pkg/error'

export const RemoveProcotol = (url: string) => {
    return url.replace('http://', '').replace('https://', '')
}

export const GetDomain = (subdomain: string, domain: string) => {
    domain = RemoveProcotol(domain)
    return `${subdomain}.${domain}`
}

export const GetObjectUrl = async (url: string) => {
    try {
        const { data, status, headers } = await axios(url, {
            responseType: 'arraybuffer',
        })
        const contentType = headers['content-type'] || ''

        if (status === 200 && RegexContentTypeHtml.test(contentType)) return

        return {
            data: data,
            content_type: contentType,
        }
    } catch (err: any) {
        const message = err.message

        throw new error(err.status, message)
    }
}
