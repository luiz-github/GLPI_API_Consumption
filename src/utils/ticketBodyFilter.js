import fs from 'fs'

async function ticketBodyFilter() {
    try {
        fs.readFile('./ticket.txt', 'utf8', (err, data) => {
            if (err) throw err;

            // Gets ticket title from the .txt
            const title = data.split('\r\n')[0]

            // Gets ticket description from the .txt
            const description = data.split('\r\n').slice(1).join('\r\n')

            const ticket = {
                'Title': title,
                'Description': description
            }

            console.log(ticket)
        })
    } catch (err) {
        if (err) throw err;
    }
}

console.log(await ticketBodyFilter())