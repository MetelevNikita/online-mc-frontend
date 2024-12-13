import { FC, CSSProperties } from 'react'

//

interface MyButtonProps {
  style?: CSSProperties
  onClick?: () => void
  text: string
}

const MyButton: FC<MyButtonProps> = ({ style, onClick, text }) => {
  return (
    <button style={{width: '100%', height: '60px', paddingLeft: '20px', borderRadius: '10px', ...style}} onClick={onClick}>{text}</button>
  )
}

export default MyButton
