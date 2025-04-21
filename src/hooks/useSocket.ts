
import { useEffect, useCallback } from "react";
import { useSocketContext } from "../context/SocketContext";

export const useSocket = (
  eventName: string,
  callback: (data: any) => void
) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [socket, eventName, callback]);
};
