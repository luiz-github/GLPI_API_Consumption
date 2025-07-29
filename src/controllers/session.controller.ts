interface defaultReturn {
    success: boolean,
    data?: any
}

class SessionController {
    private apiURL
    private initSessionURL
    private killSessionURL
    private getFullSessionURL

    constructor() {
        this.apiURL = import.meta.env.VITE_API_BASE_URL
        this.initSessionURL = "/initSession"
        this.killSessionURL = "/killSession"
        this.getFullSessionURL = "/getFullSession"
    }

    async initSession(username: string, password: string): Promise<defaultReturn> {
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
            
            if (!response.ok) {
                return {
                    success: false,
                    data: data
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
            return { 
                success: false,
                data: error
            }
        }
    }

    async killSession(sessionToken: string | null): Promise<defaultReturn> {
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

    async getSessionUserID(sessionToken: string | null): Promise<defaultReturn> {
        const response = await fetch(
            `${this.apiURL}${this.getFullSessionURL}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${sessionToken}`
                }
            }
        )
        const data = await response.json()
        return {
            success: true,
            data: data.session.glpiID
        }
    }
}

export default SessionController