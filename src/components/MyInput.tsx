import { FC, CSSProperties } from 'react'

//

interface MyInputProps {
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  style?: CSSProperties

}

const MyInput:FC<MyInputProps> = ({ type, value, onChange, placeholder, style }) => {
  return (
    <input style={{width: '100%', height: '60px', outlineColor: '#f5822a', paddingLeft: '10px', ...style}} type={type} placeholder={placeholder} value={value} onChange={onChange} />

  )
}

export default MyInput
