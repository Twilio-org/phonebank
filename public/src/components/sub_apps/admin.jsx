import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class Admin extends Component {
  // props

  render(){
    return (
      <Switch>
            <Route
              exact
              path="/questions/new"
              component={}
              render={() => (isLoggedIn() ?
                (<CreateQuestionContainer />) : (<Redirect to="/login" />))}
            />
            <Route
              path="/questions/:id"
              component={}
              render={() => (isLoggedIn() ?
              (<ViewQuestionContainer />) : (<Redirect to="/login" />))}
            />
            <Route
              exact
              path="/scripts/new"
              component={}
              render={() => (isLoggedIn() ?
                (<CreateScriptContainer />) : (<Redirect to="/login" />))}
            />
            <Route
              exact
              path="/account/:id/edit"
              component={}
              render={
               () => (isLoggedIn() ? (<EditAccountInfo />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/account"
              component={}
              render={
               () => (isLoggedIn() ? (<ConnectedAccountPage />) : (<Redirect to="/login" />))
              }
            />
            <Route
              exact
              path="/campaigns/new"
              component={}
              render={
               () => (isLoggedIn() ? (<CreateCampaignContainer />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/campaigns"
              component={}
              render={
                () => (isLoggedIn() ?
                  (<CampaignsContainer />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/scripts/:id"
              component={}
              render={
                () => (isLoggedIn() ?
                  (<ScriptPage />) : (<Redirect to="/login" />))
              }
            />
            <Route
              exact
              path="/"
              component={}
              render={
                () => (isLoggedIn() ?
                  (<CampaignsContainer />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/questions"
              component={}
              render={
                () => (isLoggedIn() ?
                  (<AdminQuestionsContainer />) : (<Redirect to="/" />))
              }
            />
            <Route
              path="/scripts"
              component={}
              render={
                () => (isLoggedIn() ?
                  (<AdminScriptsContainer />) : (<Redirect to="/" />))
              }
            />
            <Route
              path="/contactLists"
              component={}
              render={
                () => (isLoggedIn() ?
                  (<AdminContactListsContainer />) : (<Redirect to="/" />))
              }
            />
      <Switch>
    )
  }
}