import { FC, useState } from 'react'
import './App.css';

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// components

import MyInput from './components/MyInput'
import MyButton from './components/MyButton'
import MyProgressBar from './components/MyProgressBar';
import MySelect from './components/MySelect';

const App: FC = () => {


  const socket = new WebSocket('ws://localhost:5000')

  const [inputFile, setInputFile] = useState<any>(null)
  const [outputPath, setOutputPath] = useState<any>(null)
  const [progress, setProgress] = useState<number>(0)
  const [statusText, setStatusText] = useState<string>('')


  const bitrateVideo = ['4000k', '5000k', '6000k', '7000k', '8000k']
  const aspectRatio = ['16:9', '4:3', '9:16']
  const sizeVideo = ['640x480', '1280x720', '1920x1080']


  // options

  const [bitrate, setBitrate] = useState<string | any>(bitrateVideo[0])
  const [aspect, setAspect] = useState<string | any>(aspectRatio[0])
  const [size, setSize] = useState<string | any>(sizeVideo[0])
  const [logo, setLogo] = useState<string>('')




  // websocket


  socket.addEventListener('connection', () => {
    console.log('Подключение установлено')
  })

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)

    if(data.event === 'start') {
      setStatusText('Концертация началась')
    } else if (data.event === 'progress') {

      const floor = Math.ceil(Number(data.message))
      setProgress(floor)

      console.log(`progress ${data.message}%`)
    } else if (data.event === 'end') {
      setStatusText('Концертация закончилась')
      alert('Концертация завершена')
      window.location.reload()


    }
  })


  const startConversion = (inputFile: string, outputPath: string, bitrate: string, aspect: string, size: string, logo: string): any => {
    try {

      socket.send(JSON.stringify({inputFile, outputPath, bitrate, aspect, size, logo}))
      console.log({inputFile, outputPath, bitrate, size, aspect, logo})

    } catch (error) {
      console.log(error)
    }
  }



  // select arr


  return (
    <Container>

        <Row className="mt-5">
          <Col><MyInput style={{borderRadius: '10px'}} type="text" value={inputFile} onChange={e => setInputFile(e.target.value)} placeholder="Входной файл"></MyInput></Col>
          <Col><MyInput style={{borderRadius: '10px'}} type="text" value={outputPath} onChange={e => setOutputPath(e.target.value)} placeholder="Выходной файл"></MyInput></Col>
        </Row>


        <Row className="mt-5">
            <Col>
                <span>Выберите битрэйт видео</span>
                <MySelect style={{borderRadius: '10px'}} option={bitrateVideo} value={bitrate} defaultValue={bitrateVideo[0]} onChange={(e) => setBitrate(e.target.value)}></MySelect>
            </Col>

            <Col>
                <span>Выберите формат видео</span>
                <MySelect style={{borderRadius: '10px'}} option={aspectRatio} value={aspect} defaultValue={aspectRatio[0]} onChange={(e) => setAspect(e.target.value)}></MySelect>
            </Col>


            <Col>
                <span>Выберите разрешение видео</span>
                <MySelect style={{borderRadius: '10px'}} option={sizeVideo} value={size} defaultValue={sizeVideo[0]} onChange={(e) => setSize(e.target.value)}></MySelect>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col>
                <span>Вставьте логотип</span>
                <MyInput style={{borderRadius: '10px'}} type="text" value={logo} onChange={e => setLogo(e.target.value)} placeholder="Логотип"></MyInput>
            </Col>
        </Row>


        <Row className="mt-5 d-flex flex-column">
          <Col>{statusText}</Col>
          <Col><MyProgressBar value={progress} max={'100'}></MyProgressBar></Col>
          <Col>{`Конвертация ${progress}%`}</Col>
        </Row>


        <Row className="mt-5">
          <Col><MyButton style={{}} onClick={() => startConversion(inputFile, outputPath, bitrate, aspect, size, logo)} text={'Старт'}></MyButton></Col>
        </Row>


    </Container>
  )
}

export default App
