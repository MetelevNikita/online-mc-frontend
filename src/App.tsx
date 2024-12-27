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
import MyInputFile from './components/MyInputFile';
import MyRange from './components/MyRange';

const App: FC = () => {


  const socket = new WebSocket('ws://localhost:5000')

  const [inputFile, setInputFile] = useState<any>(null)
  const [image, setImage] = useState<any>(null)
  const [progress, setProgress] = useState<number>(0)
  const [statusText, setStatusText] = useState<string>('')

  //

  const [file, setFile] = useState<any>(null)
  const [logo, setLogo] = useState<any>(null)

  //

  const [start, setStart] = useState<boolean>(false)
  const [finish, setFinish] = useState<boolean>(false)


  const bitrateVideo = ['4000k', '5000k', '6000k', '7000k', '8000k']
  const aspectRatio = ['16:9', '9:16']
  const sizeVideo = ['640x480', '1280x720', '1920x1080']


  // options

  const [bitrate, setBitrate] = useState<string | any>(bitrateVideo[0])
  const [aspect, setAspect] = useState<string | any>(aspectRatio[0])
  const [size, setSize] = useState<string | any>(sizeVideo[0])

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
    } else if (data.event === 'end') {
      setStatusText('Концертация закончилась')
      setFinish(true)
      alert('Концертация завершена')
    }
  })


  const startConversion = (bitrate: string, aspect: string, size: string, logo: any, fileName: string): any => {
    try {

      if(!fileName) {
        alert('Вы не выбрали файл')
        return
      }

      setStart(true)
      socket.send(JSON.stringify({ bitrate, aspect, size, logo, fileName}))
    } catch (error) {
      console.log(error)
    }
  }



  const postFile = async () => {
    try {

      const formData = new FormData()
      formData.append('file', inputFile)


      if(!inputFile) {
        alert('Вы не выбрали файл')
        return
      }

      const responce = await fetch('http://localhost:5000/api/v1/file', {
        method: 'POST',
        body: formData,
      })
      const data = await responce.json()
      setFile(data)
      return data

    } catch (error: any) {
      console.log(`Файл не загружен ${error.message}`)
    }
  }


  const postImage = async () => {
    try {


      const formData = new FormData()
      formData.append('image', image)

      const responce = await fetch('http://localhost:5000/api/v1/image', {
        method: 'POST',
        body: formData,

      })

      const data = await responce.json()
      setLogo(data)
      return data

    } catch (error: any) {
      console.log(`Картинка не загружена ${error.message}`)
    }
  }



  const downloadFile = async (file: any) => {

    try {
      const responce = await fetch(`http://localhost:5000/download`, {
        method: 'GET',
      })
      const data = responce

    } catch (error: any) {
      console.log(`Ошибка скачивания файла ${error.message}`)
    }
  }




  // select arr


  return (
    <Container>

        <Row className="mt-5">

          <div style={{width: '100%', height: '100%', color: 'white', fontSize: '65px', fontWeight: '900'}}>OnlineConverter</div>

        </Row>

        <Row className="mt-5 d-flex align-items-end">



          <Col>

            <span style={{color: 'white'}}>Выберите редактируемый файл</span>
            <Col className='mb-4'><MyInputFile style={{}} onChange={(e: any) => setInputFile(e.target.files[0])}></MyInputFile></Col>
            <Col><MyButton style={{}} onClick={() => postFile()} text={'Загрузить файл на сервер'}></MyButton></Col>

          </Col>


          <Col>

          <span style={{color: 'white'}}>Выберите логотип</span>
          <Col className='mb-4'><MyInputFile style={{}} onChange={(e: any) => {setImage(e.target.files[0])}}></MyInputFile></Col>
          <Col><MyButton style={{}} onClick={() => postImage()} text={'Загрузить картинку на сервер'}></MyButton></Col>

          </Col>

        </Row>


        <Row className="mt-5">

            {

            (file !== null) ?
            <Col>

              <div style={{color: 'white'}}>Файл загружен</div>
              <div  style={{color: 'white'}}>Имя файла {file.originalname} - Размер файла {Math.floor(Number(file.size) / 1024 / 1024)} Mb</div>

            </Col> :

            <></>

            }


            {

              (logo !== null) ?

              <Col>

                <div style={{color: 'white'}}>Картинка загружена</div>
                <div  style={{color: 'white'}}>Имя файла {logo.originalname} - Размер файла {logo.size} kb</div>

              </Col> :

              <></>

            }

        </Row>


        <Row className="mt-5 d-flex align-items-center" >

            <Col>
              <span style={{color: 'white'}}>Выберите битрейт видео</span>
              <MyRange result={`Выбран битрейт ${bitrate} Kbps`} min={'0'} max={'20000'} step={'500'} value={bitrate} onChange={(e) => setBitrate(e.target.value)}></MyRange>
            </Col>


            <Col>
                <span style={{color: 'white'}}>Выберите формат видео</span>
                <MySelect style={{}} option={aspectRatio} value={aspect} defaultValue={aspectRatio[0]} onChange={(e) => setAspect(e.target.value)}></MySelect>
            </Col>


            <Col>
                <span style={{color: 'white'}}>Выберите разрешение видео</span>
                <MySelect style={{}} option={sizeVideo} value={size} defaultValue={sizeVideo[0]} onChange={(e) => setSize(e.target.value)}></MySelect>
            </Col>
        </Row>





        {
          (start === true) ? <Row className="mt-5 d-flex flex-column">
          <span style={{color: 'white'}}>{statusText}</span>
          <Col><MyProgressBar value={progress} max={'100'}></MyProgressBar></Col>
          <span style={{color: 'white'}}>{`Конвертация ${progress}%`}</span>
        </Row> : <></>

        }



        <Row className="mt-5">

          {(finish == true) ? <Col className='d-flex flex-row justify-content-around'><Col md={5}><MyButton style={{}} onClick={() => startConversion(bitrate, aspect, size, logo.path, file.path)} disabled={true} text={'Файл готов'}></MyButton></Col> <Col md={5}><a href="http://localhost:5000/api/v1/download"><MyButton text={'Скачать'} onClick={() => {downloadFile(file)}}></MyButton></a></Col> </Col>  : <Col><MyButton style={{}} onClick={() => startConversion(bitrate, aspect, size, logo.path, file.path)} disabled={(file === null) ? true : false} text={(file === null) ? 'Файл не загружен' : 'Старт'}></MyButton></Col>}


        </Row>

    </Container>
  )
}

export default App
