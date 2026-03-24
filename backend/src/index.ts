import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const socketToUsername = new Map<WebSocket, String>();
const socketToRoomId = new Map<WebSocket, Number>();
const roomToUsers = new Map<Number, Set<WebSocket>>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type == "join") {
      const roomId = parsedMessage.payload.roomId;
      const username = parsedMessage.payload.username;

      socketToUsername.set(socket, username);
      socketToRoomId.set(socket, roomId);

      if (!roomToUsers.has(roomId)) {
        roomToUsers.set(roomId, new Set());
      }

      const sockets = roomToUsers.get(roomId);
      if (sockets) {
        sockets.add(socket);
      }

      const joinMessage = {
        type: "join",
        message: `${username} joined with roomId ${roomId}`,
      };

      sockets?.forEach((socket) => {
        socket.send(JSON.stringify(joinMessage));
      });
    }

    if (parsedMessage.type == "chat") {
      const chatMessage = parsedMessage.payload.message;

      const username = socketToUsername.get(socket);
      const roomId = socketToRoomId.get(socket);

      if (!roomId) {
        return console.error("Room not exists");
      }

      const sockets = roomToUsers.get(roomId);

      if (!sockets) {
        return console.error("No users exists in the room");
      }

      const message = {
        type: "chat",
        username: username,
        message: chatMessage,
      };

      sockets.forEach((socket) => {
        socket.send(JSON.stringify(message));
      });
    }
  });
});
