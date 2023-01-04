import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import banner from '../../img/banner1.jpg';
import banner2 from '../../img/banner2.jpg';
import logoImg from '../../img/vaci-logo.jpg';
import SingleMember from '../SingleMember/SingleMember';
import { FaArrowDown, FaArrowUp, FaLock, FaLockOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { db } from '../../firebase';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import Family from '../Family/Family';

const photos = [
  {
    id: 1,
    name: 'Sermon',
    imgPath: banner,
  },
  {
    id: 2,
    name: 'Shakers',
    imgPath: banner2,
  },
];

const Members = ({ user }) => {
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [family, setFamily] = useState(false);

  const handleLogOut = () => {
    signOut(auth).then(() => {});
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'members'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setMembers(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'groups'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setGroups(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member ?')) {
      try {
        await deleteDoc(doc(db, 'members', id));
        toast.success('Member deleted successfully');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <NavWrapper>
        <LogoWrapper>
          <img src={logoImg} alt="logo" />
        </LogoWrapper>
        <AccWrapper>
          {user?.uid ? (
            <div>
              <img src={banner} alt="user" />
              <p>{user?.displayName}</p>
              <button onClick={handleLogOut}>
                <FaLock className="lock" />
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button>
                  <FaLockOpen className="lock" />
                  Login
                </button>
              </Link>
            </div>
          )}
        </AccWrapper>
      </NavWrapper>
      <HeaderSlider>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={50}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          className="swiper">
          <article>
            {photos.map(({ id, name, imgPath }) => {
              return (
                <SwiperSlide className="swiper-slide">
                  <div key={id}>
                    <img src={imgPath} alt={name} />
                  </div>
                </SwiperSlide>
              );
            })}
          </article>
        </Swiper>
      </HeaderSlider>
      <MembersWrapper>
        <div className="func-sec">
          <div className="add">
            <Link to="/add">
              <p>Add Member</p>
            </Link>
            <Link to="/add_group">
              <p>Add Family</p>
            </Link>
            <Link to="/sign_admin">
              <p>Add User</p>
            </Link>
          </div>
          <div className="search">
            <form>
              <input
                type="text"
                placeholder="Search a member"
                onChange={(e) => (e.target.value)}
              />
            </form>
          </div>
        </div>
        <MembersContainer>
          <LeftContent>
            <SingleMember members={members} handleDelete={handleDelete} />
          </LeftContent>
        </MembersContainer>
        <GroupWrapper>
          <article>
            <div className="main">
              <img src={banner2} alt="" onClick={() => setFamily(true)} />
              <div className="action">
                <h1 onClick={() => setFamily(true)} className="a-c">
                  Family <FaArrowDown className="f-a" />
                </h1>
                <p onClick={() => setFamily()} className="a-c">
                  Show Less <FaArrowUp className="f-a" />
                </p>
              </div>
            </div>
            <div></div>
          </article>
          {family && (
            <article className="fam">
              <Family groups={groups} />
            </article>
          )}
        </GroupWrapper>
      </MembersWrapper>
      <Footer />
    </>
  );
};

const NavWrapper = styled.nav`
  min-height: 10vh;
  background: #fff;
  box-shadow: 0 15px 10px rgba(0, 26, 255, 0.075);
  top: 0;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  padding: 5px 0;
  img {
    width: 80%;
  }
`;

const AccWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  p {
    font-size: 16px;
    font-weight: 600;
  }

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50px;
      cursor: pointer;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 8px 15px;
      color: rgb(1, 10, 19);
      background-color: rgba(2, 2, 2, 0.158);
      border-radius: 2px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 700;
      margin-left: 20px;
      .lock {
        font-size: 10px;
      }
    }

    .add {
      color: green;
      cursor: pointer;
    }
  }
`;

const HeaderSlider = styled.div`
  padding: 50px 0;
  .swiper {
    width: 98%;
    .swiper-slide {
      width: 100%;
      height: 70vh;
      div {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .swiper-pagination-bullet {
      background: #ffa600;
      width: 20px;
      height: 20px;
    }

    .swiper-button-next,
    .swiper-button-prev {
      color: #ffa600;
    }

    @media screen and (max-width: 1024px) {
      width: 100%;
      height: 50vh;
      background: rgba(255, 136, 0, 0.041);
      .swiper-pagination-bullet {
        transform: translateY(-10rem);
      }

      .swiper-button-next,
      .swiper-button-prev {
        transform: translateY(-5rem);
        width: 10px;
      }
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      height: 30vh;
      background: rgba(255, 136, 0, 0.041);
      .swiper-pagination-bullet {
        transform: translateY(-1rem);
      }

      .swiper-button-next,
      .swiper-button-prev {
        transform: translateY(-1rem);
        width: 10px;
      }
    }
  }
`;

const MembersWrapper = styled.section`
  overflow-x: hidden;
  .func-sec {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    .search {
      border-radius: 5px;
      box-shadow: 0 10px 10px rgba(242, 242, 250, 0.068);
      min-height: 5vh;
      width: 40%;
      margin: 10px auto;

      input {
        border-radius: 5px;
        width: 100%;
        padding: 15px 10px;
        font-size: 18px;
        background: rgba(4, 4, 95, 0.068);
      }

      @media screen and (max-width: 1024px) {
        width: 70%;
      }
      @media screen and (max-width: 768px) {
        width: 90%;
      }
    }
    .add {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-right: 10px;
      cursor: pointer;
      p {
        font-size: 16px;
        font-weight: 600;
        background: rgb(235, 147, 15);
        color: #fff;
        padding: 8px 15px;
      }
    }
  }
  @media screen and (max-width: 430px) {
    .func-sec {
      width: 98%;
      display: block;
      margin: 0 10px;

      .search {
        width: 96%;
        transform: translateX(-1px);
        input {
          width: 100%;
        }
      }
    }
  }
`;

const MembersContainer = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1%;
  width: 100%;
  /* margin: 0 auto; */
  background: rgba(18, 4, 214, 0.041);
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

const LeftContent = styled.div`
  border-radius: 5px;
  padding: 10px;
`;

const GroupWrapper = styled.section`
  padding: 40px 10px;
  width: 98%;
  margin: 0 auto;
  div {
    width: 100%;
    img {
      width: 100%;
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 5px;

    .a-c {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .f-a {
      font-size: 13px;
    }

    h1 {
      font-size: 25px;
      cursor: pointer;
    }

    p {
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export default Members;
