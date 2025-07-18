class SessionController {
    apiURL = "https://www.suporte.unimontes.br/apirest.php"
    initSessionURL = "/initSession"
    killSessionURL = "/killSession"

    async initSession(username: string, password: string) {
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
        localStorage.setItem("Token", data.session_token)
        return data
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
        return data
    }
}

export default SessionController