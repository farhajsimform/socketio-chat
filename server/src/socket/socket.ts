

export const SocketConnection = (io: any) => {
  io.on("connection", async (socket: any) => {
    console.log("connected");

    /**
     * You can call join to subscribe the socket to a given channel
     */
    socket.on("join", (id: string) => {
      console.log("channel id", id);
      socket.join(id);
    });

    // chat functionality
    socket.on("chats", async ({ message, ...rest }) => {
      io.emit("chats", { message, ...rest });
      console.log("message", message);
      console.log("rest", rest);  
    });

    socket.on("disconnect", async () => {
      console.log("disconnected");
    });
  });
};
