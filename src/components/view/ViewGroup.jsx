import React, { useEffect, useState } from 'react';
import fireDb from '../../firebase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPhone } from 'react-icons/fa';

const ViewGroup = () => {
const [group, setGroup] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fireDb
      .child(`groups/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setGroup({ ...snapshot.val() });
        } else {
          setGroup({});
        }
      });
  }, [id]);
  return (
    <ViewGroupWrapper>
        <article>
          <div className="card">
            <div className="card-header">
             <h3>{group.groupName}</h3>
             <p>
             <a href={`tel:/${group.groupContact}`}><FaPhone className='phone' />{group.groupContact}</a>
             </p>
             <h4>{group.groupLeader}</h4>
             <p>{group.groupDesc}</p>
            </div>
        </div>
        </article>
    </ViewGroupWrapper>
  )
}

const ViewGroupWrapper = styled.div`
 width: 60%;
 margin: 10% auto;
 padding: 10px;

 article{
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(255, 255, 255);
  box-shadow: 0 1rem .5rem rgba(8, 5, 145, 0.075);
  border-radius: 10px;
  padding: 10px;
 
  .card{
    .card-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      h3{
        text-align: center;
        font-size: 40px;
        padding-bottom: 10px;
        color: orange;
      }

      h4{
        font-size: 20px;
        padding-bottom: 20px;
      }
      p{
        line-height: 1.6;
        font-size: 18px;
        max-width: 480px;
        margin: 0 auto;
        text-align: center;

        a{
          display: flex;
          align-items: center;
          gap: 8px;
          color: blue;
          padding-bottom: 20px;
          .phone{
            font-size: 12px;
          }
        }
      }
    }
  }
 }

 @media screen and (max-width: 768px){
  width: 98%;
  margin: 20% auto;
 }
`

export default ViewGroup