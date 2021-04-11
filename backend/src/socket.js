import app from './app.js';
import { Server } from 'socket.io';
import http from 'http';
import { Blog } from './models/blog.model.js'
import { Comment } from './models/comment.model.js'
import { Chat } from './models/chat.model.js'

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },

});

io.on("connection", (socket) => {
  console.log("We have a new connection!!!");


  socket.on('room', (room) => {
    socket.join(room);
  });

  socket.on('add comment', async (data) => {
    console.log(data)
    const response = {
      statusCode: 200,
      message: 'Create comment successful',
      data: {},
    };

    try {
      const blog = await Blog.findOne({ _id: data.blogId });
      if (!blog) {
        return {
          statusCode: 404,
          message: 'Blog not found',
          data: {},
        };
      }

      const comment = await Comment.create({
        content: data.comment,
        user: data.userId,
        blog: data.blogId
      });

      response.data = await comment.populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' }).execPopulate();
    } catch (err) {
      response.statusCode = 500;
      response.message = err.message;
    }

    const room = 'Education'
    io.to(room).emit('Output comment', response)
  })

  socket.on('Send message', async (data) => {
    const response = {
      statusCode: 201,
      message: 'Send message successfully',
      data: {}
    }
    try {
      const message = await Chat.findOne({
        $or: [
          { $and: [{ sender: data.sender }, { receiver: data.receiver }] },
          { $and: [{ receiver: data.sender }, { sender: data.receiver }] }
        ]
      })
      if (!message) {
        await Chat.create({
          sender: data.sender,
          receiver: data.receiver,
          messages: []
        })
      }
      const newMessage = await Chat.findOneAndUpdate({ _id: message._id }, {
        $push: { messages: { messages: data.message, file: data?.file, sender: data.sender, receiver: data.receiver, createdAt: Date.now() } }
      }, { new: true })
      response.data = await newMessage
        .populate({ path: 'sender', select: 'email profile' })
        .populate({ path: 'messages.sender', select: 'email profile' })
        .populate({ path: 'messages.receiver', select: 'email profile' })
        .populate({ path: 'receiver', select: 'email profile' })
        .execPopulate()

    } catch (err) {
      response.statusCode = 500;
      response.message = err.message;
    }

    const room = 'Education'
    io.to(room).emit('Output message', response)

  })


  socket.on("disconnection", () => {

  });
});

