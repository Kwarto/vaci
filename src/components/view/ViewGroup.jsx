import React, { useEffect, useState } from 'react';
import fireDb from '../../firebase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
             <a href={`tel:/${group.groupContact}`}>{group.groupContact}</a>
             </p>
             <h4>{group.groupLeader}</h4>
             <p>{group.groupDesc}</p>
            </div>
        </div>
        </article>
    </ViewGroupWrapper>
  )
}

const ViewGroupWrapper = styled.div``

export default ViewGroup