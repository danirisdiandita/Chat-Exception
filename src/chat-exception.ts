import axios from 'axios'

// const sendDiscordNotification = async (webhookUrl: string, message: string): Promise<void> => {
//     let data = JSON.stringify({
//         "content": null,
//         "embeds": [
//             {
//                 "title": "[Alert] Error: Uncaught TypeError",
//                 "description": "Timestamp: 2023-12-15T14:30:00Z\nEnvironment: Production\nError Message: Cannot read property 'foo' of undefined line 23 at 50\nService: backend-api-apps\nURL: https://example.com/page\nUser: username@example.com",
//                 "color": 5814783
//             }
//         ],
//         "attachments": []
//     });
// }

export function chatException(webhookUrl: string, level: string, message: string, environment: string, service: string,
    url: string, user: string) {
    let payload = {
        content: null,
        embeds: [
            { title: `[Alert] ${level}: ${message}`, description: `**Timestamp**: ${new Date()}\n**Environment**: ${environment}\n**Error Message**: ${message}\n**Service**: ${service}\n**URL**: ${url}\n**User**: ${user}` }
        ], attachments: []
    }

    let data = JSON.stringify(payload); 

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: webhookUrl,
        headers: { 
          'Content-Type': 'application/json',
        },
        data : data
      };

    axios.request(config).then((response) => {
        console.log(JSON.stringify(response.data))
    }).catch((error) => {
        console.log(error)
    })


}