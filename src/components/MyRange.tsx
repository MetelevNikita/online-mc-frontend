import { FC, CSSProperties } from 'react'

//  css

import './../App.css'

interface MyRangeProps {

  result: string
  min: string
  max: string
  step: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const MyRange: FC<MyRangeProps> = ({result, min, max, step, value, onChange }) => {
  return (

    <div style={{width: '100%', height:'60px'}}>
      <input style={{width: '100%', height:'20px'}} type="range" min={min} max={max} step={step} value={value} onChange={onChange}/>
      <span style={{color: 'white'}}>{result}</span>
    </div>


  )
}

export default MyRange
