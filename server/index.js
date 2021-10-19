var express = require('express')//express 관련 코드를 가져온다.
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')


const todoSchema = mongoose.Schema({//스키마 정의
    name: { type: String, required: true, trim: ture},
    done: { type: Boolean, default: false},
    description: { type: String, required: true, trim: true}
})

const Todo = mongoose.model('Todo',todoSchema)//스키마로부터 생성된 모델 객체
module.exports = Todo;

const CONNECT_URL = 'mongodb://localhost:27017/opers'
mongoose.connect(CONNECT_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log("mongdb connected..."))
.catch(e => console.log(`failed to connect mongodb: ${e}`))

var corsOptions = { // CORS 옵션
    origin: 'http://localhost:3000',
    credential: true
}
app.use(cors(corsOptions)) // CORS 설정
app.use(express.json()) //request body 파싱
app.use(logger('tiny')) //Logger 설정


app.get('/hello',(req,res) =>{//URL 응답 테스트
    res.send('hello woeld!')
})

app.use((req,res,next)=>{ //사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
})
app.use((err,req,res,next) =>{ //서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server!")
})

app.listen(5000,() =>{//5000 포트로 서버 오픈
console.log('server is running on port 5000...')
})