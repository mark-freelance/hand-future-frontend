import { useState } from 'react'
import _ from 'lodash'
import { genPascalWithSpace } from '../../supports/utils/algo'

export interface InputAction {
  type: string
  value: string
}


export interface InputTextProps {
  label?: string
  labelStyle?: string
  type: string
  containerStyle?: string
  defaultValue?: string
  placeholder?: string
  update: (props: InputAction) => void
  addonRight?: React.ReactNode
}

function InputText({
                     defaultValue,
                     update,
                     type,
                     label,
                     placeholder,
                   }: InputTextProps) {
  const updateInputValue = (value: string) => {
    update({ type, value })
  }

  return <div className={'form-control mt-4 w-full'}>
    <label className="input-group">
      <span className={'w-28'}>{label ?? genPascalWithSpace(type)}</span>
      <input type={type || 'text'} defaultValue={defaultValue} placeholder={placeholder}
             className="input input-bordered flex-1"
             onChange={(e) => updateInputValue(e.target.value)}/>
    </label>
  </div>

}


export default InputText
