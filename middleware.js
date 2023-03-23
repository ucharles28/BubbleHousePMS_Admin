import { NextResponse } from "next/server"
import { MiddlewareRequest } from "@netlify/next";


export default function middleware(req) {
    const request = new MiddlewareRequest(nextRequest);
    
    var myCookie = req.cookies.get('bcloudCookie')

    if (//req.nextUrl.pathname.startsWith('/jobs') || 
    req.nextUrl.pathname === '/') {
        if (!myCookie) {
            const url = request.nextUrl.clone()// req.nextUrl.clone()
            url.pathname = '/login'
            return request.redirect(url)
        }
    }

    // if (req.nextUrl.pathname.startsWith('/login')) {
    //     if (myCookie) {
    //         const url = req.nextUrl.clone()
    //         url.pathname = '/jobs'
    //         return NextResponse.redirect(url)
    //     }
    // }
}