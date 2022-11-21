import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaPhone } from 'react-icons/fa';
import fireDb from '../../firebase';

const Search = () => {
    const [data, setData] = useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get("name");
    console.log("search", search);

    useEffect(() => {
      searchData();
    }, [search])

    const searchData = () => {
        fireDb.child("members").orderByChild("name").equalTo(search).on("value", (snapshot) => {
        if (snapshot.val()) {
            const data = snapshot.val();
            setData(data);
        }
    })
    }
  return (
    <SearchContent>
        {
        Object.keys(data).length === 0 ? (
          <div className='err-msg'>
            <h2>No Search Found With That Name: {query.get("name")}</h2>
            <small>Search Name Must Be Capitalize</small>
          </div>
          
        ) : (
          <article>
          {Object.keys(data).map((id) => {
            return (
              <div key={id} className='searchBox'>
                <article>
                 <div>
                  <div>
                    <h5>{data[id].name}</h5>
                    <p>{data[id].gender}</p>
                    <h5>{data[id].group}</h5>
                  </div>
                  <div>
                    <a href={`tel:/${data[id].contact}`}>
                      <FaPhone className="phone" />
                      {data[id].contact}
                    </a>
                    <p>{ data[id].location }</p>
                  </div>
                 </div> 
                </article>
                <article>
                <div>
                  <div>
                    <h5>{data[id].nextPerson}</h5>
                    <p>{data[id].marital}</p>
                    <h5>{data[id].occupation}</h5>
                  </div>
                  <div>
                    <a href={`tel:/${data[id].nextPersonContact}`}>
                      <FaPhone className="phone" />
                      {data[id].contact}
                    </a>
                    <p>{ data[id].digitalAdd }</p>
                  </div>
                 </div> 
                </article>
              </div>
            );
          }) 
          }
        </article>
          )
        }
          </SearchContent>
  )
}

const SearchContent = styled.div`
width: 40%;
height: 300px;
margin: 10% auto;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 0 10px rgba(16, 3, 94, 0.103);
border-radius: 10px;

.err-msg{
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  small{
    font-size: 14px;
    color: red;
  }
}
.searchBox{
  display: flex;
  align-items: center;
  justify-content: center;
 }
 article{
  width: 100%;
  margin: 0 auto;
   div {
     width: 100%;
     padding: 8px 8px;
     img {
       width: 40%;
     }
     p{
      font-size: 18px;
      line-height: 1.7;
     }
     a{
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 18px;
      .phone{
        font-size: 14px;
      }
     }
     h5{
      font-size: 18px;
     }
   }
 }
`

export default Search