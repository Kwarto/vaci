import React, { useEffect, useState } from 'react';
import fireDb from '../../firebase';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
const View = () => {
  const [member, setMember] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fireDb
      .child(`members/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMember({ ...snapshot.val() });
        } else {
          setMember({});
        }
      });
  }, [id]);
    console.log(member);
  return (
    <ViewWrapper>
       <ViewContainer>
       <article>
       
        <div className="card">
            <div className="card-header">
             <h3>{member.name}</h3>
             <p>{member.gender}</p>
             <p>
             <a href={`tel:/${member.contact}`}>{member.contact}</a>
             </p>
             <p>{member.dateOfBirth}</p>
             <p>{member.location}</p>
             <p>{member.digitalAdd}</p>
            </div>
        </div>
        <div>
           <p>{member.education}</p>       
           <p>{member.marital}</p>    
           <p>{member.occupation}</p>    
           <p>{member.father}</p>       
        </div>
              <small>Mother: { member.lifeMother}</small>
      </article>
      <article>
        <div className="card-header">
         <h3>{member.group}</h3>
         <h5>{member.nameOfLeader}</h5>
         <p>{member.mother}</p>
         <p>{member.nextPerson}</p>
        </div>
        <div>
          <span>
           <p>{member.spouseName}</p>
           <p>{member.spouseContact}</p>
          </span>
         <strong>
            <small>{member.nextPersonContact}</small>
         </strong>
        </div>
        <small>Father: { member.lifeFather}</small>
      </article>
       </ViewContainer>
      <Link to="/members_and_families">
        <button>Go Back</button>
      </Link>
    </ViewWrapper>
  );
};

const ViewWrapper = styled.section`
 min-height: 100vh;
 display: flex;
 align-items: center;
 flex-direction: column;
 justify-content: center;

 button{
    margin-top: 20px;
    padding: 8px 20px;
    cursor: pointer;
    font-size: 16px;
 }
`;

const ViewContainer = styled.div`
 min-height: 60vh;
 width: 50%;
 background: #fff;
 border-radius: 5px;
 box-shadow: 0 0 10px rgba(28, 15, 207, 0.062);
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 1rem;
 margin: 0 auto;
 padding: 12px;

 article{
    div{
        background: white;
        margin: 20px 0;

        p{
            font-size: 20px;
            line-height: 1.7;
        }

        h2, h3, h5, h6{
            font-size: 22px;
        }

        small{
            font: 16px;
        }
    }
 }


 @media screen and (max-width: 768px){
   width: 98%;
   grid-template-columns: 1fr;
   h2, h3, h5, h6{
            font-size: 18px;
        }
 }
`

export default View;
