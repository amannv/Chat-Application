import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const socketToUser = new Map<WebSocket, string>();
const userToroomId = new Map<string, number>();
const roomToUsers = new Map<number, Set<WebSocket>>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type == "join") {
      console.log(
        parsedMessage.payload.username +
          " created and joined room with id " +
          parsedMessage.payload.roomId,
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
        users.add(socket);
      }
    }

    if (parsedMessage.type == "chat") {
      const chatMessage = parsedMessage.payload.message;
      const username = socketToUser.get(socket);

      if (!username) {
        return console.error("User don't exist");
      }

      const roomId = userToroomId.get(username);

      if (!roomId) {
        return console.error("Room not exists");
      }

      const users = roomToUsers.get(roomId);

      if(!users) {
        return console.error("No users exists in the room");
      }

      console.log(chatMessage);
      socket.send(chatMessage);
    }
  });
});
