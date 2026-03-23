import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });


const socketToRoomId = new Map<WebSocket, Number>();
const roomToUsers = new Map<Number, Set<WebSocket>>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type == "join") {
      console.log(parsedMessage.payload.username + " joined room with id " + parsedMessage.payload.roomId);

      const roomId = parsedMessage.payload.roomId;

      socketToRoomId.set(socket, roomId);

      if (!roomToUsers.has(roomId)) {
        roomToUsers.set(roomId, new Set());
      }

      const sockets = roomToUsers.get(roomId);
      if (sockets) {
        sockets.add(socket);
      }
    }

    if (parsedMessage.type == "chat") {
      const chatMessage = parsedMessage.payload.message;
      const username = parsedMessage.payload.message; 

      const roomId = socketToRoomId.get(socket);

      if (!roomId) {
        return console.error("Room not exists");
      }

      const sockets = roomToUsers.get(roomId);

      if (!sockets) {
        return console.error("No users exists in the room");
      }

      sockets.forEach((socket) => {
        socket.send(chatMessage);
      });
    }
  });
});
