declare namespace API {
    interface response {
        code: string,
        message: string,
        data: {
            accessToken: string,
            refreshToken: string,
        },
        timestamp: string
    }

}
