class TicketController {
    apiURL = "https://www.suporte.unimontes.br/apirest.php"
    ticketURL = "/Ticket"
    ticketFieldsURL = "/listSearchOptions/Ticket"

    async createTicket(data, sessionToken) {
        const response = await fetch(
            `${this.apiURL}${this.ticketURL}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${sessionToken}`,
                },
                data: data
            }
        )
    }

    // async getTicketFields(sessionToken) {
    //     const response = await fetch(
    //         `${this.apiURL}${this.ticketURL}`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Session-Token': `${sessionToken}`,
    //             }
    //         }
    //     )

    //     const data = await response.json()

    //     return data
    // }
}

module.exports = TicketController