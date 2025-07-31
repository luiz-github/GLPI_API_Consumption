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
            
            localStorage.setItem("Token", data.session_token)
            
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
        const response = await this.genericRequest("GET", this.killSessionURL, sessionToken)
        const data = await response.json()
        localStorage.removeItem("Token")
        return {
            success: true,
            data: data 
        }
    }

    async getSessionUserID(sessionToken: string | null): Promise<defaultReturn> {
        const response = await this.genericRequest("GET", this.getFullSessionURL, sessionToken)
        const data = await response.json()
        return {
            success: true,
            data: data.session.glpiID
        }
    }

    private async genericRequest(method: string, endpoint: string, sessionToken: string | null) {
        return fetch(`${this.apiURL}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Session-Token': sessionToken ?? '',
            }
        })
    }
}

export default SessionController