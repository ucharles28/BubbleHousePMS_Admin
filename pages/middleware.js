import { NextResponse } from "next/server"


export default function middleware(req) {
    var myCookie = req.cookies.get('bloudCookie')

    // if (//req.nextUrl.pathname.startsWith('/jobs') || 
    // req.nextUrl.pathname.startsWith('/account')
    // || req.nextUrl.pathname.startsWith('/hiredtalent')
    // || req.nextUrl.pathname.startsWith('/messages')
    // || req.nextUrl.pathname.startsWith('/profile')) {
    //     if (!myCookie) {
    //         const url = req.nextUrl.clone()
    //         url.pathname = '/login'
    //         return NextResponse.redirect(url)
    //     }
    // }
    console.log(req.nextUrl.pathname)

    if (//req.nextUrl.pathname.startsWith('/jobs') || 
    req.nextUrl.pathname === '/ ') {
        if (!myCookie) {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
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