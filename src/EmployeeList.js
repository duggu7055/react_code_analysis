import React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class ListEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: true, error: null };
  }

  loadData() {
    fetch("/employee/search/all")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data, loading: false });
      })
      .catch((err) =>
        this.setState({ error: err.toString(), loading: false })
      );
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data, loading, error } = this.state;

    return (
      <SiteWrapper>
        <Page.Card title="Employee List"></Page.Card>
        <Grid.Col md={6} lg={10} className="align-self-center">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {!loading && !error && (
            <Table>
              <Table.Header>
                <Table.ColHeader>Employee ID</Table.ColHeader>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
                <Table.ColHeader>Phone Number</Table.ColHeader>
                <Table.ColHeader>Job Role</Table.ColHeader>
                <Table.ColHeader>Job Location</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {data.length > 0 ? (
                  data.map((item, i) => (
                    <Table.Row key={item.id || i}>
                      <Table.Col>{item.id}</Table.Col>
                      <Table.Col>{item.name}</Table.Col>
                      <Table.Col>{item.email}</Table.Col>
                      <Table.Col>{item.phone_number}</Table.Col>
                      <Table.Col>{item.job_role}</Table.Col>
                      <Table.Col>{item.location}</Table.Col>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Col colSpan={6} className="text-center">
                      No employees found.
                    </Table.Col>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          )}
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default ListEmployee;
