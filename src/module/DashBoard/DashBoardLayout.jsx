import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './SideBar';
import DashboardHeader from './DashBoardHeader';

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;
const DashboardLayout = () => {
  return (
    <DashboardStyles>
      <DashboardHeader />
      <div className='dashboard-main'>
        <Sidebar></Sidebar>
        <div className='dashboard-children'>
          <Outlet />
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
