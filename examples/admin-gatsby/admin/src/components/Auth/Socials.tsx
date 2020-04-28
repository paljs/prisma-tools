import styled from 'styled-components';
import React from 'react';

const SocialsStyle = styled.section`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  .links {
    font-size: 2.5rem;
    a {
      margin: 0 1rem;
    }
  }
`;

export default function Socials() {
  return (
    <SocialsStyle>
      <p>or enter with:</p>
      <div className="links">
        <a href="https://github.com/AhmedElywa">
          <i className="icon ion-logo-github" />
        </a>
        <a href="https://www.facebook.com/AhmedElywa">
          <i className="icon ion-logo-facebook" />
        </a>
        <a href="https://twitter.com/AhmedElywh">
          <i className="icon ion-logo-twitter" />
        </a>
      </div>
    </SocialsStyle>
  );
}
