import styled from 'styled-components';
import { CardBody } from 'oah-ui';

const GuideStyle = styled.div`
  ${CardBody} {
    padding: 2rem;
    & > *:last-child {
      margin-bottom: 0;
      & *:last-child {
        margin-bottom: 0;
      }
    }
  }
  ul {
    margin-bottom: 1.5rem;
    ul {
      padding-left: 2.5rem;
      list-style-type: none;
      & > li {
        text-indent: -5px;
        position: relative;
        margin-bottom: 0;

        &::before {
          content: '-';
          position: absolute;
          left: -1.25rem;
        }
      }
    }
    li {
      font-size: 0.9375rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }
  }
`;
export default GuideStyle;
