import { FC, CSSProperties } from 'react'
import './../App.css'

//

interface MyInputFileProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  style?: CSSProperties
}

const MyInputFile: FC<MyInputFileProps> = ({ onChange, style }) => {
  return (

      <input style={{marginTop: '10px', background: 'white', width: '100%', height: '60px', ...style}} type="file" onChange={onChange}/>


  )
}

export default MyInputFile
