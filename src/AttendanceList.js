import * as React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class AttendanceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  loadData() {
    fetch("/attendance/search")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data, loading: false });
      })
      .catch(() => {
        this.setState({
          error: "Error fetching attendance data.",
          loading: false,
        });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data, loading, error } = this.state;

    return (
      <SiteWrapper>
        <Page.Card title="Attendance List"></Page.Card>
        <Grid.Col md={6} lg={10} className="align-self-center">
          {loading && <p>Loading attendance records...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && (
            <Table>
              <Table.Header>
                <Table.ColHeader>Employee ID</Table.ColHeader>
                <Table.ColHeader>Status</Table.ColHeader>
                <Table.ColHeader>Date</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {data.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Col>{item.id}</Table.Col>
                    <Table.Col>{item.status}</Table.Col>
                    <Table.Col>{item.date}</Table.Col>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default AttendanceList;
