import React from 'react'
import styled from 'styled-components'
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
const date = new Date();
const Footer = () => {
  return (
      <>
          <FooterWrapper>
              <div>
                <h2>Follow Us</h2>
                <span>
                    <FaFacebook className='socials'/>
                    <FaYoutube className='socials'/>
                </span>
              </div> 
              <div>
                  <p>VACI &copy; {date.getFullYear()} | All Rights Reserved</p>
              </div>
              <div className='dev'>
                 <h2>Dev Info</h2>
                  <span>
                  <FaLinkedin className='socials'/>
                  <FaFacebook className='socials'/> 
                  </span>
              </div>
          </FooterWrapper>
      </>
  )
}

const FooterWrapper = styled.footer`
  background: rgb(255, 255, 255);
  box-shadow: 10px 0 10px rgba(80, 2, 206, 0.075);
  min-height: 13vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  div{
    h2{
        padding: 10px 0;
    }

    p{
        font-weight: 600;
    }

    span{
      .socials{
        margin: 0 8px 0 0;
        cursor: pointer;
        font-size: 36px;
        background: rgb(3, 38, 153);
        color: #fff;
        border-radius: 50px;
        padding: 8px 0;
        transition: 2s ease-in;

        &:hover{
            background: #fff;  
            color: rgb(3, 38, 153);
            box-shadow: 0 0 10px rgba(3, 38, 153, 0.253);
        }
      }
    }
  }

  @media screen and (max-width: 768px){
    min-height: 15vh;
    flex-direction: column;

    .dev{
      display: none;
    }

    padding-bottom: 10px;
  }
`

export default Footer