import React from 'react';

// Libraries
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

// Components
import Button from '../components/shared/Button';

// Assets
import home from '../../config/home';

const Container = styled.div`
  ${tw`
    bg-color-secondary
    grid
    h-full
    font-roboto
    justify-center
    text-center
    justify-items-center
    items-center
    p-5
    /* overflow-x-hidden */
    overflow-y-hidden
    `}
`;
const Heading = styled.div`
  ${tw`
    text-6xl
    flex
    justify-center
    items-center
    gap-4
    m-4
    `}
`;
const Description = styled.p`
  ${tw`
    row-span-2
    text-center
    text-sm
    text-frame-gray
    w-1/2
    md:w-full
    sm:w-full
    `}
`;
const Red = styled.span`
  ${tw`
    text-frame-red
    `}
`;

const SlimText = styled.span`
  ${tw`
    font-light
    text-white
    `}
`;

const Home = () => (
  <>
    <Helmet>
      <title>Miami Hack Week - POMP</title>
      <meta name='Hack Week DAO - POMP' contect='Proof of Membership for Hack Week' />
    </Helmet>
    <Container>
      <Heading>
        <h1>
          <Red>Hack Week DAO</Red>
        </h1>
        <SlimText>POMP</SlimText>
      </Heading>
      <Description>{home.description}</Description>
      <Link to='/frame'>
        <Button>{home.button}</Button>
      </Link>
    </Container>
  </>
);

export default Home;
