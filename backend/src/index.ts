import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const socketToUser = new Map<WebSocket, string>();
const userToroomId = new Map<string, number>();
const roomToUsers = new Map<number, Set<string>>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type == "join") {
      console.log(
        "User joined this room " +
          parsedMessage.payload.roomId +
          " " +
          "username is " +
          parsedMessage.payload.username,
      );

      const username = parsedMessage.payload.username;
      const roomId = parsedMessage.payload.roomId;

      socketToUser.set(socket, username);
      userToroomId.set(username, roomId);

      if (!roomToUsers.has(roomId)) {
        roomToUsers.set(roomId, new Set());
      }

      const users = roomToUsers.get(roomId);
      if (users) {
        users.add(username);
      }
    }


    if (parsedMessage.type == "chat") {
        
    }
  });
});
