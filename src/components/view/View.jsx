import React, { useEffect, useState } from 'react';
import fireDb from '../../firebase';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fireDb
      .child(`members/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);
    console.log("user", user);
    return (
      <ViewWrapper>
        <Link to='/members_and_families'>
          <button>Go Back</button>
        </Link>
      </ViewWrapper>
  )
};

const ViewWrapper = styled.section`
 
`

export default View;
