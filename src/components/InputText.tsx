  import { useState } from 'react'
  import _ from 'lodash'

  export interface InputTextProps {
    labelTitle?: string
    labelStyle?: string
    type: string
    containerStyle?: string
    defaultValue: string
    placeholder?: string
    update: Function
    addonRight?: React.ReactNode
  }

  function InputText({
                       defaultValue,
                       update,
                       type,
                       containerStyle,
                       labelStyle,
                       labelTitle,
                       placeholder,
                       addonRight
                     }: InputTextProps) {


    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val: string) => {
      setValue(val)
      update({ type, value: val })
    }

    return (
      <div className={`form-control w-full mt-4 ${containerStyle}`}>
        <label className="label">
          <span className={'label-text text-base-content ' + labelStyle}>{labelTitle ?? _.capitalize(type)}</span>
        </label>

        <div className={' flex justify-between items-center gap-2'}>
          <input type={type || 'text'} value={value} placeholder={placeholder || ''}
                 onChange={(e) => updateInputValue(e.target.value)} className="input  input-bordered flex-1"/>

          {addonRight}
        </div>

      </div>
    )
  }


  export default InputText
