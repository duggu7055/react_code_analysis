import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider,
} from "tabler-react";

const navBarItems = [
  {
    value: "Overview",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  // ... other nav items
];

class SiteWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsObjects: [
        {
          unread: true,
          avatarURL: "demo/faces/male/41.jpg",
          message: (
            <>
              <strong>Nathan</strong> pushed new commit: Fix page load performance
              issue.
            </>
          ),
          time: "10 minutes ago",
        },
        // ... other notifications
      ],
    };
  }

  render() {
    const notificationsObjects = this.state.notificationsObjects || [];
    const unreadCount = notificationsObjects.filter(n => n.unread).length;

    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "",
          imageURL:
            "https://www.buildpiper.io/wp-content/uploads/2022/05/logo_black.png",
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex"></Nav.Item>
          ),
          notificationsTray: {
            notificationsObjects,
            markAllAsRead: () =>
              this.setState(
                () => ({
                  notificationsObjects: this.state.notificationsObjects.map(
                    (v) => ({ ...v, unread: false })
                  ),
                }),
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationsObjects: this.state.notificationsObjects.map(
                          (v) => ({ ...v, unread: true })
                        ),
                      }),
                    5000
                  )
              ),
            unread: unreadCount,
          },
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          links: [
            <a key="first" href="#">
              First Link
            </a>,
            // ... other links
          ],
          note:
            "Premium and Open Source dashboard template with responsive and high quality UI. For Free!",
          copyright: <></>,
          nav: (
            <>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}>
                <Button
                  href="https://github.com/tabler/tabler-react"
                  size="sm"
                  outline
                  color="primary"
                  RootComponent="a"
                >
                  Source code
                </Button>
              </Grid.Col>
            </>
          ),
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
