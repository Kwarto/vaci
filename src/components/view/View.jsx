import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import logoImg from '../../img/vaci-logo.jpg';

const View = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  useEffect(() => {
    id && getMemberDetails();
    // eslint-disable-next-line
  }, [id]);
  const getMemberDetails = async () => {
    const docRef = doc(db, 'members', id);
    const memberDetail = await getDoc(docRef);
    setMember(memberDetail.data());
  };

  return (
    <ViewWrapper>
      <ViewContainer>
        <div className="detail-header">
          <h1>Victory Abundance Chapel <span>International</span></h1>
          <img src={logoImg} alt="vaci-logo" />
        </div>
        <div className="disclaimer">
          <p>
            Information is shared by or within VACI for the objective of
            accuracy and security. Information is shared in good faith and there
            are no explicit or implied guarantees or warranties to the veracity
            or applicability of the information shared within VACI, and Members
            agree that such information is provided “as is”.
          </p>
        </div>
        <div className="personal">
          <div className="mem-img">
            <img src={member?.imgUrl} alt={member?.name} />
          </div>
          <div className="mem-info">
            <h2>Name: {member?.name}</h2>
            <h3>Location: {member?.location}</h3>
            <h3>Contact: {member?.contact}</h3>
            <h3>Family Name: {member?.group}</h3>
          </div>
        </div>
        <article className="other-info">
          <table>
            <tr>
              <td>
                <div className="left con">
                  <p>Baptism ({member?.baptism})</p>
                  <p>{member?.dateOfBirth}</p>
                  <span>
                    <p>{member?.father}</p>
                    <p>{member?.lifeFather}</p>
                  </span>
                  <span>
                    <p>{member?.mother}</p>
                    <p>{member?.lifeMother}</p>
                  </span>
                  <p>{member?.marital}</p>
                  <p>{member?.occupation}</p>
                  <p>{member?.education}</p>
                  <p>{member?.gender}</p>
                </div>
              </td>
              <td>
                <div className="right con">
                  <p>{member?.nameOfLeader}</p>
                  <p>{member?.nextPerson}</p>
                  <span>
                    <p>{member?.nextPersonContact}</p>
                  </span>
                  <span>
                    <p>{member?.spouseName}</p>
                  </span>
                  <p>{member?.spouseContact}</p>
                  <p>{member?.numberOfChildren}</p>
                  <p>{member?.education}</p>
                  <p>{member?.digitalAdd}</p>
                </div>
              </td>
            </tr>
          </table>
        </article>
        <div className="sign">
          <div className='sign-area'>

          </div>
          <h2>Rev. Joshua Baffour Awuah</h2>
          <span>(Founder / General Overseer)</span>
        </div>
      </ViewContainer>
    </ViewWrapper>
  );
};

const ViewWrapper = styled.section`
  padding: 10px 0;
  overflow-x: hidden;

  .p-btn {
    background: transparent;
    text-align: center;
    padding-left: 30px;
    font-size: 18px;
    text-decoration: underline;
    cursor: pointer;
    color: blue;
  }
`;

const ViewContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  .detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid grey;
    padding-bottom: 5px;
    h1 {
      font-size: 30px;
      font-weight: 600;
    }

    @media screen and (max-width: 768px){
      h1{
        font-size: 20px;
        span{
        text-align: center;
        margin: 0 45px;
      }
      }
      
    }
  }

  .disclaimer {
    border-bottom: 1px solid grey;
    padding: 10px 5px;
    p {
      font-size: 20px;
      text-align: justify;
    }

    @media screen and (max-width: 768px){
      p{
        font-size: 13px;
      }
    }
  }

  .personal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 3px;
    .mem-img {
      img {
        width: 150px;
        height: 180px;
      }
    }
    .mem-info {
      h3 {
        padding: 3px 0;
      }
    }

    @media screen and (max-width: 768px){
      gap: 10px;
      .mem-info{
        font-size: 13px;
      }
    }
  }

  .other-info {
    position: relative;
    margin-top: 20px;
    .con {
      width: 100%;
      p {
        font-size: 20px;
        padding: 5px 0;
      }
      span {
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }
    table {
      width: 100%;
    }

    .right {
      position: absolute;
      top: 0;
      transform: translateX(-14rem);
    }

    @media screen and (max-width: 768px){
      table{
        display: flex;
        flex-direction: column;
      }

      .right{
        top: 20rem;
        margin-left: 20px;
      }
    }
  }

  .sign{
    margin-top: 30px;
    width: 20rem;
    float: right;
    span{
      margin: 0 30px;
      padding: 10px 0;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 600;
    }
    .sign-area{
      padding: 40px 0;
    }
    h2
    {
      text-align: center;
    }

    @media screen and (max-width: 768px){
      transform: translateY(15rem);
      float: left;
    }
  }
`;

export default View;
