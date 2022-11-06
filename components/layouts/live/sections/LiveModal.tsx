import React from 'react'
import { atom, useRecoilState } from 'recoil'
import { CloseIcon } from '../../../icons'
import Parser from "react-html-parser";
import { Spinner } from '../../../spinner';


export const LiveModaAtom = atom({
  key:"LiveModaAtom",
  default:false
})

interface Props {
    iframe:string
}

const LiveModal = ({iframe}:Props) => {
  const [openLiveModal,setOpenLiveModal]=useRecoilState(LiveModaAtom)

  return (
    <div>
    <>
      <div
        className={`${
            openLiveModal ? "opacity-100 visible" : "opacity-0 invisible"
        } inset-0  left-0 right-0 top-0 bottom-0 m-auto shadow-lg z-[200] fixed transition-all duration-500 ease-in-out`}
      >
        <div className={`absolute top-[200px] bottom-0 left-0 right-0 m-auto -z-10 ${openLiveModal ? "block" : "hidden"}`}>
          <Spinner className="w-32" />
          </div>
        <div className='flex justify-end' onClick={() => (setOpenLiveModal(false))}>
        <button  className='flex justify-end w-fit' >

        <CloseIcon className='w-12 text-red-700 '/>
        </button>
        </div>
        <div className='video-Modal'>
            {Parser(iframe)}
        </div>
        
      </div>
      {openLiveModal ? (
        <div className="opacity-60 fixed inset-0 z-[190] bg-black "></div>
      ) : null}
    </>
  </div>
  )
}
export default LiveModal