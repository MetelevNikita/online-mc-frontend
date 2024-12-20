import { FC, CSSProperties } from 'react'

//

interface MyButtonProps {
  style?: CSSProperties
  onClick?: () => void
  text: string
  disabled?: boolean
}

const MyButton: FC<MyButtonProps> = ({ style, onClick, text, disabled }) => {
  return (
    <button style={{width: '100%', height: '60px', paddingLeft: '20px', border: 'none', color: 'white', background: '#FFA155', ...style}} disabled={disabled} onClick={onClick}>{text}</button>
  )
}

export default MyButton
