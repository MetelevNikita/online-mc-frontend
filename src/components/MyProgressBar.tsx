import { FC, CSSProperties } from 'react'
import './../App.css'

//

interface MyProgressBarProps {
  style?: CSSProperties
  value: number
  max: string
}




const MyProgressBar: FC<MyProgressBarProps> = ({ style, value, max }) => {
  return (
    <progress className="progress" style={{width: '100%', height: '60px',  ...style}} value={value} max={max} />
  )
}

export default MyProgressBar
