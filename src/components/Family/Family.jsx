import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Family = ({groups}) => {
  return (
      <FamilyWrapper>
        {groups?.map((item) => (
        <div key={item.id}>
          <div>
            <Link to={`/group/${item.id}`}>
              <img src={item.grpImg} alt={item.groupName} />
            </Link>
            <div className="abt">
              <Link to={`/group/${item.id}`}>
                <h2>{item.groupName}</h2>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </FamilyWrapper>
  )
}

const FamilyWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  transition: all 2s ease;
  transform-origin: top center;

  .abt{
    transform: translateY(-4rem);
    margin-left: 16px;
    background: #fff;
    padding: 8px 2px;
    h2{
        font-size: 16px;
        font-weight: 600;
        color: black;
    }
  }

  @media screen and (max-width: 768px){
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`

export default Family