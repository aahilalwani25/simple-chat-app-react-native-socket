import io from 'socket.io-client';

const socket = io(`http://${process.env.IP_ADDRESS}:${process.env.PORT}`);
export default socket;