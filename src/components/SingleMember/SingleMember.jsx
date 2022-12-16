import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import styled from 'styled-components';
const SingleMember = ({ members, handleDelete }) => {
  return (
    <SingleWrapper>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        breakpoints={{
          0: {
            width: 0,
            slidesPerView: 4,
          },
          768:{
            width: 768,
            slidesPerView: 2,
          },
          425: {
            width: 425,
            slidesPerView: 1,
          }
        }}
        className="swiper">
        <SwiperSlide className="slide">
          {members?.map((item) => (
            <div key={item.id} className="mem-container">
              <div className="mem-img">
                <Link to={`/view/${item.id}`}>
                  <img src={item.imgUrl} alt={item.name} />
                </Link>
                <div className="abt">
                  <Link to={`/view/${item.id}`}>
                    <h2>{item.name}</h2>
                  </Link>
                  <h3>{item.group}</h3>
                  <FaTrash
                    className="act"
                    onClick={() => handleDelete(item.id)}
                  />
                  <Link to={`/update/${item.id}`}>
                   <FaPen className="view" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </SwiperSlide>
      </Swiper>
    </SingleWrapper>
  );
};

const SingleWrapper = styled.div`
  .swiper {
    width: 22rem;
    .slide {
      .mem-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 25rem;
        height: 25vh;
        background: #fff;
        border-radius: 2px;
        padding: 10px;
        .mem-img {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          img {
            width: 120px;
            height: 130px;
            border-radius: 5px;
          }
          .abt {
            h3 {
              font-size: 25px;
              color: rgb(28, 2, 100);
              padding-top: 20px;
              padding-bottom: 8px;
            }

            h2 {
              color: rgb(2, 22, 77);
            }

            .act {
              color: red;
              cursor: pointer;
            }
            .view {
              color: green;
              cursor: pointer;
              margin-left: 12px;
            }
          }
        }

        @media screen and (max-width: 768px) {
          .mem-container {
            width: 15rem;
          }
        }
      }
    }
  }
`;
export default SingleMember;
