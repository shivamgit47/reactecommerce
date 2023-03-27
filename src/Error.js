import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './styles/Button'
const Error = () => {
  return (
    <Wrapper>
      <div className='container'>
        <div>
          <h2>404</h2>
          <h3>AH OH! You're lost.</h3>
          <p>The page you are looking for dose not exist.How you got here is a mystery
          .But you can click the button to go back to the homepage.
          </p>
          <NavLink to="/">
          <Button>Go Back to Home</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
.container{
  padding: 9rem 0;
  text-align : center;
h1{
  font-size:10rem;
}
h3
{
  font-size:4.2rem 0;
}
p
{
  margin:2rem 0;
}
}
`;
export default Error
