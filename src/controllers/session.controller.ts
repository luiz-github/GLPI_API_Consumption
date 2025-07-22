class SessionController {
    apiURL = import.meta.env.VITE_API_BASE_URL
    initSessionURL = "/initSession"
    killSessionURL = "/killSession"

    async initSession(username: string, password: string) {
        try {
            const response = await fetch(
                `${this.apiURL}${this.initSessionURL}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa(username + ':' + password)}`
                    }
                }
            )
            const data = await response.json()

            if (response.status != 200) {
                return {
                    "success": false,
                    "data": data
                }
            }

            if (data?.session_token) {
                localStorage.setItem("Token", data.session_token)
            }

            return {
                    success: true,
                    data: data
                }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async killSession(sessionToken: string | null) {
        const response = await fetch(
            `${this.apiURL}${this.killSessionURL}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${sessionToken}`
                }
            }
        )
        const data = await response.json()
        localStorage.removeItem("Token")
        return {
            success: true,
            data: data 
        }
    }
}

export default SessionController