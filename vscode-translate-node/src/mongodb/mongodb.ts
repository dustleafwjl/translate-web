import mongoose from 'mongoose'
const DB_URL = 'mongodb://47.100.235.95:27017/translateweb'
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true)    /* A */
}

mongoose.set('bufferCommands', false)  /* B */

function connectMongoDB(address) {
  try {
    mongoose.connect(address, { 
      useNewUrlParser: true,
      bufferMaxEntries: 0,
      autoReconnect: true,   /* C, default is true, you can ignore it */
      poolSize: 5           /* D, default is 5, you can ignore it */
    })
    
    const db = mongoose.connection
    db.on('error', (error) => {
      console.log(`MongoDB connecting failed: ${error}`)
    })
    db.once('open', () => {
      console.log('MongoDB connecting succeeded')
    })
    return db
  } catch (error) {
    console.log(`MongoDB connecting failed: ${error}`)
  }
}

// export const mongoInstance = connectMongoDB(DB_URL)

export default new Promise((resolve, reject) => {
    const DB_URL = 'mongodb://47.100.235.95:27017/translateweb'
    mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}) 
    mongoose.connection.once('open', err => {
        if(!err) {
            console.log("数据库连接成功!")
            resolve()
        }else {
            console.log("数据库连接失败！")
            reject()
        }
    })
})