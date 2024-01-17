import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, WebSocket } from 'ws'

@WebSocketGateway(8081, { path: '/ws' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(): string {
    return 'Hello world!'
  }

  emitAllClient(data: Record<string, any>) {
    this.server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  }
}
