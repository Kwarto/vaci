import React,  { useState, useEffect }  from 'react';
import styled from 'styled-components';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';
import DetailMember from '../Members/DetailMember';

const ViewGroup = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [member, setMember] = useState([]);
  const getSingMember = async () => {
    const memRef = collection(db, 'members');
    const memQuery = query(memRef, where('trending', '===', 'Yes'));
    const querySnapshot = await getDoc(memQuery);
    let member = [];
    querySnapshot.forEach((doc) => {
      member.push({ id: doc.id, ...doc.data() });
    });
    setMember(member);
  };

  useEffect(() => {
    getSingMember();
    id && getGroupDetails();
    // eslint-disable-next-line
  }, [id]);
  const getGroupDetails = async () => {
    const docRef = doc(db, 'groups', id);
    const groupDetail = await getDoc(docRef);
    setGroup(groupDetail.data());
  };
  return (
    <>
      <ViewGroupWrapper style={{backgroundImage: `url('${group?.grpImg}')`}}>
       <h1>{ group?.groupName}</h1>
      </ViewGroupWrapper>
      <GroupAbt>
        <article className='left'>
        <div className="top">
          <img src={group?.grpImg} alt={group?.groupName} />
          <h2>{ group?.groupLeader}</h2>
        </div>
        <div className="desc">
          <h4>{`The Biblical Meaning of ${group?.groupName} Is ${group?.groupDesc}`}</h4>
          <div>
            <p>This group was created as an opportunity to share our different perspectives and insights and are broadened because of the interaction. More information is retained when there is active involvement, so biblical literacy is enhanced. Application and accountability bring understanding that moves God’s Word from the intellect to the heart. Transformation is encouraged (Romans 12:2), and our lives are changed. When our lives are changed, the lives of those around us are changed as well.</p>
          </div>
        </div>
        </article>
        <article className='right'>
          <DetailMember member={ member} />
        </article>
      </GroupAbt>
    </>
  )
}

const ViewGroupWrapper = styled.div`
 min-height: 60vh;
 background-position: center;
 background-size: cover;
 display: flex;
 align-items: center;

 h1{
  font-size: 50px;
  background: rgb(255, 255, 255);
  box-shadow: 0 10px .5rem rgba(2, 7, 80, 0.082);
  margin: 0 auto;
  text-align: center;
  transform: translateY(12rem);
  width: 30rem;
 }
`

const GroupAbt = styled.div`
display: grid;
grid-template-columns: 70% 29%;
gap: 1%;
margin-left: 20px;
  .top{
    display: flex;
    align-items: center;
    gap: 30px;
    margin-top: 5%;
    border-bottom: 1px solid grey;
    padding-bottom: 8px;
    width: 75%;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50px;
    }
  }
  .desc{
    padding: 10px 0;
    h4{
      font-size: 30px;
      padding-bottom: 10px;
    }
    div{
      p{
        font-size: 20px;
        max-width: 700px;
        text-align: justify;
      }
    }
  }
`




export default ViewGroup