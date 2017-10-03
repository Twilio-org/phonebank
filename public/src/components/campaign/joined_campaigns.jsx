import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SidebarList from './sidebar_list_view/sidebar_list';
import CurrentCampaign from './sidebar_list_view/current_campaign';
import DashboardButtonGroup from '../common/nav_btn_group';
import Banner from '../common/welcome_banner';
import Footer from '../footer';

export default class JoinedCampaigns extends Component {
  componentDidMount() {
    const { id } = this.props.auth;
    if (id !== null) {
      this.props.clearCampaigns();
      this.props.fetchCampaignsByUser(id, this.props.current_campaign);
    }
  }

  render() {
    const { history,
            joined_campaigns,
            current_campaign,
            setCurrentCampaign,
            initateTwilioCon } = this.props;
    const { id: userId } = this.props.auth;
    const { first_name, last_name } = this.props.account_info;
    const page = 'Campaign';
    const is_admin = false;

    return (
      <div>
        <Row className="banner-header">
          <Col sm={4}>
            <Banner
              first_name={first_name}
              last_name={last_name}
              is_admin={is_admin}
              history={history}
              page={page}
            />
          </Col>
          <Col sm={8}>
            <DashboardButtonGroup
              is_admin={is_admin}
              page={page}
              history={history}
            />
          </Col>
        </Row>
        <section id={'joined-campaigns-content'}>
          <Row>
            <Col xs={5} md={4} lg={3}>
              <SidebarList
                id={'joined-campaigns-list'}
                list={joined_campaigns}
                active={current_campaign}
                setCurrentCampaign={setCurrentCampaign}
              />
            </Col>
            <Col xs={7} md={8} lg={9}>
              <CurrentCampaign
                history={history}
                userId={userId}
                list={joined_campaigns}
                currentCampaign={current_campaign}
                defaultMsg={joined_campaigns && joined_campaigns.length > 0 ?
                              'Select a campaign' :
                              'Join a campaign'}
                initiateTwilioCall={initateTwilioCon}

              />
            </Col>
          </Row>
        </section>
        <Footer />
      </div>
    );
  }
}
