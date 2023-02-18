import { useState } from 'react'
import _ from 'lodash'
import { genPascalWithSpace } from '../../supports/utils/algo'
import clsx from 'clsx'

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
  maxLen?: number
  textClasses?: string
}

function InputText(props: InputTextProps) {
  const { type, update } = props
  const updateInputValue = (value: string) => {
    update({ type, value })
  }

  return <div className={'form-control mt-4 w-full'}>
    <label className="input-group">
      <span className={'w-28'}>{props.label ?? genPascalWithSpace(props.type)}</span>
      <input maxLength={props.maxLen} type={props.type} defaultValue={props.defaultValue}
             placeholder={props.placeholder}
             className={clsx('input input-bordered flex-1', props.textClasses)}
             onChange={(e) => updateInputValue(e.target.value)}/>
    </label>
  </div>

}


export default InputText
