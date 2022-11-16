import styled from "styled-components";
import banner from '../../img/banner1.jpg';
export const RegisterWrapper = styled.div`
 background: url(${banner});
 background-size: cover;
 background-position: center;
 min-height: 100vh;
 display: flex;
 align-items: center;
 justify-content: center;
`

export const RegisterContainer = styled.div`
 background: #fff;
 border-radius: 10px;
 width: 60%;
 margin: 0 auto;
 min-height: 500px;

 article{
    display: flex;
    align-items: center;
    justify-content: center;

    div{
        width: 100%;
        img{
            width: 80%;
        }
    }

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        input, button{
            background: #fff;
            box-shadow: 0 0 16px rgba(17, 0, 255, 0.021);
            border-radius: 5px;
            font-size: 15px;
            font-weight: 600;
            padding: 16px 10px;
            width: 90%;
            margin: 10px;
        }

        label{
            background: rgba(1, 1, 46, 0.041);
            cursor: pointer;
            padding: 13px 5px;
            width: 50%;
            margin-left: 13px;
            border-radius: 50px;
            text-align: center;
            font-weight: 600;
        }

        button{
            background: rgba(236, 98, 5, 0.87);
            font-weight: 700;
            cursor: pointer;
        }

        div{
            margin-top: 14px;
            padding: 0 20px;
            cursor: pointer;

            p{
             color: rgb(1, 0, 10);
             font-weight: 600;
             text-decoration: underline;
            }
        }
    }
 }

 h1{
    text-align: center;
    padding: 10px;
    color: rgb(1, 16, 44);
    margin: 0 auto;
    width: max-content;
 }

 @media screen and (max-width: 1024px) {
    width: 90%;
 }
 @media screen and (max-width: 768px) {
    width: 98%;
    min-height: 650px;
    article{
        flex-direction: column;

        div{
            margin: 0 auto;
            img{
                width: 60%;
                margin: 0 auto;
            }
        }

        form{
            input{
                font-size: 18px;
            }

            div{
                p{
                    padding-bottom: 10px;
                }
            }
        }
    }
 }
`