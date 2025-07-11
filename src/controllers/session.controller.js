class SessionController {
    apiURL = "https://www.suporte.unimontes.br/apirest.php"
    initSessionURL = "/initSession"
    killSessionURL = "/killSession"

    async initSession(username, password) {
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

        return data
    }

    async killSession(sessionToken) {
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