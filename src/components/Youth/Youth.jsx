import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import banner from '../../img/banner1.jpg';
const youthImg = [
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
  },
];
const Youth = ({ closeYouth }) => {
  return (
    <>
      <YouthWrapper>
        <button
          onClick={() => {
            closeYouth(false);
          }}>
          <FaTimes />
        </button>
        <article>
          {youthImg.map((youth, index) => {
            return (
              <div key={index}>
                <img src={youth.img} alt="vaci youths" />
                <p>{youth.date}</p>
              </div>
            );
          })}
        </article>
      </YouthWrapper>
    </>
  );
};

const YouthWrapper = styled.div`
  padding: 30px;
  position: absolute;
  right: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(4, 6, 116, 0.096);
  width: 70%;
  height: 100%;
  z-index: 100;
  transform: scale(1.08);
  transform: translateY(-35rem);
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

  @media screen and (max-width: 768px) {
    width: 98%;
    left: 0;
    article {
      grid-template-columns: 1fr;
    }
  }
`;

export default Youth;
