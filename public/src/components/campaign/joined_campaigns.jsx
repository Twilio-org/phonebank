import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SidebarList from './sidebar_list_view/sidebar_list';
import CurrentCampaign from './sidebar_list_view/current_campaign';
import DashboardButtonGroup from '../common/nav_btn_group';
import Banner from '../common/welcome_banner';

export default class JoinedCampaigns extends Component {
  componentDidMount() {
    console.log('"PROPS"', this.props.auth);
    const { id } = this.props.auth;
    if (id) {
      this.props.fetchCampaignsByUser(id);
    }
  }
  render() {
    const { history, joined_campaigns, current_campaign } = this.props;
    const { first_name, last_name } = this.props.account_info;
    const page = 'Campaign';
    const is_admin = false;
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
        <section id={'joined-campaigns-content'}>
          <Row>
            <Col xs={6} md={4}>
              <SidebarList
                id={'joined-campaigns-list'}
                list={joined_campaigns}
                active={current_campaign}
              />
            </Col>
            <Col xs={6} md={8}>
              <CurrentCampaign campaign={current_campaign} />
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}
