import React from 'react'
import { FaTimes, FaTv } from 'react-icons/fa';
import styled from 'styled-components';
import video from '../../img/video.mp4';
const Live = ({closeLive}) => {
  return (
      <>
       <LiveWrapper>
         <div>
         <h3>VACI TV <FaTv /></h3>
         <span onClick={() => {closeLive(false)}}><FaTimes className='close'/></span>
         </div>
         <video src={video} autoPlay={true} controls></video>     
       </LiveWrapper>
      </>
  )
}

const LiveWrapper = styled.div`
 background: #fff;
 box-shadow: 0 0 10px rgba(0, 0, 255, 0.068);
 border-radius: 2px;
 width: 75%;
 height: 600px;
 position: fixed;
 top: 1.3rem;
 z-index: 100;

 div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;

    h3{
        font-weight: 700;
        color: rgb(255, 0, 0);
        margin-left: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    span{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    cursor: pointer;
    float: right;
    .close{
        font-size: 20px;
        color: rgb(1, 10, 20);
        margin-right: 8px;
    }
 }
 }
 
 
 video{
    width: 100%;
    height: 100%;
 }


 @media screen and (max-width: 1024px) {
  top: 10rem;
  width: 98%;
  height: 600px;
    video{
      width: 100%;
      height: 100%;
    }

    div{
      height: 30px;
    }
 }

 @media screen and (max-width: 768px) {
  top: 8rem;
  height: 400px;
  width: 100%;
    video{
      width: 100%;
      height: 100%;
    }

    div{
      height: 30px;
    }
 }
`

export default Live