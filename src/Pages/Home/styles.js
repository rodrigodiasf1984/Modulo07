import { darken } from 'polished';
import styled, {
  keyframes,
  css,
} from 'styled-components'; /* usa a biblioteca para os estilos do component */

/* Animação para gira o spinner do botão */
const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }
  to{
    transform:rotate(360deg);
  }
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }
    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }
    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }
    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
      ${props =>
        props.loading &&
        css`
          > svg {
            animation: ${rotate} 2s linear infinite;
          }
        `}
    }
  }
`;

export const EmptyCart = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
`;

export const EmptyCartText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 18px;
`;
