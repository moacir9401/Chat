using Microsoft.AspNetCore.SignalR;

namespace API_Chat.Models
{
    public class ChatHub : Hub
    {
        public async Task EnviarMensagem(string user, string message)
        {
            await Clients.All.SendAsync("ReceberMensagem", user, message);
        }
    }
}
