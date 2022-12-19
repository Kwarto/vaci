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
          768: {
            width: 768,
            slidesPerView: 2,
          },
          425: {
            width: 425,
            slidesPerView: 1,
          },
        }}
        className="swiper">
        {members?.map((item) => (
          <SwiperSlide className="slide" key={item.id}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </SingleWrapper>
  );
};

const SingleWrapper = styled.div`
  .swiper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .slide {
      width: 100%;
      background: #fff;
      padding: 8px;
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
      }
      .abt {
        h3 {
          font-size: 18px;
          color: rgb(28, 2, 100);
          padding-top: 20px;
          padding-bottom: 8px;
        }

        h2 {
          color: rgb(2, 22, 77);
          font-size: 20px;
        }

        .act {
          color: red;
          cursor: pointer;
          margin-right: 6px;
        }

        .view {
          color: green;
          cursor: pointer;
        }
      }
    }

    @media screen and (max-width: 768px){
      .slide{
        width: 23rem;
        margin: 8px;
      }
    }
  }
`;
export default SingleMember;

/* .mem-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
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
        font-size: 18px;
        color: rgb(28, 2, 100);
        padding-top: 20px;
        padding-bottom: 8px;
      }

      h2 {
        color: rgb(2, 22, 77);
        font-size: 20px;
      }

      .act {
        color: red;
        cursor: pointer;
      }
      
    }
  }

  @media screen and (max-width: 768px) {
    .mem-container {
      width: 15rem;
    }
  }
} */
