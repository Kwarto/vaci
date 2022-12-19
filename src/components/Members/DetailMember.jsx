import React from 'react'
const DetailMember = ({ member }) => {
    console.log(member);
  return (
    <div>
        <img src={member?.imgUrl} alt="" />
    </div>
  )
}

export default DetailMember