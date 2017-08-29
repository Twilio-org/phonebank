import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SidebarList from '../common/sidebar_list_view/sidebar_list';
import ListItemContent from '../common/sidebar_list_view/list_item_content';

export default class JoinedCampaigns extends Component {
  componentDidMount() {
    // get campaigns
  }
  render() {
    const campaigns = [
      { title: 'Test 1', id: 1 },
      { title: 'Test 2', id: 2 },
      { title: 'Test 3', id: 3 },
      { title: 'Test 4', id: 4 }
    ];
    const activeCampaign = 2;
    return (
      <Row>
        <Col xs={4} md={3}>
          <SidebarList list={campaigns} active={activeCampaign} />
        </Col>
        <Col xs={8} md={9}>
        </Col>
      </Row>
    );
  }
}
// <ListItemContent {...activeCampaign} />
