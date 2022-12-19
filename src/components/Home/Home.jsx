import React, { useState } from 'react';
import styled from 'styled-components';
import bannerBg from '../../img/banner2.jpg';
import bannerB from '../../img/banner1.jpg';
import Footer from '../Footer/Footer';
import Live from '../Live/Live';
import { FaPlay } from 'react-icons/fa';
import Youth from '../Youth/Youth';
import Kids from '../Kids/Kids';
import { Link } from 'react-router-dom';
const Home = () => {
  const [openLive, setOpenLive] = useState(false);
  const [openYouth, setYouth] = useState(false);
  const [openKid, setKid] = useState(false);
  return (
    <>
      <HomeWrapper>
        <div>
          <h1>WE CAN'T WAIT TO MEET YOU!</h1>
          <p>
            We're excited to welcome you home as part of our church family.
            Below are the details we hope will put you at ease and make your
            experience and inviting one. It's absolutely awesome you're here!
          </p>
          <div className="btn-wrapper">
            <button>SERVICE TIMES</button>
            <button
              onClick={() => {
                setOpenLive(true);
              }}>
              WATCH US LIVE <FaPlay />
            </button>
          </div>
        </div>
        {openLive && <Live closeLive={setOpenLive} />}
      </HomeWrapper>
      <LocationWrapper>
        <div className="head">
          <h1>JOIN US FOR SERVICE</h1>
          <span>SUNDAYS-7:00AM - 8:30AM & 9:00AM - 11:30AM</span>
          <p>
            We suggest arriving 10-15minutes early before church service and for
            Kids and members check-in
          </p>
        </div>
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.621276430709!2d-1.655498685712611!3d6.693741423019065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb9722741779c9%3A0x84caf9453c8cd1bd!2sMovie%20House%20Plaza%20Kwadaso!5e0!3m2!1sen!2sgh!4v1668567237875!5m2!1sen!2sgh"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"></iframe>
        </div>
      </LocationWrapper>
      <OurWrapper>
        {openKid && <Kids closeKids={setKid} />}
        <OurContainer>
          <article
            onClick={() => {
              setKid(true);
            }}>
            <img src={bannerB} alt="" />
            <h2>Kids Service</h2>
          </article>
          <article>
            <Link to='/members_and_families'>
            <img src={bannerBg} alt="" />
            <h2>Members & Families</h2>
            </Link>
          </article>
          <article
            onClick={() => {
              setYouth(true);
            }}>
            <img src={bannerB} alt="" />
            <h2>Youth Fellowship</h2>
          </article>
        </OurContainer>
        {openYouth && <Youth closeYouth={setYouth} />}
      </OurWrapper>
      <NextWrapper>
        <div className="head">
          <h1>Next Step Fellowship</h1>
        </div>
        <div className="txt">
          <p>
            If you're new to <strong>VACI</strong> and you want to get to know
            us better. We would love to have you stop by{' '}
            <strong>Sunday Morning (First Service) 7: 30AM - 8:30AM - (Second Service) 8:30AM - 9:30AM </strong>
            and talk about who we are, what we believe, and our mission here at
            vaci is. We'll have you some snacks and your kids off at Vaci Kids
            Service! Next step fellowship will welcome you to vaci.
          </p>
        </div>
      </NextWrapper>
      <Footer />
    </>
  );
};

const HomeWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.678), rgba(1, 0, 7, 0.651)),
    url(${bannerBg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    h1 {
      font-size: 50px;
      color: #fff;
      padding-bottom: 8px;
    }
    p {
      max-width: 700px;
      text-align: center;
      margin: 0 auto;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.6;
      color: #fff;
    }

    .btn-wrapper {
      padding: 30px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        width: 25%;
        margin: 0 10px;
        padding: 15px 5px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        font-weight: 600;
        color: rgb(0, 11, 31);
        :nth-child(2) {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    min-height: 80vh;
    div{
      h1{
        font-size: 30px;
        text-align: center;
        font-weight: 700;
      }

      p{
        font-size: 16px;
      }

      .btn-wrapper{
        button{
        width: 60%;
        font-size: 16px;
      }
      }
    }
  }

  @media screen and (max-width: 768px) {
    min-height: 80vh;
  }
`;

const LocationWrapper = styled.div`
  padding: 100px 0;

  .head {
    margin: 0 auto;
    width: 80%;
    text-align: center;
    color: rgb(0, 11, 31);

    h1 {
      font-size: 40px;
      padding-bottom: 10px;
    }

    span {
      font-size: 15px;
      font-weight: bold;
    }

    p {
      max-width: 290px;
      margin: 0 auto;
      line-height: 1.6;
      padding-top: 10px;
    }
  }

  .map-wrapper {
    width: 100%;
    height: 80vh;
    margin-top: 5rem;

    iframe {
      height: 100%;
      width: 100%;
    }
  }

  @media screen and (max-width: 1024px) {
    .map-wrapper{
      height: 50vh;
    }
  }

  @media screen and (max-width: 768px) {
    .head{
      width: 100%;
      h1{
        font-size: 30px;
      }
    }
    .map-wrapper{
      height: 50vh;
    }
  }
`;

const OurWrapper = styled.div`
  padding: 60px 0;
  background: rgba(0, 0, 255, 0.062);

  h2{
    text-align: center;
  }
`;

const OurContainer = styled.div`
  width: 88%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  article {
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.062);
    border-radius: 10px;
    padding-bottom: 20px;
    background-color: #fff;
    transition: transform 2s ease;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 10px 10px 0 0;
    }

    h2 {
      font-size: 25px;
      padding: 8px;
      color: rgb(1, 8, 24);
    }

    p {
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      line-height: 1.6;
      color: rgb(1, 8, 24);
      max-width: 500px;
    }

    &:hover {
      transform: translateY(-5px);
    }
  }

  @media screen and (max-width: 1024px) {
    width: 98%;
  }

  @media screen and (max-width: 1024px) {
    width: 98%;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    article{
      p{
        font-size: 18px;
      }
    }
  }
`;

const NextWrapper = styled.div`
  padding: 50px 0;

  .head {
    h1 {
      text-transform: uppercase;
      text-align: center;
      color: rgb(1, 8, 24);
    }
    margin: 0 auto;
    width: 60%;
  }

  .txt {
    width: 70%;
    margin: 0 auto;

    p {
      font-size: 18px;
      max-width: 600px;
      text-align: justify;
      margin: 0 auto;
      line-height: 1.7;
    }
  }

  @media screen and (max-width: 768px){
    .head{
      width: 100%;

      h1{
        font-size: 28px;
      }
    }

    .txt{
      width: 98%;

      p{
        font-size: 18px;
        padding-top: 10px;
        line-height: 1.5;
      }
    }
  }
`;

export default Home;
