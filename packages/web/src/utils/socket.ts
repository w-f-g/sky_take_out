import { SOCKET_URL } from '.'

type TMessage = {
  type: 1 | 2,
  orderId: number,
  content: string,
}

type THandle = (E: TMessage) => void

class OrderSocket {
  socket: WebSocket | null = null
  handles: THandle[] = []

  connect() {
    return new Promise((resolve, reject) => {
      if (this.socket instanceof WebSocket) {
        reject(new Error('连接失败，连接已建立，不能重复连接'))
        return
      }
      this.socket = new WebSocket(SOCKET_URL)

      this.socket.onopen = e => {
        console.log('websocket连接成功')
        resolve(e)
      }
      
      this.socket.onmessage = e => {
        const data: TMessage = JSON.parse(e.data)
        this.handles.forEach(cb => cb(data))
      }

      this.socket.onerror = err => {
        console.log(err)
        reject(new Error('连接失败'))
      }
    })
  }

  listen(cb: THandle) {
    this.handles.push(cb)
    return () => {
      const index = this.handles.findIndex(x => x === cb)
      this.handles.splice(index, 1)
    }
  }

  close() {
    this.socket?.close()
    this.handles = []
    this.socket = null
  }

  get readyState() {
    return this.socket?.readyState
  }

  get isOpen() {
    return this.socket && this.socket.readyState === this.socket.OPEN
  }

  get isClose() {
    return this.socket && this.socket.readyState === this.socket.CLOSED
  }
}

export const orderSocket = new OrderSocket()