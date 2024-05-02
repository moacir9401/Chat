using Microsoft.AspNetCore.SignalR;

namespace API_Chat.Models
{
    public class ChatHub : Hub
    {
        private static readonly List<(string user, string message)> Messages = new List<(string user, string message)>();

        public async Task EnviarMensagem(string user, string message)
        {
            Messages.Add((user, message));
            await Clients.All.SendAsync("ReceberMensagem", user, message);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();

            foreach (var (user, message) in Messages)
            {
                await Clients.Caller.SendAsync("ReceberMensagem", user, message);
            }
        }
    }
}