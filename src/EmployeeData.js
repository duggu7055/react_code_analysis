import React, { useState, useEffect } from 'react';
import { Grid, StatsCard, Card, colors } from 'tabler-react';
import C3Chart from 'react-c3js';

function generateResult(input) {
  if (input === undefined || input === null) {
    return 0;
  }
  return input;
}

export function ListAllEmployees() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch('/employee/search/all');
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const empData = stats.length;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={empData}
        label="Total Employees"
      />
    </Grid.Col>
  );
}

export function ListEmployeeActiveEmployee() {
  const [stats, handleStats] = useState({});

  const FetchData = async () => {
    const data = await fetch('/employee/search/status');
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={generateResult(stats["Current Employee"])}
        label="Active Employees"
      />
    </Grid.Col>
  );
}

export function ListEmployeeInActiveEmployee() {
  const [stats, handleStats] = useState({});

  const FetchData = async () => {
    const data = await fetch('/employee/search/status');
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={generateResult(stats["Ex-Employee"])}
        label="Ex-Employees"
      />
    </Grid.Col>
  );
}

export function RoleDistribution() {
  const [stats, handleStats] = useState({});

  const FetchData = async () => {
    const data = await fetch('/employee/search/roles');
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Job Role Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: '12rem' }}
            data={{
              columns: [
                ['DevOps', generateResult(stats['DevOps'])],
                ['Developer', generateResult(stats['Developer'])],
              ],
              type: 'donut',
              colors: {
                data1: colors['green'],
                data2: colors['green-light'],
              },
              names: {
                data1: 'DevOps',
                data2: 'Developer',
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

export function LocationDistribution() {
  const [stats, handleStats] = useState({});

  const FetchData = async () => {
    const data = await fetch('/employee/search/location');
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Locations Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: '12rem' }}
            data={{
              columns: [
                ['Delhi', generateResult(stats['Delhi'])],
                ['Bangalore', generateResult(stats['Bangalore'])],
                ['Hyderabad', generateResult(stats['Hyderabad'])],
                ['Newyork', generateResult(stats['Newyork'])],
              ],
              type: 'donut',
              colors: {
                data1: colors['blue-darker'],
                data2: colors['blue'],
                data3: colors['blue-light'],
                data4: colors['blue-lighter'],
              },
              names: {
                data1: 'Delhi',
                data2: 'Bangalore',
                data3: 'Hyderabad',
                data4: 'Newyork',
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

export function StatusDistribution() {
  const [stats, handleStats] = useState({});

  const FetchData = async () => {
    const data = await fetch('/employee/search/status');
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Employees Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: '12rem' }}
            data={{
              columns: [
                ['Current Employees', generateResult(stats['Current Employee'])],
                ['Ex-Employees', generateResult(stats['Ex-Employee'])],
              ],
              type: 'donut',
              colors: {
                data1: colors['blue-darker'],
                data2: colors['blue'],
              },
              names: {
                data1: 'Current Employees',
                data2: 'Ex-Employees',
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}
