import { FC, CSSProperties } from 'react'

//


interface MySelectProps {
  option:string[] | number[]
  value: string | any
  defaultValue?: string | any
  style?: CSSProperties
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void

}


const MySelect: FC<MySelectProps>  = ({option, value, defaultValue, style, onChange}) => {
  return (
    <select style={{width: '100%', height: '60px', outlineColor: '#f5822a', paddingLeft: '10px', ...style}} value={value} onChange={onChange} defaultValue={defaultValue}>

      {option.map((item) => {
        return <option>{item}</option>
      })}

    </select>
  )
}

export default MySelect
