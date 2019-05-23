import React, { Component } from 'react';
import './style.scss';
import http from '../../http';
import { Table, Button } from '@alifd/next';
import IceLabel from '@icedesign/label';


class DataPage extends Component {
  state = {
    datas: [

    ],
  }

  componentDidMount = async () => {
    const resp = await http.get('/datas', { name: this.props.match.params.name });
    if (resp && resp.code === -1) {
      this.props.history.push('/account/login');
      return;
    }
    console.log(resp);
    if (resp) {
      this.setState({ datas: resp.data });
    }
  };

  status = (value) => {
    if (value) {
      return (
        <div>
          <IceLabel status="danger">失败</IceLabel>
        </div>
      );
    }
    return (
      <div>
        <IceLabel status="success">成功</IceLabel>
      </div>
    );
  };

  downLoad = (value, index, record) => {
    if (record.log) {
      return record.log;
    }
    const name = this.props.match.params.name;
    return (
      <div className="down">
        <Button type="secondary"
          onClick={() => {
            window.open(`${http.baseURL}/static/${record.name}.xls`);
          }}
        >下载
        </Button>
        {name === 'maxmara' && <Button type="secondary"
          onClick={() => {
                                     window.open(`${http.baseURL}/static/cn_${record.name}.xls`);
                                   }}
        >中文下载
                               </Button>}
      </div>
    );
  };


  render() {
    return (
      <div className="data">
        <Button type="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => {
                  this.props.history.push('/dashboard');
                }}
        >返回
        </Button>
        <Table dataSource={this.state.datas}>
          <Table.Column title="名称" dataIndex="name" />
          <Table.Column title="时间" dataIndex="time" />
          <Table.Column title="状态" dataIndex="log" cell={this.status} />
          <Table.Column title="操作" dataIndex="log" cell={this.downLoad} />
        </Table>
      </div>
    );
  }
}


export default DataPage;
