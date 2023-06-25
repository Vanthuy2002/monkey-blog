import styled from 'styled-components';
import PostNewestLarge from '../Post/PostNewLarge';
import PostNewest from '../Post/PostNewest';
import PostItem from '../Post/PostItem';
import Heading from '../../components/Layout/Heading';

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyles className='home-block'>
      <div className='container'>
        <Heading>Mới nhất</Heading>
        <div className='layout'>
          <PostNewestLarge></PostNewestLarge>
          <div className='sidebar'>
            <PostNewest></PostNewest>
            <PostNewest></PostNewest>
            <PostNewest></PostNewest>
          </div>
        </div>
        <div className='grid-layout grid-layout--primary'>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
