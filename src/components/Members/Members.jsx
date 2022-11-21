import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import banner from '../../img/banner1.jpg';
import banner2 from '../../img/banner2.jpg';
import { FaEdit, FaEye, FaLock, FaLockOpen, FaPhone, FaTrash } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import fireDb from '../../firebase';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

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
  const [data, setData] = useState({});
  const [group, setGroup] = useState({});
  const [search, setSearch] = useState('');
  const userId = user?.uid;
  const navigate = useNavigate();
  useEffect(() => {
    fireDb.child('members').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  useEffect(() => {
    fireDb.child('groups').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setGroup({ ...snapshot.val() });
      } else {
        setGroup({});
      }
    });

    return () => {
      setGroup({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      fireDb.child(`members/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success('Member Deleted Successfully');
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`);
    setSearch('');
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      user(null);
    });
  };

  return (
    <>
      <NavWrapper>
        <LogoWrapper>
          <h1>VACI</h1>
        </LogoWrapper>
        <AccWrapper>
          {userId ? (
            <div>
              <img src={banner} alt={user?.displayName} />
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
          <div></div>
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
        <div className="search">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search a member"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </form>
        </div>
        <MembersContainer>
          <LeftContent>
            <article>
              {Object.keys(data).map((id, index) => {
                return (
                  <div key={id} className="memBox">
                    <div className="member-wrapper">
                      <div>
                        <span>
                          <h5>{index + 1}</h5>
                        </span>
                        <h5>{data[id].name}</h5>
                        <p>{data[id].gender}</p>
                        <span className="work">
                          <Link to={`/update/${id}`}>
                            <p>
                              <FaEdit className="edit" />
                            </p>
                          </Link>
                          <p
                            onClick={() => {
                              onDelete(id);
                            }}>
                            <FaTrash className="del" />
                          </p>
                          <Link to={`/view/${id}`}>
                            <p>
                              <FaEye className="view" />
                            </p>
                          </Link>
                        </span>
                      </div>
                      <div>
                        <h5>{data[id].group}</h5>
                        <a href={`tel:/${data[id].contact}`}>
                          <FaPhone className="phone" />
                          {data[id].contact}
                        </a>
                        <p>{data[id].location}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </article>
          </LeftContent>
          <RightContent>
            <article>
              {Object.keys(group).map((id, index) => {
                return (
                  <div key={id} className='memBox'>
                    <div className="member-wrapper">
                    <div>
                      <span>
                        <h5>{ index + 1}</h5>
                      </span>
                      <h3>{group[id].groupName}</h3>
                      <p>{group[id].groupLeader}</p>
                    </div>
                    <div>
                        <p><small>{group[id].groupDesc.substring(0, 60)}...</small></p>
                        <a href={`tel:/${group[id].groupContact}`}>
                          <FaPhone className="phone" />
                          {group[id].groupContact}
                        </a>
                        <span>
                        <Link to={`/group/${id}`}>
                            <p>
                              <FaEye className="view" />
                            </p>
                          </Link>
                        </span>
                    </div>
                    </div>
                  </div>
                )
              })}
            </article>
          </RightContent>
        </MembersContainer>
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
  h1 {
    color: #ffa600;
    font-size: 30px;
    font-weight: 700;
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
      width: 20px;
      height: 20px;
      border-radius: 50px;
      border: 2px solid #ffa600;
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
      width: 80%;
    }
  }
`;

const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: 69% 30%;
  gap: 1%;
  width: 98%;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 49% 50%;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const LeftContent = styled.div`
  background: rgba(18, 4, 214, 0.041);
  border-radius: 5px;
  padding: 10px;
  height: 90%;
  overflow-y: scroll;
  @media screen and (max-width: 1024px) {
    height: 50%;
    overflow-y: scroll;
  }
  @media screen and (max-width: 798px) {
    height: 100%;
    overflow-y: scroll;
  }
  article {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1%;
    .memBox {
      margin-bottom: 10px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 0 10px rgba(16, 3, 94, 0.103);
      cursor: pointer;
      .member-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        div {
          width: 100%;
          padding: 2px 8px;
          img {
            width: 40%;
          }

          .work {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 5px 0;

            .edit {
              color: green;
              font-size: 12px;
            }
            .del {
              color: red;
              font-size: 12px;
            }
            .view {
              color: blue;
              font-size: 12px;
            }
          }

          h5,
          h6 {
            font-size: 17px;
            font-weight: 700;
          }

          p {
            line-height: 1.6;
            font-size: 18px;
            font-weight: 500;
          }

          a {
            display: flex;
            align-items: center;
            gap: 5px;
            color: rgba(13, 0, 128, 0.781);
            font-size: 18px;
            font-weight: 500;
            padding: 2px 0;

            .phone {
              font-size: 10px;
            }
          }
        }
      }
    }

    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 5px;
      .member-wrapper {
        div {
          padding: 2px 0;
        }
      }
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      .member-wrapper {
        div {
          padding: 2px 0;
        }
      }
    }
  }
`;

const RightContent = styled.div`
  background: rgba(15, 11, 221, 0.075);
  border-radius: 5px;
  padding: 15px;
  height: 90%;
  overflow-y: scroll;
  @media screen and (max-width: 1024px) {
    height: 50%;
    overflow-y: scroll;
  }
  @media screen and (max-width: 798px) {
    height: 100%;
    overflow-y: scroll;
  }
  article {
    display: grid;
    grid-template-columns: 1fr;
    .memBox {
      margin-bottom: 10px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 0 10px rgba(16, 3, 94, 0.103);
      cursor: pointer;
      .member-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        div {
          width: 100%;
          padding: 2px 8px;
          img {
            width: 40%;
          }

          h5,
          h6 {
            font-size: 17px;
            font-weight: 700;
          }

          p {
            line-height: 1.6;
            font-size: 18px;
            font-weight: 500;
          }

          a {
            display: flex;
            align-items: center;
            gap: 5px;
            color: rgba(13, 0, 128, 0.781);
            font-size: 18px;
            font-weight: 500;
            padding: 2px 0;

            .phone {
              font-size: 10px;
            }
          }
        }
      }
    }

    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 1%;
      .member-wrapper {
        div {
          padding: 2px 0;
        }
      }
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      .member-wrapper {
        div {
          padding: 2px 0;
        }
      }
    }
  }
`;

export default Members;
