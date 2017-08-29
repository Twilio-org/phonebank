import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SidebarList from '../common/sidebar_list_view/sidebar_list';
// import ListItemContent from '../common/sidebar_list_view/list_item_content';
import DashboardButtonGroup from '../common/nav_btn_group';
import Banner from '../common/welcome_banner';

export default class JoinedCampaigns extends Component {
  componentDidMount() {
    // get campaigns
  }
  render() {
    const { history } = this.props;
    const { first_name, last_name } = this.props.account_info;
    const page = 'Campaign';
    const is_admin = false;
    const campaigns = [
      { title: 'Test 1', id: 1 },
      { title: 'Test 2', id: 2 },
      { title: 'Test 3', id: 3 },
      { title: 'Test 4', id: 4 }
    ];
    const activeCampaign = 2;
    return (
      <div>
        <Banner
          first_name={first_name}
          last_name={last_name}
          is_admin={is_admin}
          history={history}
          page={page}
        />
        <DashboardButtonGroup
          is_admin={is_admin}
          page={page}
          history={history}
        />
        <Row>
          <Col xs={4} md={3}>
            <SidebarList list={campaigns} active={activeCampaign} />
          </Col>
          <Col xs={8} md={9}>
          </Col>
        </Row>
      </div>
    );
  }
}
// <ListItemContent {...activeCampaign} />
