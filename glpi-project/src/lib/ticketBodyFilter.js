import fs from 'fs/promises'

class TicketBodyFilter {
    async filter(amount) {
        try {
            let data = []
            
            const file = await fs.readFile('./ticket.txt', 'utf8');
    
            // Gets ticket title from the .txt
            const title = file.split('\r\n')[0];
    
            // Gets ticket description from the .txt
            const description = file.split('\r\n').slice(1).join('\r\n');

            for (let i = 0; i < amount; i++) {
                data.push({
                    input: {
                        name: title,
                        content: description,
                        locations_id: 1
                    }
                });
            }
            return data;
    
        } catch (err) {
            if (err) throw err;
        }
    }
}

export default TicketBodyFilter