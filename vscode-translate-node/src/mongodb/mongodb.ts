import mongoose from 'mongoose'

const DB_URL = 'mongodb://47.100.235.95:27017/translateweb'

mongoose.connect(DB_URL, {useNewUrlParser: true})

mongoose.connection.on('connected',function() {
   console.log('Mongoose connection open to '+DB_URL);
});
/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error',function(err) {
  console.log('Mongoose connection error: '+ err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected',function() {
  console.log('Mongoose connection disconnected');
});

export default mongoose