import TicketBodyFilter from '../utils/ticketBodyFilter.js'

class TicketController {
    apiURL = "https://www.suporte.unimontes.br/apirest.php"
    ticketURL = "/Ticket"

    async createTicket(amount, sessionToken) {
        const tbf = new TicketBodyFilter()
        const data = await tbf.filter(amount)
        
        console.log(data)

        const response = await fetch(
            `${this.apiURL}${this.ticketURL}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${sessionToken}`,
                },
                data: `${data}`
            }
        )
    }
}

export default TicketController