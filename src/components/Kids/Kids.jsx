import React from 'react'
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import banner from '../../img/banner2.jpg';
const kids = [
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    },
    {
    date: '16th Nov 2022',
    img: banner,
    }
]
const Kids = ({closeKids}) => {
  return (
      <>
       <KidsWrapper>
        <button
          onClick={() => {
            closeKids(false);
          }}>
          <FaTimes />
        </button>
        <article>
         {kids.map((kid, index) => {
            return (
              <div key={index}>
                <img src={kid.img} alt="vaci youths" />
                <p>{kid.date}</p>
              </div>
            );
          })}
        </article>
       </KidsWrapper>
      </>
  )
}

const KidsWrapper = styled.div`
 padding: 30px;
  position: absolute;
  left: 10rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(4, 6, 116, 0.096);
  width: 70%;
  height: 100%;
  z-index: 100;
  transform: scale(1.08);
  transform: translateY(-10rem);
  overflow-y: scroll;

  article {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    div {
      width: 100%;
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
  }

  button {
    background: transparent;
    transform: translateY(-1rem);
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    height: 50%;
    z-index: 10000;
  }

  @media screen and (max-width: 768px){
    width: 98%;
    left: 0;
    transform: translateY(-5rem);
    article{
      grid-template-columns: 1fr;
    }
  }
`;


export default Kids