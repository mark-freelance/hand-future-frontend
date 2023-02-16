import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import Register from './Register'


const RegisterDialog = () => {
  const [isRegister, setRegister] = useState(false)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span className="text-sm">注册</span>
            </div>
          </div>
        </label>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0"/>
        <Dialog.Content
          className="z-50 data-[state=open]:animate-contentShow fixed top-[15%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] rounded-[6px] bg-gray-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className=" m-0 text-[17px] font-medium">
            注册/登录
          </Dialog.Title>

          <Register isRegister={isRegister} dispatchSetRegister={() => setRegister(!isRegister)}/>

          <Dialog.Close asChild>
            <button
              className=" hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon/>
            </button>
          </Dialog.Close>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default RegisterDialog
