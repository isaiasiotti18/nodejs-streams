import { pipeline, Readable, Transform, Writable } from 'stream'
import { createWriteStream } from 'fs'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

{
  const readableStream = new Readable({
    read: function() {
      this.push('Hello My Stream 1')
      this.push('Hello My Stream 2')
      this.push('Hello My Stream 3')
      this.push(null)
    }
  })
  
  const writableStream = Writable({
    write (chunk, encoding, callback) {
      console.log('msg', chunk.toString())
      callback()
    }
  })

  await pipelineAsync(
    readableStream,
    //process.stdout
    writableStream
  )
  
  console.log('feito 01')
}
{

  const readableStream = new Readable({
    read () {
      for( let index = 0; index < 1e5; index++ ) {
        const person = { id: Date.now() + index, name: 'John Doe'+index }
        const data = JSON.stringify(person)
        this.push(data)
      }
      this.push(null)
    }
  })

  const wrtietableMapToCSV = Transform({
    transform(chunk, encoding, cb) {
      const data = JSON.parse(chunk)
      const result = `${data.id},${data.name.toUpperCase()}\n`
      cb(null, result)
    }
  })

  const setHeader = Transform({
    transform(chunk, encoding, cb) {
      this.counter = this.counter ?? 0
      if(this.counter) {
        return cb(null, chunk)

      }
      this.counter += 1

      cb(null, "id,name\n".concat(chunk))
    }
  })

  await pipelineAsync(
    readableStream,
    wrtietableMapToCSV,
    setHeader,
    createWriteStream('my.csv')
  )
}