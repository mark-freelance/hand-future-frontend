import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import RegisterCore from './RegisterCore'


const RegisterDialog = () => {
  const [open, setOpen] = useState(false)
  // 默认已经注册了！
  const [isRegistered, setRegistered] = useState(true)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="avatar placeholder w-10">
            <div className="bg-neutral-focus text-neutral-content rounded-full ">
              <span className="text-sm">M</span>
            </div>
          </div>
        </label>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* bg-base 很重要，因为继承下来的bg是透明的，导致这里的padding会泄露下方的元素，推荐使用bg-base； dark mode 可以考虑使用 bg-gray-800  */}
        <Dialog.Content
          className="z-50 bg-base-100 p-[25px] data-[state=open]:animate-contentShow fixed top-[15%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] rounded-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title className=" m-0 text-[17px] font-medium">
            注册/登录
          </Dialog.Title>

          <RegisterCore
            isRegistered={isRegistered}
            dispatchSetRegister={() => setRegistered(!isRegistered)}
            dispatchClose={() => setOpen(false)}
          />

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
