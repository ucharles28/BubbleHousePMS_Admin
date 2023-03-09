import { NextResponse } from "next/server"


export default function middleware(req) {
    var myCookie = req.cookies.get('bloudCookie')

    
    if (//req.nextUrl.pathname.startsWith('/jobs') || 
    req.nextUrl.pathname === '/ ') {
        if (!myCookie) {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
    }
}